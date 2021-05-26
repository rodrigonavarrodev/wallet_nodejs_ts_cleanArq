import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import CvuAccountsController from "./cvu_accounts.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import { body } from "express-validator";

import express from "express";

export class CvuAccountsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CvuAccountsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/cuentacvus")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        CvuAccountsController.getAllCvus
      );

    this.app
      .route("/cuentacvu/info")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        CvuAccountsController.getCvu
      );

    this.app
      .route("/cuentacvu/saldo")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        CvuAccountsController.getCvuSaldo
      );

    this.app
      .route("/cuentacvu/qr")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        CvuAccountsController.getCvuQr
      );

    this.app
      .route("/cuentacvu/modificaralias")
      .put(
        body("alias").isString().notEmpty(),
        AuthValidationMiddleware.validJWTNeededUser,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        CvuAccountsController.updateAlias
      );

    this. app
      .route("/cuentacvu/saldorecaudador")
      .get(
        AuthValidationMiddleware.validJWTNeededUser,
        CvuAccountsController.cvusBalance
      );

    this.app
      .route("/cuentacvu/amigo")
      .all(AuthValidationMiddleware.validJWTNeededUser)
      .post(
        body("idAmigo").isString().notEmpty(),
        body("apodo").isString().optional(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        CvuAccountsController.addFriend
      )
      .get(CvuAccountsController.getAllFriends);

    this.app
      .route("/cuentacvu/amigo/:idAmigo")
      .all(AuthValidationMiddleware.validJWTNeededUser)
      .delete(CvuAccountsController.deleteFriend)
      .post(
        body("apodo").isString().optional(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        CvuAccountsController.modifyNickname
      );

    this.app
      .route("/cuentacvu/consultacvudestino")
      .post(
        body("cvu").isString().notEmpty().toUpperCase(),
        AuthValidationMiddleware.validJWTNeededUser,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        CvuAccountsController.cvuDestination
      );

    this.app
      .route("/cuentacvu/consultaaliasdestino")
      .post(
        body("alias").isString().notEmpty().toUpperCase(),
        AuthValidationMiddleware.validJWTNeededUser,
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        CvuAccountsController.aliasDestination
      );

    return this.app;
  }
}
