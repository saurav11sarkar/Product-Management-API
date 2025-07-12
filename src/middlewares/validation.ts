import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import AppError from "../error/appError";

const validation = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("application/json")) {
      return next();
    }

    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (err: any) {
      if (err.name === "ZodError") {
        const message = err.errors?.[0]?.message || "Validation failed";
        return next(new AppError(400, message));
      }
      next(err);
    }
  };
};

export default validation;
