import Tank, {TankDocument} from "../models/tank.model";
import {FilterQuery, QueryOptions} from "mongoose";


class TankService {
    async create(input: any) {
        return Tank.create(input);
    }

    async findOne(
        query: FilterQuery<TankDocument>,
        options: QueryOptions = {lean: true}
    ) {
        return Tank.findOne(query, {}, options);
    }

    async findTanks() {
        return this.aggregate();
    }

    async addIotToTank(
        tankId: string,
        iotId: string
    ) {
        await Tank.updateOne(
            {_id: tankId},
            {ioT: iotId}
        );
        return this.findOne({_id: tankId});
    }

    aggregate() {
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
                $unwind: '$measurements'
            },
            {
                $sort: {
                    'measurements.createdAt': -1
                }
            },
            {
                $group: {
                    _id: '$_id',
                    lastMeasurement: {
                        $first: '$measurements'
                    },
                    dimensions: {
                        $first: '$dimensions'
                    },
                    name: {
                        $first: '$name'
                    }

                }
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
                                                            '$lastMeasurement.height'
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
                $project: {
                    'measurements': 0,
                    'lastMeasurement': 0,
                }
            }
        ]);
    }
}


export default new TankService();
