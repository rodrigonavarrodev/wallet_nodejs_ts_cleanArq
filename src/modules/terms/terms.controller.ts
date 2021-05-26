import express from 'express'
import TermsService from './terms.service'

import debug from "debug"

const log: debug.IDebugger = debug("app:terms-controller");

class TermsController {

    async getTerms(req: express.Request, res: express.Response) {
        try {
            const response = TermsService.getTerms();
            return res.status(200).send(response);
        } catch (error) {
            if (error.msg) {
                return res.status(400).send({ errors: [error] });
            } else {
                return res.status(400).send({ errors: [error.message] });
            }
        }
    }

    async getRegulations(req: express.Request, res: express.Response) {
        try {
            const response = TermsService.getRegulations();
            return res.status(200).send(response);
        } catch (error) {
            if (error.msg) {
                return res.status(400).send({ errors: [error] });
            } else {
                return res.status(400).send({ errors: [error.message] });
            }
        }
    }
  
}

export default new TermsController();
