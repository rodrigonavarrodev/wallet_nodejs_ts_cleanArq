import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import ExtractionOrderController from "./extraction_order.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import { body } from "express-validator";

import express from "express";

export class ExtractionOrderRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ExtractionOrderRoutes");
  }

  configureRoutes() {
    this.app
      .route("/ordenextraccion")
      .post(
        body("importe").isNumeric(),
        body("documento").isString(),
        body("referencia").isString(),
        AuthValidationMiddleware.validJWTNeededUser,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        ExtractionOrderController.createExtractionOrder
      );

    //_____REVEER EL FILTRO DE MONGOOSE_____//
    this.app
      .route("/ordenextraccion/busqueda")
      .post(
        body("desde").isDate().optional(),
        body("hasta").isDate().optional(),
        body("documento").isString().optional(),
        AuthValidationMiddleware.validJWTNeededUser,
        ExtractionOrderController.getAll
      );

    this.app
    .route("/ordenextraccion/cajero")
    .post(
      body('documento').isString().isLength({min:8}).withMessage('El valor ingresado no corresponde a un documento argentino').matches(/^[0-9]+$/),
      body('pin').isString().isLength({min:8}).withMessage('El PIN debe tener 8 numeros').matches(/^[0-9]+$/),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      ExtractionOrderController.cashOut
    )

    return this.app;
  }
  
}
