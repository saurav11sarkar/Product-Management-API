import express from "express";
import { catagoryRouter } from "../modules/category/category.routes";
import { productRouter } from "../modules/product/product.routes";
const router = express.Router();

const productManagemetRouter = [
  { path: "/category", name: catagoryRouter },
  { path: "/product", name: productRouter },
];

productManagemetRouter.forEach((item) => router.use(item.path, item.name));

export default router;
