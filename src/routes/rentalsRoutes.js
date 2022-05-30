import { Router } from 'express';

import {getRentals, postRentals, postFinishRentals, deleteRentals} from '../controllers/rentalsControllers.js';
import {addRentalsRules, finishRentalsRules} from '../middlewares/rentalsRules.js';
const rentalsRoutes = Router();

rentalsRoutes.get('/rentals', getRentals);
rentalsRoutes.post('/rentals', addRentalsRules, postRentals);
rentalsRoutes.post('/rentals/:id/return', finishRentalsRules, postFinishRentals);
rentalsRoutes.delete('/rentals/:id', finishRentalsRules, deleteRentals);
export default rentalsRoutes;