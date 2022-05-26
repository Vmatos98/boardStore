import { Router } from 'express';

import {getCategories, postCategory} from '../controllers/categoriesControllers.js';

const categoriesRoutes = Router();

categoriesRoutes.get('/categories', getCategories);
categoriesRoutes.post('/categories', postCategory);

export default categoriesRoutes;
