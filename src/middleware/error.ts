import { ErrorRequestHandler, Request, NextFunction, Response } from 'express';

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nodeEnv = process.env.NODE_ENV || 'DEV';

  err.status = err.status || 500;
  err.message = err.message || 'Enteral server error';

  if (nodeEnv === 'DEV') {
    res.status(err.status).json({
      success: false,
      errors: err,
      message: err.message,
      error_stack: err.stack,
    });
  }

  if (nodeEnv === 'PROD') {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }
};
