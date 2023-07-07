
const ApiError = require("../error/ApiError");
const { Category } = require("../models/models.js");

class CtgController{
    async create(req, res, next) {
        try {
            const { title, description, created_by } = req.body;
            const category = await Category.create({ title, description, created_by });
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let categories;
            categories = await Category.findAndCountAll({ limit, offset });
            return res.json(categories);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findOne(
                {
                    where: { id },
                },
            );
            return res.json(category);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async update(req, res, next) {
        try {
            const { id, title, description, created_by } = req.body;
            const category = await Category.update(
                { title, description, created_by },
                { where: { id } },
            );
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.destroy(
                { where: { id } },
            );
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CtgController();