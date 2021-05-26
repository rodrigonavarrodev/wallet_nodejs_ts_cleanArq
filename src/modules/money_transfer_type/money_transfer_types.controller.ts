import express from "express";
import MoneyTransferTypesService from "./money_transfer_types.service";

import debug from "debug";

const log: debug.IDebugger = debug("app:billetera-controller");

class MoneyTransferTypesController {
  async createMoneyTransferTypes(req: express.Request, res: express.Response) {
    try {
      const moneyTransferType = await MoneyTransferTypesService.create(req.body);
      return res.status(201).send(moneyTransferType);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async getAllMoneyTransferTypes(req: express.Request, res: express.Response) {
    try {
      const moneyTransferTypes = await MoneyTransferTypesService.getAll();
      if (moneyTransferTypes.length === 0) {
        return res.status(200).send({ msg: "No hay registros" });
      }
      return res.status(200).send(moneyTransferTypes);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async updateMoneyTransferType(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const { image, type, navigate } = req.body;

      const moneyTransferType: any = await MoneyTransferTypesService.updateMoneyTransferType(
        id,
        image,
        type,
        navigate
      );

      return res.status(200).send({ msg: "Se actualizo correctamente" });
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async deleteMoneyTransferType(req: express.Request, res: express.Response) {
    try {
      const moneyTransferType = await MoneyTransferTypesService.deleteMoneyTransferType(req.params.id);
      return res.status(200).send({ msg: "Se eliminó correctamente" });

    } catch (error) {
      return res.status(400).send({ errors: [error] });

    }
  }
}

export default new MoneyTransferTypesController();
