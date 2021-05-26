import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import FriendSaveTypesController from "./friend_save_types.controller";
import { body } from "express-validator";

import express from "express";

export class FriendSaveTypesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "FriendSaveTypesRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/tipoagregaramigo`)
      .post(
        body("image").isString(),
        body("type").isString(),
        body("navigate").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        FriendSaveTypesController.createFriendSaveTypes
      );

    this.app
      .route("/tipoagregaramigo")
      .get(FriendSaveTypesController.getAllFriendSaveTypes);
    this.app
      .route("/tipoagregaramigo/:id")
      .put(
        body("image").isString(),
        body("type").isString(),
        body("navigate").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        FriendSaveTypesController.updateFriendSaveType
      );
    this.app
      .route("/tipoagregaramigo/:id")
      .delete(FriendSaveTypesController.deleteFriendSaveType);
    return this.app;
  }
}
