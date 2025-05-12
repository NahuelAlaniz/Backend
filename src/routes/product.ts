import { Router } from "express";
import { getProducts, registerProduct } from "../controllers/product";
import validateToken from "./validateToken";
import { registerPurchase } from "../controllers/product";
import { updateStock } from "../controllers/productController";


const router = Router();

router.post("/api/product/register", registerProduct)
router.get("/api/product/getProducts", validateToken, getProducts)

// Ruta para registrar una compra
router.post("/api/product/registerPurchase", validateToken, registerPurchase); // Ruta protegida

// Ruta para actualizar el stock
router.put("/api/product/updateStock", updateStock);


export default router