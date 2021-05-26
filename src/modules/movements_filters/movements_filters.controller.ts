import express from "express";
import MovementsFilterService from "./movements_filters.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:blank-controller");

class MovementsFilterController {
  async createFilter(req: express.Request, res: express.Response) {
    try {
      const orden = await MovementsFilterService.createFilter(req.body);
      return res.status(200).send(orden);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getAllFilters(req: express.Request, res: express.Response) {
    try {
      const response = await MovementsFilterService.getAll();
      if (response.length === 0) {
        return res.status(200).send({ msg: "No hay registros" });
      }
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }
}

export default new MovementsFilterController();
