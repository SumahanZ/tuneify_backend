import userRoute from "../modules/user/user_route";
import express, { Express } from "express";

export function initializeRoute(app: Express) {
  app.use(userRoute);
}
