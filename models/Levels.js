import mongoose from 'mongoose';

const PartsOfLevel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,

        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true
        }
    },
    {
        timestamps: true,
    },
);

// export default mongoose.model('parts', PartsOfLevel);

const LevelsSchema = new mongoose.Schema(
    {
        currentLevel: {
            type: Number,
            required: true,
        },
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
            type: [PartsOfLevel],
            required: true,
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

export default mongoose.model('LevelsSchema', LevelsSchema);