import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import MoneyDepositTypesController from "./money_deposit_types.controller";
import { body } from "express-validator";

import express from "express";

export class MoneyDepositTypesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "MoneyDepositTypesRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/tipoingresodinero`)
      .post(
        body("type").isString(),
        body("description").isString(),
        body("image").isString(),
        body("navigate").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        MoneyDepositTypesController.createMoneyDepositTypes
      );

    this.app
      .route("/tipoingresodinero")
      .get(MoneyDepositTypesController.getAllMoneyDepositTypes);
    this.app
      .route("/tipoingresodinero/:id")
      .put(
        body("type").isString(),
        body("description").isString(),
        body("image").isString(),
        body("navigate").isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        MoneyDepositTypesController.updateMoneyDepositType
      );
    this.app
      .route("/tipoingresodinero/:id")
      .delete(MoneyDepositTypesController.deleteMoneyDepositType);
    return this.app;
  }
}
