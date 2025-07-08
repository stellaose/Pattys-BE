import { Router } from 'express';

import ProductRoute from './ProductRoutes.js'
import UserRoute from './UserRoutes.js'
import OrderRoute from './OrderRoutes.js'
import PaymentRoute from './PaymentRoutes.js'

const router = Router()

router.use('/auth', UserRoute);
router.use('/product', ProductRoute);
router.use('/order', OrderRoute)
router.use('/payment', PaymentRoute)


export default router