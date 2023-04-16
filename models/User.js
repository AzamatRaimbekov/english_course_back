import mongoose from 'mongoose';

// Создание схемы пользователя
// !(Та самая таблица пользователя с необходимыми полями)

const UserSchema = new mongoose.Schema(
    {
        // В следущем обекте указаны свойста данного обьекта
        passed_first_exam: {
            default: false,
            type: Boolean,
        },
        level: {
            default: 1,
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        fullName:
        {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        // Дата создания и обновления всего моделя
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);