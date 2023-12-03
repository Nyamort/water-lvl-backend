import {Schema, Document, Types, model, Model, Query} from "mongoose";
import {IotDocument} from "./iot.model";

const tankSchema = new Schema<TankDocument>({
    name: String,
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    ioT: {
        type: Schema.Types.ObjectId,
        ref: 'IoT'
    }
});

export interface TankDocument extends Document {
    name: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    ioT: Types.ObjectId | IotDocument;
}

export interface TankModel extends Model<TankDocument> {}

const tankModel: TankModel = model<TankDocument>('Tank', tankSchema);

tankSchema.pre('find', function (this: TankModel, next) {
    this.aggregate([
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
        }
    ]);
    next();

});

export default tankModel;