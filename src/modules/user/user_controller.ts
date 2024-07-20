import { Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../../schemas/user_schema";
import { createUser, validatePassword } from "./user_service";
import { signJWT } from "../../utils/jwtUtils";
import log from "../../utils/logger";

export async function signupUserHandler(
  req: Request<{}, {}, CreateUserInput["body"], {}>,
  res: Response
) {
  const { name, email, password } = req.body;

  try {
    const newUser = await createUser({ name, email, password });
    return res.status(201).json({ user: newUser });
  } catch (err) {
    log.error(err);
    return res.status(404).json({ msg: "User signup unsuccessful!" });
  }
}

export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput["body"], {}>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const validatedUser = await validatePassword({ email, password });

    const accessToken = signJWT(validatedUser, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    if (!accessToken)
      return res.status(400).json({ msg: "Failed to generate access token" });

    const refreshToken = signJWT(validatedUser, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    if (!refreshToken)
      return res.status(400).json({ msg: "Failed to generate refresh token!" });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(400).json({ msg: "User login unsuccessful!" });
  }
}

export async function getDataHandler(
  req: Request<{}, {}, {}, {}>,
  res: Response
) {
  return res.sendStatus(200);
}
