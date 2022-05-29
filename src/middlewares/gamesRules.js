import colors from 'colors';

import db from './../db.js';
import {gameSchema} from './../schemas/gamesSchemas.js';
export async function addGamesRules(req, res, next){
    try {
        const { name, image, stockTotal, pricePerDay, categoryId } = req.body;
        const check = gameSchema.validate({ name, image, stockTotal, pricePerDay, categoryId });
        if(check.error) {
            console.log((check.error.details[0].message).red);
            return  res.status(400).send(check.error.details[0].message);
        }
        const result = await db.query(`SELECT * FROM games WHERE name = $1`, [name]);
        if(result.rows.length > 0) {
            console.log('Game already exists'.red);
            return res.status(409).send('Game already exists');
        }
        const resultId = await db.query(`SELECT id FROM categories WHERE id = $1`, [categoryId]);
        if(resultId.rows.length === 0) {
            console.log('Category not found'.red);
            return res.status(400).send('Category not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    next();
}