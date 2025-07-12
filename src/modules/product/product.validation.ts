import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  description: z.string().optional(),
  price: z
    .number({ message: "Price must be a number" })
    .min(1, "Price must be at least 1")
    .positive("Price must be a positive number"),
  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must be at most 100")
    .optional(),
  imageUrl: z.any().optional(),
  status: z.enum(["In Stock", "Stock Out"]).optional(),
  category: z.string().min(1, "Category ID is required"),
});

export const updatedProductSchema = z.object({
  description: z.string().optional(),

  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must be at most 100")
    .optional(),

  status: z.enum(["In Stock", "Stock Out"]).optional(),
});

export const productValidation = {
  productSchema,
  updatedProductSchema,
};
