import mongoose from 'mongoose';

// Создание схемы пользователя
// !(Та самая таблица пользователя с необходимыми полями)


const rewies = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    }
);

const MainPage = new mongoose.Schema(
    {
        // В следущем обекте указаны свойста данного обьекта
        banner_title: {
            default: "",
            type: String,
        },
        banner_desc: {
            default: "",
            type: String,
        },
        banner_img: {
            default: "",
            type: String,

        },
        rewies: {
            type: [rewies],
        },

    }
);

export default mongoose.model('MainPage', MainPage);