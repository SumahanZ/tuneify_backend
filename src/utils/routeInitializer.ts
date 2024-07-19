import userRoute from "../modules/user/user_route";
import { Express } from "express";

export function initializeRoute(app: Express) {
  app.use(userRoute);
}
