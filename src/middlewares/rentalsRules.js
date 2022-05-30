import colors from 'colors';

import db from './../db.js';
import { rentalSchema } from './../schemas/rentalsSchemas.js';
export async function addRentalsRules(req, res, next){
    try {   
    const {customerId, gameId, daysRented} = req.body;
    const check = rentalSchema.validate({ customerId, gameId, daysRented });
    if (check.error) {
        return res.status(400).send(check.error.details[0].message);
    }
    const customer = await db.query(`SELECT * FROM customers WHERE id = ${customerId}`);
        if (customer.rows.length === 0) {
            return res.status(404).send('Customer not found');
        } 
    const game = await db.query(`SELECT * FROM games WHERE id = ${gameId}`);
        if (game.rows.length === 0) {
            return res.status(404).send('Game not found');
        }else{
            if(game.rows[0].stockTotal===0){
                return res.status(400).send('Game not available');
            }
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
    next();
}

export async function finishRentalsRules(req, res, next){
    try {   
    const {id} = req.params;
    const rental = await db.query(`SELECT * FROM rentals WHERE id = ${id}`);
        if (rental.rows.length === 0) {
            return res.status(404).send('Rental not found');
        } 
    if(rental.rows[0].returnDate){
        return res.status(400).send('Rental already returned');
    }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
    next();
}