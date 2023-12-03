import {Schema, Document, model} from "mongoose";

const iotSchema = new Schema({
    name: String,
    key: {
        type: String,
        required: true,
        unique: true
    }
})

export interface IotDocument extends Document {
    name: string;
    key: string;
}

export default model<IotDocument>('Iot', iotSchema);