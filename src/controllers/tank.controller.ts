import {Request, Response} from "express";
import tankService from "../services/tank.service";

class TankController {
    async create(req: Request, res: Response) {
        const {name, dimensions, ioT} = req.body;
        const tank = await tankService.create({name, dimensions, ioT});
        res.json(tank);
    }

    async show(req: Request, res: Response) {
        const {id} = req.params;
        const tank = await tankService.findOne({_id: id});
        res.json(tank);
    }

    async index(req: Request, res: Response) {
        const tanks = await tankService.findTanks();
        res.json(tanks);
    }
}

export default new TankController();