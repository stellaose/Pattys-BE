import { Router } from 'express';

import ProductRoute from './ProductRoutes.js'
import UserRoute from './UserRoutes.js'
import OrderRoute from './OrderRoutes.js'

const router = Router()

router.use('/user', UserRoute);
router.use('/product', ProductRoute);
router.use('/order', OrderRoute)


export default router