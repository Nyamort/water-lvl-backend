import iotRouter from './iot.router';
import measurementRouter from './measurement.router';
import tankRouter from './tank.router';
import {Application} from "express";
const routers = (app: Application) => {

    iotRouter(app);
    measurementRouter(app);
    tankRouter(app);

}

export default routers;