import { NextFunction, Request, Response } from "express";
import config from "../config";

const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err,
    stack: config.note_env === "development" ? err.stack : null,
  });
};

export default globalError;