const uuid = require("uuid");
const path = require("path");
const { Item } = require("../models/models");
const ApiError = require("../error/ApiError");

class ItemController {
    async create(req, res, next) {
        try {
            const { title, description, created_by, position_id, category_id, price } = req.body;
            const { img } = req.files; 
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            const item = await Item.create({ title, description, created_by, position_id, category_id, price, img: fileName});
            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let { category_id, position_id, limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let items;
            if (!category_id && !position_id) {
                items = await Item.findAndCountAll({ limit, offset });
            }
            if (category_id && !position_id) {
                items = await Item.findAndCountAll({ where: { category_id }, limit, offset });
            }
            if (!category_id && position_id) {
                items = await Item.findAndCountAll({ where: { position_id }, limit, offset });
            }
            if (category_id && position_id) {
                items = await Item.findAndCountAll({ where: { category_id, position_id }, limit, offset });
            }
            return res.json(items);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findOne(
                {
                    where: { id },
                    include: [{ model: Position, as: "position" }, { model: Category, as: "category" }],
                },
            );
            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id, title, description, created_by, position_id, category_id, price } = req.body;
            const item = await Item.update(
                { title, description, created_by, position_id, category_id, price },
                { where: { id } },
            );
            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.destroy({ where: { id } });
            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


}

module.exports = new ItemController();