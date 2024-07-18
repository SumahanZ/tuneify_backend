import Router from "express";
import { loginUserHandler, signupUserHandler } from "./user_controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { createUserInputSchema } from "../../schemas/user_schema";

const router = Router();

router.post(
  "/user/signup",
  validateSchema(createUserInputSchema),
  signupUserHandler
);

router.post("/user/login", loginUserHandler);

router.use("/api", router);

export default router;
