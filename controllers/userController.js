


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
let { User } = require('../models/models.js');
const UserService = require('../service/userService.js');

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
            const {username, email, password } = req.body;
            const userData = await UserService.registration(username, email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (err) {
            console.error(err.message);
            return next(ApiError.badRequest(err.message));
        }
    }

    async login(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async activate(req, res, next) {
        try {

        } catch (err) {

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
            try {

            } catch (err) {

            }
        }
    async getUsers(req, res, next) {
            try {

            } catch (err) {

            }
        }
    async updateUser(req, res, next) {
            try {

            } catch (err) {

            }
        }
    async banUser(req, res, next) {
            try {

            } catch (err) {

            }
        }
    }

module.exports = new UserController();