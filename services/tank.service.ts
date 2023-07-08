import Tank, {TankDocument, TankInput} from "../models/tank.model";
import {FilterQuery, QueryOptions} from "mongoose";

export async function createTank(input: TankInput) {
    return Tank.create<TankInput>(input);
}

export async function findTank(
    query: FilterQuery<TankDocument>,
    options: QueryOptions = { lean: true }
){
    return Tank.findOne(query, {}, options);
}

export async function findTanks(
    query: FilterQuery<TankDocument>,
    options: QueryOptions = { lean: true }
){
    return Tank.find(query, {}, options);
}

export async function addIotToTank(
    tankId: string,
    iotId: string
){
    await Tank.updateOne(
        {_id: tankId},
        {ioT: iotId}
    );
    return findTank({_id: tankId});
}