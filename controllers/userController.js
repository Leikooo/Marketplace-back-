


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
let { User } = require('../models/models.js');



const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
    );
};

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body;

            console.log(req.body);

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'));
            }

            // Проверяем, есть ли уже пользователь с таким email
            let is_exists = await User.findOne({ where: { email } });

            if (is_exists) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            // Хешируем пароль
            const hashPassword = await bcrypt.hash(password, 5);

            // Создаем пользователя
            const user = await User.create({ email, password: hashPassword, role });

            // Создаем JWT-токен для пользователя
            const token = generateJwt(user.id, user.email, user.role);

            return res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Ошибка сервера');
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'));
            }

            // Проверяем, есть ли уже пользователь с таким email
            let user = await User.findOne({ where: { email } });

            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не существует'));
            }

            // Проверяем, совпадает ли пароль
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return next(ApiError.badRequest('Неверный пароль'));
            }

            // Создаем JWT-токен для пользователя
            const token = generateJwt(user.id, user.email, user.role);

            return res.json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Ошибка сервера');
        }
    }
    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({ token });
        } catch (err) {
            console.error(err.message);
            return next(ApiError.internal('Ошибка сервера'));
        }
    }

    async getUser(req, res, next) {

        const { id } = req.query;

        if (!id) {
            return next(ApiError.badRequest('Не указан id пользователя'));
        }

        try {
            const user = await User.findOne({ where: { id } });

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            res.json(user);
        } catch (err) {
            console.error(err.message);
            return next(ApiError.internal('Ошибка сервера'));
        }

    }
    async getUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json(users);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id, email, password, role, status } = req.body;
            const user = await User.update(
                { email, password, role, status },
                { where: { id } },
            );
            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async banUser(req, res, next) {
        try {
            const { id } = req.body;
            const user = await User.update(
                { status: 'banned' },
                { where: { id } },
            );
            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();