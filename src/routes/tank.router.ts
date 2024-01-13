import express, {Application} from 'express';
import TankController from "../controllers/tank.controller";
const router = express.Router();
const iotRouter = (app: Application) => {

    app.use('/tanks', router);
    router.get('/', TankController.index);
    router.post('/', TankController.create);
    router.get('/:id', TankController.show);
}

export default iotRouter;