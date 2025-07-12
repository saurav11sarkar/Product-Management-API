import express from "express";
import { productController } from "./product.controller";
import validation from "../../middlewares/validation";
import { productValidation } from "./product.validation";
import uploadImg from "../../middlewares/imageUpload";
const router = express.Router();

router.post(
  "/",
  uploadImg("image"),
  validation(productValidation.productSchema),
  productController.createProduct
);

router.put(
  "/:id",
  validation(productValidation.updatedProductSchema),
  productController.updatedProduct
);

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getCategoryById);

router.delete("/:id", productController.deletedProductById);

export const productRouter = router;
