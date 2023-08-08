const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');
const ApiError = require('../error/ApiError');


class UserService {
    async registration(username, email, password) {
        const candidate = await User.findOne({ where: { email: email } });
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({ username, email, password: hashPassword, activationLink });
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        
        const userDto = new UserDto(user);
        console.log(userDto);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();