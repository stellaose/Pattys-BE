import { Router } from 'express';
import AuthRoute from './AdminAuthRoute.js'


const router = Router()

router.use('/auth', AuthRoute)


export default router