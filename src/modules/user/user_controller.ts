import { Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../../schemas/user_schema";
import { createUser, validatePassword } from "./user_service";
import { signJWT } from "../../utils/jwtUtils";

type LoginInput = {
  email: string;
  password: string;
};

export async function signupUserHandler(
  req: Request<{}, {}, CreateUserInput, {}>,
  res: Response
) {
  const {
    body: { name, email, password },
  } = req.body;

  try {
    const newUser = await createUser({ name, email, password });
    return res.status(201).json({ msg: "User successfully created!", newUser });
  } catch (err) {
    return res.status(404).json({ msg: "User signup unsuccessful!" });
  }
}

export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput, {}>,
  res: Response
) {
  const {
    body: { email, password },
  } = req.body;

  try {
    const validatedUser = await validatePassword({ email, password });

    const accessToken = signJWT(validatedUser, {
      expiresIn: process.env.ACCESS_TOKEN_LIVE,
    });

    if (!accessToken)
      return res.status(400).json({ msg: "Fail to generate access token" });

    const refreshToken = signJWT(validatedUser, {
      expiresIn: process.env.REFRESH_TOKEN_LIVE,
    });

    if (!refreshToken)
      return res.status(400).json({ msg: "Fail to generate refresh token!" });

    return res
      .status(200)
      .json({ msg: "User login successful!", accessToken, refreshToken });
  } catch (err) {
    return res.status(400).json({ msg: "User login unsuccessful!" });
  }
}
