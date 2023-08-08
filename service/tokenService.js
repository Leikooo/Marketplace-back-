const jwt = require('jsonwebtoken');
const {Token} = require('../models/models');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(user_id, refresh_token) {
        const tokenData = await Token.findOne({ where: { "user_id": user_id } });
        if (tokenData) {
            tokenData.refresh_token = refresh_token;
            return tokenData.save();
        }
        const token = await Token.create({ user_id, refresh_token });
        return token;
    }
}

module.exports = new TokenService();