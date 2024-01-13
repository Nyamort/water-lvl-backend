import {Request, Response} from "express";
import iotService from "../services/iot.service";

class IotController {
    async create(req: Request, res: Response) {
        const {name, key} = req.body;
        const iot = await iotService.create({name, key});
        res.json(iot);
    }

    async show(req: Request, res: Response) {
        const {id} = req.params;
        const iot = await iotService.findById(id);
        res.json(iot);
    }
    async index(req: Request, res: Response) {
        const iots = await iotService.findAll();
        res.json(iots);
    }
}

export default new IotController();