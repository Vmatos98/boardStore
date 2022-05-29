import colors from 'colors';

import db from './../db.js';

export async function getCustomers() {
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
        res.send(customer.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}