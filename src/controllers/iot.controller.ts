import iotService from "../services/iot.service";

class IotController {
    async create(req, res) {
        const {name, key} = req.body;
        const iot = await iotService.create({name, key});
        res.json(iot);
    }

    async show(req, res) {
        const {id} = req.params;
        const iot = await iotService.findById(id);
        res.json(iot);
    }
    async index(req, res) {
        const iots = await iotService.findAll();
        res.json(iots);
    }
}

export default new IotController();