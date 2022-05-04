import { Router } from 'express';

import ProductRoute from './ProductRoutes.js'
import UserRoute from './UserRoutes.js'

const router = Router()

router.use('/user', UserRoute);
router.use('/product', ProductRoute);


export default router