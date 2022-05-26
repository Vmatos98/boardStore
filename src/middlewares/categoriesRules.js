import colors from 'colors';

import db from './../db.js';

export async function addCategoryRules(req, res, next) {
    try {
        const { name } = req.body;
        if(!name) {
            console.log('Name is required'.red);
            return res.status(400).send('Name is required');
        }
        const result = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
        if(result.rows.length > 0) {
            console.log('Category already exists'.red);
            return res.status(409).send('Category already exists');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    next();
}