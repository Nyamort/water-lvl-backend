import express from 'express';
import IotController from '@controllers/iot.controller';
const router = express.Router();
const iotRouter = (app) => {

    app.use('/iots', router);
    app.get('/', IotController.index);
    app.get('/:id', IotController.show);
    app.post('/', IotController.create);
}

module.exports = iotRouter;