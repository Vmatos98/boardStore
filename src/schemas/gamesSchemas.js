import Joi from "joi";

export const gameSchema = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().integer().min(1).required(),
    pricePerDay: Joi.number().integer().min(1).required(),
    categoryId: Joi.number().integer().required()
});