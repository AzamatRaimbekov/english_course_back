
import express from "express"
import mongoose from "mongoose"
import { loginValidation, postCreateLevels, registerValidation } from "./validations/auth.js"
import { ROUTERS } from "./constans/routes.js"
import { handleValidationErrors, checkUserAuh } from './helpers/index.js';
import { AuthRegulator, Levels } from "./regulators/index.js"
import cors from "cors"
// req - то что мы получили , res -  Ответ со стороны Бэка

// Подключение MongoDB
mongoose.connect('mongodb+srv://encourseskg:Azamat12345@englishcourse.wuzjxw6.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log("Подключено")
}).catch((error) => {
    console.log("Ошибка", error)
})

// Создание Бэка через EXPRESS
const MainApp = express()
MainApp.use(cors())
// Подключение экспресс к формату JSON
MainApp.use(express.json())

MainApp.get("/", (req, res) => {
    res.send("Работает")
})

// Регистрация
MainApp.post(ROUTERS.REG, registerValidation, handleValidationErrors, AuthRegulator.register);
// Логин
MainApp.post(ROUTERS.LOGIN, loginValidation, handleValidationErrors, AuthRegulator.login);
// Данные о нынешнем пользователе залогиненного
MainApp.get(ROUTERS.ME, checkUserAuh, AuthRegulator.getMyProfile);



// Всё что связанно с уровнями

// Добавления теста к уровню 
MainApp.patch(ROUTERS.LEVELS_EXAM, Levels.createTestForLevel);

// Детальная страница уровня
MainApp.get(ROUTERS.LEVELS_DETAIL, Levels.getOneLevel_v2);

// Создание уровня
MainApp.post(ROUTERS.LEVELS, checkUserAuh, Levels.createLevel);
// Изменение уровня, и прохождения первого квалифицаионного уровня 
MainApp.patch(ROUTERS.CHANGE_LEVEL, Levels.changeLevel);


// Взлять все уровни
MainApp.get(ROUTERS.LEVELS, Levels.getAllLevels);
// Взять всех пользователей
MainApp.get(ROUTERS.ALL_USERS, Levels.getAllUsers);

// Роут для удаления
MainApp.delete(ROUTERS.LEVELS_DETAIL, checkUserAuh, Levels.remove);
// Роут для обнавления уровня
MainApp.patch(ROUTERS.LEVELS_DETAIL, checkUserAuh, Levels.update);



// Конфигурация сервера
MainApp.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
})