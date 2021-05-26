import {CommonRoutesConfig} from '../../common/common.routes.config'
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import MovementsFilterController from './movements_filters.controller'
import { body } from 'express-validator'

import express from 'express';

export class MovementsFilterRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "MovementsFilterRoutes");
  }

  configureRoutes() {
    
    this.app
    .route('/filtros')
    .post(
      body("filtro").isString().notEmpty(),
      body("tipo"). isString().notEmpty(),
      body("label").isString().notEmpty(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      MovementsFilterController.createFilter
    )

    this.app
    .route('/filtros')
    .get(MovementsFilterController.getAllFilters)

    return this.app;
  }
}