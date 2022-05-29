import { Router } from 'express';

import {getGames} from '../controllers/gamesControllers.js';

const gamesRoutes = Router();

gamesRoutes.get('/games', getGames);

export default gamesRoutes;