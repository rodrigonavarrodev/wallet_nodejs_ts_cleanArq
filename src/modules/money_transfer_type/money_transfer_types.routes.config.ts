import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import MoneyTransferTypesController from "./money_transfer_types.controller";
import { body } from "express-validator";

import express from "express";

export class MoneyTransferTypesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "MoneyTransferTypesRoutes");
  }

  configureRoutes() {
    this.app
      .route("/tipoenviodinero")
      .post(
        body("image").isString(),
        body("type").isString(),
        body("navigate").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        MoneyTransferTypesController.createMoneyTransferTypes
      );

    this.app
      .route("/tipoenviodinero")
      .get(MoneyTransferTypesController.getAllMoneyTransferTypes);
    this.app
      .route("/tipoenviodinero/:id")
      .put(
        body("image").isString(),
        body("type").isString(),
        body("navigate").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        MoneyTransferTypesController.updateMoneyTransferType
      );
    this.app
      .route("/tipoenviodinero/:id")
      .delete(MoneyTransferTypesController.deleteMoneyTransferType);
    return this.app;
  }
}
