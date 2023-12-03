import Measurement, {MeasurementDocument, MeasurementInput} from "../models/measurement.model";
import {FilterQuery} from "mongoose";

export async function createMeasurement(input: MeasurementInput) {

    return await Measurement.create<MeasurementDocument>(input);
}

export async function findMeasurementsBetweenDates(
    start: string,
    end: string,
    query: FilterQuery<MeasurementDocument>
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
                            $subtract: [
                                1,
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
                                }
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