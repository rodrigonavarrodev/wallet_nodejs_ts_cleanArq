import {CommonRoutesConfig} from '../../common/common.routes.config'
import { body } from 'express-validator'
import TermsController from './terms.controller'

import express from 'express';

export class TermsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "TermsRoutes");
  }

  configureRoutes() {

    this.app
      .route(`/terms`)
      .get(
        TermsController.getTerms
      );

    this.app
      .route(`/terms/reglamento`)
      .get(
        TermsController.getRegulations
      );
    
    return this.app;
  }
}