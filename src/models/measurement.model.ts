import mongoose, {Schema, Document} from "mongoose";

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

export interface MeasurementInput {
    height: number;
    ioT: string;
    createdAt: Date;
}

export interface MeasurementDocument extends MeasurementInput, Document {
    createdAt: Date;
    height: number;
    ioT: string;
}

export default mongoose.model('Measurement', measurementSchema);