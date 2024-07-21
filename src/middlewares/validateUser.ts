import { NextFunction, Request, Response } from "express";

export async function validateUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) return res.sendStatus(403);

  return next();
}
