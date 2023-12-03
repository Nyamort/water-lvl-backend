import TankService from "@services/tank.service";

class TankController {
    async createIot(req, res) {
        const {name, key} = req.body;
        const iot = await TankService.createIot({name, key});
        res.json(iot);
    }

    async findIot(req, res) {
        const {id} = req.params;
        const iot = await TankService.findIotById(id);
        res.json(iot);
    }
    async findAll(req, res) {
        const iots = await TankService.findIots();
        res.json(iots);
    }
}

export default new TankController();