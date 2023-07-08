
import Iot, {IotDocument, IotInput} from "../models/iot.model";
import {FilterQuery, QueryOptions} from "mongoose";
export async function createIot(input: IotInput) {
    let iot = await findIot({key: input.key});
    if (iot) {
        return iot;
    }
    return Iot.create<IotInput>(input);
}

export async function findIot(
    query: FilterQuery<IotDocument>,
    options: QueryOptions = { lean: true }
){
    return Iot.findOne(query, {}, options);
}

export async function findIots(
    query: FilterQuery<IotDocument>,
    options: QueryOptions = { lean: true }
){
    return Iot.find(query, {}, options);
}