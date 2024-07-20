import { Router } from "express";
import {
  getDataHandler,
  loginUserHandler,
  signupUserHandler,
} from "./user_controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { createUserInputSchema } from "../../schemas/user_schema";
import { validateUser } from "../../middlewares/validateUser";

const router = Router();

router.post(
  "/user/signup",
  validateSchema(createUserInputSchema),
  signupUserHandler
);

router.post("/user/login", loginUserHandler);

router.get("/user/get-data", validateUser, getDataHandler);

router.use("/api", router);

export default router;
