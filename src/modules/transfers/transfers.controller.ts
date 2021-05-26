import express from "express";
import cvusService from "../cvu_accounts/cvu_accounts.service";
import TransfersServices from "./transfers.service";
import CvuAccountsService from "../cvu_accounts/cvu_accounts.service"
import loginBindService from "../../common/services/bind.service";
import {
  publishMessage,
  checkRabbitMQconnection,
} from "../../common/services/rabbitMQpublisher.service";

import debug from "debug";

const log: debug.IDebugger = debug("app:transfers-controller");

class TransfersController {
  async transferCvu(req: express.Request, res: express.Response) {
    try {
      //testeo conexion a Rabbit
     const rabbitMQcon = await checkRabbitMQconnection();
      if (rabbitMQcon.name == "Error") {
        return res
          .status(400)
          .send({
            errors: [
              { msg: "Se produjo un error en la conexion con rabbitMQ" },
            ],
          });
      } 
      const transfer = await TransfersServices.createCvuTransfer(
        req.jwt.userId,
        req.body
      );
      //Envio el saldo a cripto y prestamos
      const accountFrom: any = await CvuAccountsService.getOneById(req.jwt.userId);
      await publishMessage('cripto.billeteraupdate', {userId: req.jwt.userId, saldo: accountFrom.saldo});
      await publishMessage("prestamos.saldoupdate", {userId: req.jwt.userId, saldo: accountFrom.saldo});

      const accountTo: any = await CvuAccountsService.consultCvu(req.body.cvu)
      await publishMessage('cripto.billeteraupdate', {userId: accountTo.userId, saldo: accountTo.saldo});
      await publishMessage("prestamos.saldoupdate", {userId: accountTo.userId, saldo: accountTo.saldo});
      
      return res.status(200).send(transfer);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async transferAlias(req: express.Request, res: express.Response) {
    try {
        //testeo conexion a Rabbit
     const rabbitMQcon = await checkRabbitMQconnection();
     if (rabbitMQcon.name == "Error") {
       return res
         .status(400)
         .send({
           errors: [
             { msg: "Se produjo un error en la conexion con rabbitMQ" },
           ],
         });
     } 
      const transfer = await TransfersServices.createAliasTransfer(
        req.jwt.userId,
        req.body
      );
      //Envio el saldo a cripto y prestamos
      const accountFrom: any = await CvuAccountsService.getOneById(req.jwt.userId);
      await publishMessage('cripto.billeteraupdate', {userId: req.jwt.userId, saldo: accountFrom.saldo});
      await publishMessage("prestamos.saldoupdate", {userId: req.jwt.userId, saldo: accountFrom.saldo});

      const accountTo: any = await CvuAccountsService.getOneByAlias(req.body.alias)
      await publishMessage('cripto.billeteraupdate', {userId: req.jwt.userId, saldo: accountTo.saldo});
      await publishMessage("prestamos.saldoupdate", {userId: accountTo.userId, saldo: accountTo.saldo});
      
      return res.status(200).send(transfer);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }
}

export default new TransfersController();
