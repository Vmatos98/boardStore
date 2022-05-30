import colors from 'colors';
import dayjs from 'dayjs';

import db from './../db.js';

export async function getRentals(req, res) {
    try {
        const {customerId, gameId} = req.query;
        const rentals = await db.query(`SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName",  categories.name AS "categoryName"
        FROM rentals 
        JOIN customers 
        ON rentals."customerId" = customers.id
        JOIN games
        ON rentals."gameId" = games.id
        JOIN categories
        ON games."categoryId" = categories.id
        `);

        let filteredRentals = [];
        for(let rental of rentals.rows){
            let aux = {...rental, 
                customer: { 
                    id: rental.customerId, 
                    name: rental.customerName 
                }, 
                game: { 
                    id: rental.gameId, 
                    name: rental.gameName, 
                    categoryId: rental.categoryId, 
                    categoryName: rental.categoryName 
                } 
                } 
                delete aux.customerName; 
                delete aux.gameName; 
                delete aux.categoryId; 
                delete aux.categoryName; 
                filteredRentals.push(aux); 
                }

        
        if (customerId) {
            console.log(customerId, rentals.rows[0].customerId);
            const customer = rentals.rows.filter(rental => rental.customerId === parseInt(customerId));
            if (customer.length === 0) {
                return res.status(404).send('Customer not found');
            } 
            return res.send(customer);
        }else if(gameId) {
            const game = rentals.rows.filter(rental => rental.gameId === parseInt(gameId));
            if (game.length === 0) {
                return res.status(404).send('Game not found');
            } 
            return res.send(game);
        }
        res.status(200).send(filteredRentals);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function postRentals(req, res) {
    try {
        const {customerId, gameId, daysRented} = req.body;
        const day = dayjs().format('YYYY-MM-DD');
        const date2 = new Date('2022-05-31');
        const diffTime = Math.abs(date2 - new Date(day));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const game = await db.query(`SELECT * FROM games WHERE id = ${gameId}`);
        const price = game.rows[0].pricePerDay*daysRented;
        db.query(`UPDATE games SET "stockTotal" = ${game.rows[0].stockTotal - 1} WHERE id = ${gameId}`);
        const rental = await db.query(`INSERT INTO 
        rentals ("customerId", "gameId","rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [customerId, gameId, day, daysRented, null, price, null]
        );
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function postFinishRentals(req, res) {
    try{
        const { id }= req.params;
        const returnDate = dayjs().format('YYYY-MM-DD');
        const rentals = await db.query(`SELECT * FROM rentals WHERE id = ${id}`);
        const price = rentals.rows[0].originalPrice/rentals.rows[0].daysRented;
        const timeFee =  Math.ceil((new Date(returnDate)-new Date(rentals.rows[0].rentDate) )/(1000*60*60*24)-rentals.rows[0].daysRented);
        let delayFee =timeFee * price;
        if(delayFee<0){
            delayFee = 0;
        }
        const edit = await db.query(`UPDATE rentals 
        SET "returnDate" = $1, "delayFee" = $2 
        WHERE id = $3 `, 
        [returnDate, delayFee, id]
        );
        res.sendStatus(200);
    }catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function deleteRentals(req, res) {
    try {
        const { id } = req.params;
        const rental = await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}