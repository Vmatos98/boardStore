import Joi from "joi";

export const customerSchema = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().pattern(new RegExp('[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}')).required(),
    birthday: Joi.date().required()
});