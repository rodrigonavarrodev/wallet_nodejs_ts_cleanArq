import express from 'express'

class MovementsMiddleware {
    async extractMovementId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.movementId;
        next();
    }

}

export default new MovementsMiddleware();