import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import CvuAccountsController from "../cvu_accounts/cvu_accounts.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import { body } from "express-validator";

import express from "express";

export class CvuAccountsBORoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CvuAccountsBORoutes");
  }

  configureRoutes() {
    this.app
      .route(`/cuentacvubo/fondear`)
      .post(
        body("cvu").isString(),
        body("importe").isNumeric(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        AuthValidationMiddleware.hasBOPermission,
        CvuAccountsController.fundCvu
      );

    return this.app;
  }
}
