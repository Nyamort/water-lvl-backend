import express, {Application} from 'express';
import MeasurementController from "../controllers/measurement.controller";
const router = express.Router();
const measurementRouter = (app: Application) => {
    app.use('/measurement', router);
    router.get('/', MeasurementController.index);
    router.post('/', MeasurementController.create);
    router.get('/:id', MeasurementController.show);
}

export default measurementRouter;