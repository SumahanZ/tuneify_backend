import Router from "express";
import { loginUserHandler, signupUserHandler } from "./user_controller";

const router = Router();

router.post("/user/signup", signupUserHandler);

router.post("/user/login", loginUserHandler);

router.use("/api", router);

export default router;
