import { Router } from 'express';

import {getCustomers, postCustomer, putCustomer} from './../controllers/customersControllers.js';
import {addCustomerRules, updateCustomerRules} from './../middlewares/customersRules.js';

const customersRoutes = Router();

customersRoutes.get('/customers', getCustomers);
customersRoutes.post('/customers', addCustomerRules, postCustomer);
customersRoutes.put('/customers/:id', updateCustomerRules, putCustomer);
export default customersRoutes;