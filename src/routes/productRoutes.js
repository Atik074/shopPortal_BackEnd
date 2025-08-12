import express from 'express';
import { createProduct, getNewArrivals, getProducts, getSingleProduct, topSalesProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/products', createProduct)
router.get("/products", getProducts)
router.get("/product/:slug", getSingleProduct)
router.get("/products/new-arrivals", getNewArrivals)
router.get("/products/top-sales", topSalesProducts)



export default router;