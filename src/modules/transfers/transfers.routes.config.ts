import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import TransfersController from "./transfers.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import { body } from "express-validator";

import express from "express";

export class TransfersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "TransferRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/transferencia/cvu`)
      .post(
        body("cvu").isString(),
        body("importe").isNumeric(),
        AuthValidationMiddleware.validJWTNeededUser,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        TransfersController.transferCvu
      );
    this.app
      .route(`/transferencia/alias`)
      .post(
        body("alias").isString().toUpperCase(),
        body("importe").isNumeric(),
        AuthValidationMiddleware.validJWTNeededUser,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        TransfersController.transferAlias
      );

    return this.app;
  }
}
