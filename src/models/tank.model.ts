import mongoose, {Schema, Document} from "mongoose";

const tankSchema = new Schema({
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
export interface TankInput {
    name: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    }
}

export interface TankDocument extends TankInput, Document {
    name: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    },
    ioT: string;
}

export default mongoose.model('Tank', tankSchema);