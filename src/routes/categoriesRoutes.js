import { Router } from 'express';

import {getCategories, postCategory} from '../controllers/categoriesControllers.js';
import {addCategoryRules} from '../middlewares/categoriesRules.js';
const categoriesRoutes = Router();

categoriesRoutes.get('/categories', getCategories);
categoriesRoutes.post('/categories', addCategoryRules, postCategory);

export default categoriesRoutes;
