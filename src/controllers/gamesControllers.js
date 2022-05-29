import colors from 'colors';

import db from './../db.js';

export async function getGames(req, res) {
    try {
        const { name } = req.query;
        const games = await db.query(`SELECT games.*, categories.name AS "categoryName"
        FROM games
        JOIN categories
        ON games."categoryId" = categories.id
        `);
        if(name) {
            const filteredGames = games.rows.filter(game => game.name.toLowerCase().startsWith(name.toLowerCase()));
            if(filteredGames.length=== 0){
                return res.status(404).send('Game not found');
            }
            res.send(filteredGames);
        } else {
        res.send(games.rows);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


export async function postGames(req, res){
    try {
        const { name, image, stockTotal, pricePerDay, categoryId } = req.body;
        const result = await db.query(`INSERT INTO games 
        (name, image, "stockTotal", "pricePerDay", "categoryId")
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`, 
        [name, image, stockTotal, pricePerDay, categoryId]
        );

        console.log(`${result.rows[0].name} added`.green);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
