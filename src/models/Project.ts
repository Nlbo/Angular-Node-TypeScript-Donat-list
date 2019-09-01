import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    donated: {
        type: String,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    sponsors: {
        type: [String],
        default: []

    },
    sponsorsCount: {
        type: String,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    initiator: {
        type: String,
         required: true
    },
    amount: {
        type: String,
        required: true
    },
    started_at: {
        type: String,
        required: true
    },
    finished_at: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    created_at: {
      type: Date,
      default: new Date().toLocaleDateString()
    },
    updated_at: {
        type: Date,
        default: new Date().toLocaleDateString()
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'users',
        required: true
    }
}, { versionKey: false });

export default model('projects', ProjectSchema)
