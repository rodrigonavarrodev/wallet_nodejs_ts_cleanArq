import express from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { Jwt } from "../../common/types/jwt";
import CvuAccountsService from "../../modules/cvu_accounts/cvu_accounts.service";
import RedisService from '../services/redis.service';

class AuthValidationMiddleware {
  async validJWTNeededUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
          const jwtUser = jwt.verify(authorization[1], config.secret!) as Jwt;
          const validUser = await CvuAccountsService.getOneById(jwtUser.userId);
          if (validUser) {
            req.jwt = jwtUser;
            next();
          } else {
            return res.status(401).send({ msg: "No autorizado." });
          }
        }
      } catch (err) {
        return res.status(403).send({ msg: "Token no válido." });
      }
    } else {
      return res.status(401).send({ msg: "No autorizado." });
    }
  }

  async hasBOPermission(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
            const jwtUser = jwt.verify(authorization[1], config.secret!) as Jwt;
            const permition = await RedisService.getJSONData(`roleId:${jwtUser.roleId}`);
            let validUser = false;
            if (permition){
              permition.services.forEach((element: { name: string; method: string }) => {
                if ((element.name == req.url) && (element.method == req.method)){
                  validUser = true;
                }
              })
            }
            if (validUser) {
              req.jwt = jwtUser;
              next();
            } else {
              return res.status(401).send({ msg: "No autorizado." });
            }
        }
      } catch (err) {
        if (err.message == 'Servicio de Redis caído.') {return res.status(400).send({ msg: 'Servicio de Redis caído.' })}
        return res.status(403).send({ msg: "Token no válido." });
      }
    } else {
      return res.status(401).send({ msg: "No autorizado." });
    }
      
  }
}

export default new AuthValidationMiddleware();
