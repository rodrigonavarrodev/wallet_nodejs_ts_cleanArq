import express from "express";
import ExtractionOrderService from "./extraction_order.service";
import CvuAccountsService from "../../modules/cvu_accounts/cvu_accounts.service";
import {
  publishMessage,
  checkRabbitMQconnection,
} from "../../common/services/rabbitMQpublisher.service";
import cvusService from "../cvu_accounts/cvu_accounts.service";

import debug from "debug";

const log: debug.IDebugger = debug("app:billetera-controller");

class ExtractionOrderController {
  async createExtractionOrder(req: express.Request, res: express.Response) {
    try {
      //testeo conexion a Rabbit
      const rabbitMQcon = await checkRabbitMQconnection();
      if (rabbitMQcon.name == "Error") {
        return {
          errors: [{ msg: "Se produjo un error en la conexion con rabbitMQ" }],
        };
      }
      const orden = await ExtractionOrderService.createOrder(
        req.jwt.userId,
        req.body
      );

      //Envio el saldo a cripto y prestamos
      const account: any = await CvuAccountsService.getOneById(req.jwt.userId,);
      await publishMessage("cripto.billeteraupdate", {userId: req.jwt.userId, saldo: account.saldo});
      await publishMessage("prestamos.saldoupdate", {userId: req.jwt.userId, saldo: account.saldo});
      
      return res.status(200).send(orden);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    try {
      const response = await ExtractionOrderService.getAll(req.body);
      return res.status(200).send(response);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async cashOut(req: express.Request, res: express.Response) {
    try {
      const response = await ExtractionOrderService.cashOut(req.body);
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

export default new ExtractionOrderController();
