import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';

export const register = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
export const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
export const logout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
export const profile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
