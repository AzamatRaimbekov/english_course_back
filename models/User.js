import mongoose from 'mongoose';


// Создание схемы пользователя
// !(Та самая таблица пользователя с необходимыми полями)


const UserSchema = new mongoose.Schema(
    {
        level: "BESIC",
        fullName:
        // В следущем обекте указаны свойста данного обьекта
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