import { Router } from 'express';
import ProductController from '../Controller/ProductController.js';
import { Auth, AllowedRoles }  from '../Middleware/Auth.js';

const router = Router();

// + user routes 
router.get('/one-product/:id', ProductController.getProduct);
router.get('/all-products',  ProductController.getAllProducts);

// - review routes
router.put('/review/create-review', Auth, ProductController.createProductReview);

// * admin routes
router.post('/admin/create-product', Auth, AllowedRoles("admin"), ProductController.createProduct);
router.put('/admin/update-product/:id', Auth, AllowedRoles("admin"), ProductController.updateProduct);
router.delete('/admin/delete-product/:id', Auth, AllowedRoles("admin"), ProductController.deleProduct);

export default router;