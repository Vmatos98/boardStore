import colors from 'colors';

import db from './../db.js';
import {customerSchema} from './../schemas/customersSchemas.js';
export async function addCustomerRules(req, res, next){
    try {
        const {name, phone, cpf, birthday}= req.body;
        const check = customerSchema.validate({ name, phone, cpf, birthday });
        if(check.error) {
            console.log((check.error.details[0].message).red);
            return  res.status(400).send(check.error.details[0].message);
        }
        const result = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if(result.rows.length > 0) {
            console.log('Customer already exists'.red);
            return res.status(409).send('Customer already exists');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    next();
}

export async function updateCustomerRules(req, res, next){
    try {
        const {name, phone, cpf, birthday}= req.body;
        const {id} = req.params;
        const check = customerSchema.validate({ name, phone, cpf, birthday });
        if(check.error) {
            console.log((check.error.details[0].message).red);
            return  res.status(400).send(check.error.details[0].message);
        }
        const result = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(result.rows.length === 0) {
            console.log('Customer not found'.red);
            return res.status(404).send('Customer not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    next();
}