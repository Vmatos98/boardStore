import { Router } from 'express';

import {getCustomers} from './../controllers/customersControllers.js';

const customersRoutes = Router();

customersRoutes.get('/customers', getCustomers);

export default customersRoutes;