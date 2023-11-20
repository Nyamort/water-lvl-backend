import Tank, {TankDocument, TankInput} from "../models/tank.model";
import {FilterQuery, QueryOptions} from "mongoose";

export async function createTank(input: TankInput) {
    return Tank.create<TankInput>(input);
}

export async function findTank(
    query: FilterQuery<TankDocument>,
    options: QueryOptions = {lean: true}
) {
    return Tank.findOne(query, {}, options);
}

export async function findTanks(
    query: FilterQuery<TankDocument>,
    options: QueryOptions = {lean: true}
) {
    // return Tank.find(query, {}, options);
    return Tank.aggregate([
        {
            $lookup: {
                from: 'measurements',
                localField: 'ioT',
                foreignField: 'ioT',
                as: 'measurements'
            }
        },
        {
            $unwind: "$measurements"
        },
        {
            $set: {
                percentFilled: {
                    $round: [
                        {
                            $multiply: [
                                {
                                    $subtract: [
                                        1,
                                        {
                                            $divide: [
                                                {
                                                    $subtract: [
                                                        '$dimensions.height',
                                                        {
                                                            $max: '$measurements.height'
                                                        }
                                                    ]
                                                },
                                                '$dimensions.height'
                                            ]
                                        }
                                    ]
                                },
                                100
                            ]
                        },
                        2
                    ]

                }
            }
        },
        {
            $sort: {
                "measurements.createdAt": -1
            }
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                dimensions: { $first: "$dimensions" },
                iot: { $first: "$ioT" },
                latestMeasure: { $first: "$percentFilled" }
            }
        },
        {
            $sort: {
                name: 1
            }
        }
    ]);
}

export async function addIotToTank(
    tankId: string,
    iotId: string
) {
    await Tank.updateOne(
        {_id: tankId},
        {ioT: iotId}
    );
    return findTank({_id: tankId});
}