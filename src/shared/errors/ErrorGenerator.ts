import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

export default class ErrorGenerator {

  public static showError = (error: Error, request: Request, response: Response, next: NextFunction): Response => {
    if (error instanceof (AppError)) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  };


}


