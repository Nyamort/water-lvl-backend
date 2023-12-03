import Iot, {IotDocument} from "../models/iot.model";
import {FilterQuery, QueryOptions} from "mongoose";


class IotService {

    async create(input: CreateIotInput) {
        let iot = await this.find({key: input.key});
        if (iot) {
            return iot;
        }
        return Iot.create<CreateIotInput>(input);
    }

    async find(
        query: FilterQuery<Partial<IotDocument>>,
        options: QueryOptions = { lean: true }
    ){
        return Iot.findOne(query, {}, options);
    }

    async findById(id: string){
        return Iot.findById(id);
    }


    async findAll(
        query: FilterQuery<Partial<IotDocument>> = {},
        options: QueryOptions = { lean: true }
    ){
        return Iot.find(query, {}, options);
    }
}

export interface CreateIotInput {
    name: string;
    key: string;
}

export default new IotService();