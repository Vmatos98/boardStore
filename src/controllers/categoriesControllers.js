import colors from 'colors';

import db from './../db.js';

export async function getCategories(req, res) {
    try {
        const categories = await db.query('SELECT * FROM categories');
        res.send(categories.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function postCategory(req, res) {
    try {
        const { name } = req.body;
        const result = await db.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        console.log(`${result.rows[0].name} added`.green);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}