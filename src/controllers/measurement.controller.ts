import MeasurementService from "../services/measurement.service";
import {Request, Response} from "express";

class MeasurementController {


    async create(req: Request, res: Response) {
        const {height, ioT} = req.body;
        const iot = await MeasurementService.create({height: height, ioT: ioT, createdAt: new Date()});
        res.json(iot);
    }

    async show(req: Request, res: Response) {

    }
    async index(req: Request, res: Response) {

    }
}

export default new MeasurementController();