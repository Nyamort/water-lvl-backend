import express, {Application} from 'express';
import IotController from "../controllers/iot.controller";
const router = express.Router();
const iotRouter = (app: Application) => {

    app.use('/iots', router);
    router.get('/', IotController.index);
    router.get('/:id', IotController.show);
    router.post('/', IotController.create);
}

export default iotRouter;