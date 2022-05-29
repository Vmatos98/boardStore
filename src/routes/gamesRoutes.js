import { Router } from 'express';

import {getGames, postGames} from '../controllers/gamesControllers.js';
import {addGamesRules} from '../middlewares/gamesRules.js';
const gamesRoutes = Router();

gamesRoutes.get('/games', getGames);
gamesRoutes.post('/games', addGamesRules, postGames);

export default gamesRoutes;