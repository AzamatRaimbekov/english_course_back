import mongoose from 'mongoose';

const questionItem = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        trueAnswer: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
const PartsOfLevel = new mongoose.Schema(
    {
        title: {
            type: String,

        },
        textExtra: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

const ExamOfLevel = new mongoose.Schema(
    {
        radios: {
            type: [questionItem],
            required: false,
        },
    },
    {
        timestamps: true,
    },
);



// export default mongoose.model('parts', PartsOfLevel);

const LevelsSchema = new mongoose.Schema(
    {
        examTest: {
            type: [ExamOfLevel],
            required: false,
        },
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
            required: false,
        },
        viewsCount: {
            type: Number,
            default: 0,
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('LevelsSchema', LevelsSchema);