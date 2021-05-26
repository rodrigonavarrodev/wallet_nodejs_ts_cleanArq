import express from "express";
import FriendSaveTypesService from "./friend_save_types.service";

import debug from "debug";

const log: debug.IDebugger = debug("app:billetera-controller");

class FriendSaveTypesController {
  async createFriendSaveTypes(req: express.Request, res: express.Response) {
    try {
      const friendSaveType = await FriendSaveTypesService.create(req.body);
      return res.status(201).send(friendSaveType);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async getAllFriendSaveTypes(req: express.Request, res: express.Response) {
    try {
      const friendSaveTypes = await FriendSaveTypesService.getAll();
      if (friendSaveTypes.length === 0) {
        return res.status(200).send({ msg: "No hay registros" });
      }
      return res.status(200).send(friendSaveTypes);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async updateFriendSaveType(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const { image, type, navigate } = req.body;

      const friendSaveType: any = await FriendSaveTypesService.updateFriendSaveType(
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

  async deleteFriendSaveType(req: express.Request, res: express.Response) {
    try {
      const friendSaveType = await FriendSaveTypesService.deleteFriendSaveType(req.params.id);
      return res.status(200).send({ msg: "Se eliminó correctamente" });

    } catch (error) {
      return res.status(400).send({ errors: [error] });

    }
  }
}

export default new FriendSaveTypesController();
