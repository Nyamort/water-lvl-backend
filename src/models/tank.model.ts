import {Schema, Document, Types, model, Model} from "mongoose";
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


export default tankModel;