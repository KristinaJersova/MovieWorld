import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error.status === 400) {
    return res.status(400).json({
      success: false,
      message: error.message || "Bad Request",
    });
  }

  if (error.status === 404) {
    return res.status(404).json({
      success: false,
      message: error.message || "Not Found",
    });
  }

  if (error.status === 409) {
    return res.status(409).json({
      success: false,
      message: error.message || "Conflict",
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};