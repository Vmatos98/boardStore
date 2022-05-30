import Joi from "joi";

export const rentalSchema = Joi.object().keys({
    customerId: Joi.number().integer().required(),
    gameId: Joi.number().integer().required(),
    daysRented: Joi.number().integer().min(1).required()
});