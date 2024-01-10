import mongoose, { Schema } from 'mongoose';

const querySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true
    }
})

export default mongoose.model('Query', querySchema);