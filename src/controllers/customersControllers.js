import colors from 'colors';

import db from './../db.js';

export async function getCustomers(req, res) {
    try {
        const { cpf } = req.query;
        const customers = await db.query(`SELECT * FROM customers`);
        if(cpf) {
            const filteredCustomers = customers.rows.filter(customer => customer.cpf.startsWith(cpf));
            if(filteredCustomers.length === 0){
                return res.status(404).send('Customer not found');
            }
            res.send(filteredCustomers);
        }else{
            res.send(customers.rows);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function postCustomer(req, res) {
    try{
        const {name, phone, cpf, birthday}= req.body;
        const customer = await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4) RETURNING *`, [name, phone, cpf, birthday]);
        console.log(`${customer.rows[0].name} added`.green);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function putCustomer(req, res) {
    try{
        const {name, phone, cpf, birthday}= req.body;
        const {id} = req.params;
        console.log(id);
        const customer = await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5 RETURNING *`, [name, phone, cpf, birthday, id]);
        if(customer.rows.length === 0){
            return res.status(404).send('Customer not found');
        }
        console.log(`${customer.rows[0].name} updated`.green);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}