import mongoose, {Schema, Document} from "mongoose";

export interface IotInput {
    name: string;
    key: string;
}

const iotSchema = new Schema({
    name: String,
    key: {
        type: String,
        required: true,
        unique: true
    }
})

 export interface IotDocument extends IotInput, Document {
    name: string;
    key: string;
 }

export default mongoose.model('Iot', iotSchema);