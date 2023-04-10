import mongoose from 'mongoose';

const LevelsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
        },
        parts: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', LevelsSchema);
