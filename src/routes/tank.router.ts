import express from 'express';
import TankController from '@controllers/tank.controller';
const router = express.Router();
const iotRouter = (app) => {

    app.use('/tanks', router);
    app.get('/', TankController.findAll);
    app.post('/', TankController.createIot);
    app.get('/:id', TankController.findIot);
}

module.exports = iotRouter;