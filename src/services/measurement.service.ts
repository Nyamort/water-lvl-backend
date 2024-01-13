import Measurement, {MeasurementDocument} from "../models/measurement.model";
import {FilterQuery} from "mongoose";

class MeasurementService{
    async create(input: any) {
        return await Measurement.create<MeasurementDocument>(input);
    }

    async findMeasurementsBetweenDates(
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
                    percent: {
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
}

export default new MeasurementService();