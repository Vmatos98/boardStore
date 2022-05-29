import colors from 'colors';

import db from './../db.js';

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT games.*, categories.name AS "categoryName"
        FROM games
        JOIN categories
        ON games."categoryId" = categories.id
        `);
        res.send(games.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}