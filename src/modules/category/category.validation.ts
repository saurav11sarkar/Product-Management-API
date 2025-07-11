import z from "zod";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(50, { message: "Category name must be at most 50 characters" }),
  description: z.string().optional(),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name cannot be empty" })
    .max(50, { message: "Category name must be at most 50 characters" })
    .optional(),
  description: z.string().optional(),
});

export const categoryValidation = {
  categorySchema,
  updateCategorySchema,
};
