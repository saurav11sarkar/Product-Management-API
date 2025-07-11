import express from "express";
import { categoryController } from "./category.controller";
import validation from "../../middlewares/validation";
import { categoryValidation } from "./category.validation";
const router = express.Router();

router.post(
  "/",
  validation(categoryValidation.categorySchema),
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategory);

router.get("/:id", categoryController.getCategoryById);

router.put(
  "/:id",
  validation(categoryValidation.updateCategorySchema),
  categoryController.updateCategory
);

router.delete("/:id", categoryController.deletedCategory);

export const catagoryRouter = router;
