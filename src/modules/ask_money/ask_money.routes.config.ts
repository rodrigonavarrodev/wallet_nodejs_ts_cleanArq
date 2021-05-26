import {CommonRoutesConfig} from '../../common/common.routes.config'
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import AskMoneyController from './ask_money.controller'
import { body } from 'express-validator'

import express from 'express';

export class AskMoneyRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AskMoney");
  }

  configureRoutes() {

    this.app
    .route("/pedirdinero")
    .post(
      body("amigoId").isString().notEmpty(),
      body("importe").isNumeric().notEmpty(),
      body("referencia").isString(),
      AuthValidationMiddleware.validJWTNeededUser,
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      AskMoneyController.createAskMoney
    );

    this.app
      .route("/pedirdinero")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        AskMoneyController.getAll
      );
    
    return this.app;
  }
}