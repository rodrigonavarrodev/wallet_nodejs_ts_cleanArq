import express from 'express'
import AskMoneyService from './ask_money.service'
import debug from "debug"

const log: debug.IDebugger = debug("app:askmoney-controller");

class AskMoneyController {

  async createAskMoney(req: express.Request, res: express.Response) {
    console.log(req.jwt.userId);
    
    try {
      const orden = await AskMoneyService.createAskMoney(
        req.jwt.userId,
        req.body
      );
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
          const cvus = await AskMoneyService.getAll();
          if (cvus.length === 0) {
            return res.status(200).send({ msg: "No hay registros" });
          }
          return res.status(200).send(cvus);
        } catch (error) {
          return res.status(400).send({ errors: [error] });
        }
      }
}

export default new AskMoneyController();
