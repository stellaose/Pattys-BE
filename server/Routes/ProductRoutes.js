import { Router } from 'express';
import ProductController from '../Controller/ProductController.js';
import { Auth, AllowedRoles }  from '../Middleware/Auth.js';

const router = Router();

// + user routes 
router.get('/one-product/:id', ProductController.getProduct);
router.get('/all-products',  ProductController.getAllProducts);

// * admin routes
router.post('/create-product', Auth, AllowedRoles("admin"), ProductController.createProduct);
router.put('/update-product/:id', Auth, AllowedRoles("admin"), ProductController.updateProduct);
router.delete('/delete-product/:id', Auth, AllowedRoles("admin"), ProductController.deleProduct);

export default router;