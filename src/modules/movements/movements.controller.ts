import express from "express";
import MovementsService from "./movements.service";

import debug from "debug";

const log: debug.IDebugger = debug("app:movements-controller");

class MovementsController {
  async getAllMovements(req: express.Request, res: express.Response) {
    try {
      const movements = await MovementsService.getAll();
      return res.status(200).send(movements);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getByUserId(req: express.Request, res: express.Response) {
    try {
      const movements = await MovementsService.getAllByUserId(req.jwt.userId);
      return res.status(200).send(movements);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getMovementsFriend(req: express.Request, res: express.Response) {
    try {
      const movements = await MovementsService.getAllMovementsFriends(
        req.jwt.userId,
        req.body.cvu
      );
      return res.status(200).send(movements);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getFilterMovements(req: express.Request, res: express.Response) {  
    try {
      const movements = await MovementsService.getFilterMovements(
        req.jwt.userId,
        req.body
      );
      return res.status(200).send(movements);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getVoucher(req: express.Request, res: express.Response) {
    try {
      const response = await MovementsService.getVoucher(req.params.movimientoId);
      return res.status(200).send(response);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }
  
}

export default new MovementsController();
