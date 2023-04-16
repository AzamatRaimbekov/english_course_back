
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { loginValidation, postCreateLevels, registerValidation } from "./validations/auth.js"
import { validationResult } from "express-validator"
import { ROUTERS } from "./constans/routes.js"
import UserModel from "./models/User.js"
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
    res.send("Hellow world")
})

// Регистрация
MainApp.post(ROUTERS.REG, registerValidation, handleValidationErrors, AuthRegulator.register);
// Логин
MainApp.post(ROUTERS.LOGIN, loginValidation, handleValidationErrors, AuthRegulator.login);
// Данные о нынешнем пользователе залогиненного
MainApp.get(ROUTERS.ME, checkUserAuh, AuthRegulator.getMyProfile);



// Всё что связанно с уровнями

// Создание уровня
MainApp.post(ROUTERS.LEVELS, checkUserAuh, postCreateLevels, Levels.createLevel);
MainApp.patch(ROUTERS.CHANGE_LEVEL, Levels.changeLevel);

// MainApp.get(ROUTERS.LEVELS, Levels.getAllLevels);

// Прыжок на следующий уровень
// MainApp.get(ROUTERS.LEVELS, Levels.getAllLevels);


MainApp.get(ROUTERS.LEVELS, Levels.getAllLevels);

MainApp.get(ROUTERS.LEVELS_DETAIL, Levels.getOne);
MainApp.delete(ROUTERS.LEVELS_DETAIL, checkUserAuh, Levels.remove);
MainApp.patch(ROUTERS.LEVELS_DETAIL, checkUserAuh, Levels.update);



// Конфигурация сервера

MainApp.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
})