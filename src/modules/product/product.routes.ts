import express from "express";
import { productController } from "./product.controller";
import validation from "../../middlewares/validation";
import { productValidation } from "./product.validation";
const router = express.Router();

router.post(
  "/",
  validation(productValidation.productSchema),
  productController.createProduct
);

export const productRouter = router;
