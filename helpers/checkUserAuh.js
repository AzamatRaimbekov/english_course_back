import jwt from 'jsonwebtoken';


// MidleWare функция для проверки есть ли токен в хедерах
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            // Вот тут мы расшифровываем токен
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            // Эта функция next() дает доступ к следующим функциям
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        // Нет доступа, так как нет токена
        return res.status(403).json({
            message: 'Нет доступа',
        });

    }
};
