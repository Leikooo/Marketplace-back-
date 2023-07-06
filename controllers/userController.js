


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
let {User} = require('../models/models.js');
let {Auth} = require('../models/models.js');

class UserController {
    async registration(req, res, next) {
        const { username, email, login, password } = req.body;

        console.log(req.body);

        if (!username || !email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }

        try {
            // Проверяем, есть ли уже пользователь с таким email
            let user = await User.findOne({ email });

            if (user) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            // Создаем нового пользователя
            user = await User.create({ username: username});
            let user_id = user.id;
            

            // Хешируем пароль перед сохранением пользователя в базу данных
            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);
            await Auth.create({ user_id: user_id, email: email, login: login, password: hash_password});

            await user.save();

            // Создаем JWT-токен для пользователя
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                    res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Ошибка сервера');
        }
    }

    async login(req, res) {
    }
    async check(req, res) {
    }
    async logout(req, res) {
    }
    async getUser(req, res, next) {
    
        const { id } = req.query;

        if (!id) {
            return next(ApiError.badRequest('Не указан id пользователя'));
        }

        try {
            const user = await User.findOne({ id });

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            res.json(user);
        } catch (err) {
            console.error(err.message);
            return next(ApiError.internal('Ошибка сервера'));
        }

    }
    async getUsers(req, res) {
    }
    async getUsersByRole(req, res) {
    }
    async getUsersByStatus(req, res) {
    }
}

module.exports = new UserController();