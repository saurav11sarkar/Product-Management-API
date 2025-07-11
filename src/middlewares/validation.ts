import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

const validation = <T extends ZodType<any>>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validation;
