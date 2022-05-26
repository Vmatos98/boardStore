import Joi from "joi";

export const categorySchema = Joi.object().keys({
    name: Joi.string().required()
});