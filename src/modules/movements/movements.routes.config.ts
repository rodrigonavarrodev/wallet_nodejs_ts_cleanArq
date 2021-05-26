import { CommonRoutesConfig } from "../../common/common.routes.config";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import MovementsController from "./movements.controller";
import MovementsMiddleware from "./movements.middleware";
import { body } from "express-validator";

import express from "express";
import bodyValidationMiddleware from "../../common/middleware/body.validation.middleware";

export class MovementsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "MovementsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/movimientos")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        MovementsController.getAllMovements
      );

    this.app
      .route("/movimientos/usuario")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        MovementsController.getByUserId
      );

    this.app
      .route("/movimientos/amigo")
      .post(
        body("cvu").isString().notEmpty(),
        AuthValidationMiddleware.validJWTNeededUser,
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        MovementsController.getMovementsFriend
      );

    //FUNCIONA BIEN EL FILTRO,
    //FALTA ARMAR LA COLECCION DE FILTROS Y CONECTARLO A ESTA FUNCION
    this.app
      .route("/movimientos/filtros")
      .post(
        body("dias").isString().optional(),
        body("tipo").isString().optional(),
        AuthValidationMiddleware.validJWTNeededUser,
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        MovementsController.getFilterMovements
      );
    
    this.app.param(`movimientoId`, MovementsMiddleware.extractMovementId);
    this.app
    .route("/movimientos/comprobante/:movimientoId")
    .get(        
      AuthValidationMiddleware.validJWTNeededUser,
      MovementsController.getVoucher
      )
      

    return this.app;
  }
}
