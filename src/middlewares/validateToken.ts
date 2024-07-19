import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { signJWT, verifyJWT } from "../utils/jwtUtils";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh") as string;

  if (!accessToken) return next();

  const { decodedToken, expired, valid } = verifyJWT(accessToken);

  if (decodedToken && valid) {
    res.locals.user = decodedToken;
    return next();
  }

  if (expired && refreshToken) {
    const { decodedToken, expired } = verifyJWT(refreshToken);

    if (expired) return res.status(400).send("Refresh token is invalid");

    const newAccessToken = signJWT(
      { decodedToken },
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    ) as string;

    res.setHeader("x-access-token", newAccessToken);
    res.locals.user = decodedToken;
    return next();
  }

  return next();
}
