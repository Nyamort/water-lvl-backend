import Measurement, {MeasurementInput} from "../models/measurement.model";
import {FilterQuery} from "mongoose";

export async function createMeasurement(input: MeasurementInput) {
    input.createdAt = new Date();
    return Measurement.create<MeasurementInput>(input);
}

export async function findMeasurementsBetweenDates(
    start: string,
    end: string,
    query: FilterQuery<Measurement>
) {
    return Measurement.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(start),
                    $lt: new Date(end)
                }
            }
        },
        {
            $lookup: {
                from: 'iots',
                localField: 'ioT',
                foreignField: '_id',
                as: 'ioT'
            }
        },
        {
            $unwind: '$ioT'
        },
        {
            $lookup: {
                from: 'tanks',
                localField: 'ioT._id',
                foreignField: 'ioT',
                as: 'tank'
            }
        },
        {
            $unwind: '$tank'
        },
        {
            $set: {
                percentFilled: {
                    $multiply: [
                        {
                            $divide: [
                                {
                                    $subtract: [
                                        '$tank.dimensions.height',
                                        '$height'
                                    ]
                                },
                                '$tank.dimensions.height'
                            ]
                        },
                        100
                    ]
                }
            },
        },
        {
            $project: {
                _id: 0,
                createdAt: 1,
                percentFilled: 1
            }
        },
        {
            $sort: {
                createdAt: 1
            }
        }
    ]);
}