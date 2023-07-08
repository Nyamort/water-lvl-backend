import mongoose, {Schema} from "mongoose";
import Tank from "./tank.model";

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
}

export interface MeasurementDocument extends MeasurementInput, Document {
    createdAt: Date;
    height: number;
    ioT: string;
}
// measurementSchema.virtual('percentFilled').get(async function (this: MeasurementDocument) {
//     const ioTId = this.ioT;
//     const tank = await Tank.findOne({ioT: ioTId});
//
//     if (!tank) {
//         return 0;
//     } else {
//         const tankHeight = tank.dimensions.height;
//         const measurementHeight = this.height;
//         if(measurementHeight > tankHeight) return 100;
//         return ((tankHeight - measurementHeight) / tankHeight) * 100;
//     }
// });
export default mongoose.model('Measurement', measurementSchema);