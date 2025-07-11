import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  meta?: any
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

export default sendResponse;
