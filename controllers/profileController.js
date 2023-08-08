const ApiError = require("../error/ApiError");
const { User, Comment } = require("../models/models");


class ProfileController {
    async getProfile(req, res, next) {
        try {
            const { id } = req.query;
            const user = await User.findOne({ where: { id } });

            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            const comments = await Comment.findAll({ where: { user_id: id, is_deleted: false } });

            const data = {
                "id": user.id,
                "name": user.username,
                "rating": user.rating,
                "comments": comments
            }
            console.log(data);
            return res.json(data);
        } catch (e) {
            next(ApiError.notFound(e.message));
        }
    }
    async updateProfile(req, res, next) { }
    async getComments(req, res, next) { }
    async addComment(req, res, next) { }
    async deleteComment(req, res, next) { }
}

module.exports = new ProfileController();