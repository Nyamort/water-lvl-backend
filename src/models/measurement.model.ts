import {model, Schema, Document, Types} from "mongoose";
import {IotDocument} from "./iot.model";

const measurementSchema = new Schema({
    createdAt: Date,
    height: Number,
    ioT: {
        type: Schema.Types.ObjectId,
        ref: 'IoT'
    }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

export interface MeasurementDocument extends Document {
    createdAt: Date;
    height: number;
    ioT: Types.ObjectId | IotDocument;
}

export default model('Measurement', measurementSchema);