const ApiError = require("../error/ApiError");

class ProfileController{
    async getProfile(req, res, next) {}
    async updateProfile(req, res, next) {}
    async getComments(req, res, next) {}
    async addComment(req, res, next) {}
    async deleteComment(req, res, next) {}
}

module.exports = new ProfileController();