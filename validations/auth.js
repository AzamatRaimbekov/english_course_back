import { body } from "express-validator"


// У экспресс есть дополнительная библиотека express-validator, которая помогает проверять поля на их корректность

// Проверка для валидации 
export const registerValidation = [
    body("fullName", "Минимум 3").isLength({ min: 3 }),

    body("email", "Неверный формат").isEmail(),

    body("password", "Пароль должен состоять из минимум 5-ти символов").isLength({ min: 5 }),

    body("avatarUrl").optional().isURL(),

]


export const loginValidation = [
    body('password', 'минимум 5 символов').isLength({ min: 5 }),

    body('email', 'Неверный формат').isEmail(),
];



export const postCreateLevels = [
    body('title', 'Введите название уровня').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст').optional().isLength({ min: 3 }).isString(),
    // body('parts', 'Неверный формат').optional().isString(),
    // body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
