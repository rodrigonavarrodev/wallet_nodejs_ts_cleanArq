import express from "express";
import MoneyDepositTypesService from "./money_deposit_types.service";

import debug from "debug";

const log: debug.IDebugger = debug("app:billetera-controller");

class MoneyDepositTypesController {
  async createMoneyDepositTypes(req: express.Request, res: express.Response) {
    try {
      const moneyDepositType = await MoneyDepositTypesService.create(req.body);
      return res.status(201).send(moneyDepositType);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async getAllMoneyDepositTypes(req: express.Request, res: express.Response) {
    try {
      const moneyDepositTypes = await MoneyDepositTypesService.getAll();
      if (moneyDepositTypes.length === 0) {
        return res.status(200).send({ msg: "No hay registros" });
      }
      return res.status(200).send(moneyDepositTypes);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async updateMoneyDepositType(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const { type, description, image, navigate } = req.body;

      const moneyDepositType: any = await MoneyDepositTypesService.updateMoneyDepositType(
        id,
        type,
        description,
        image,
        navigate
      );

      return res.status(200).send({ msg: "Se actualizo correctamente" });
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async deleteMoneyDepositType(req: express.Request, res: express.Response) {
    try {
      const moneyDepositType = await MoneyDepositTypesService.deleteMoneyDepositType(req.params.id);
      return res.status(200).send({ msg: "Se eliminó correctamente" });

    } catch (error) {
      return res.status(400).send({ errors: [error] });

    }
  }
}

export default new MoneyDepositTypesController();
