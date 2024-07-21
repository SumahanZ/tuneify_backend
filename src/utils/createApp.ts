import express from "express";
import dotenv from "dotenv";
import { initializeRoute } from "./routeInitializer";
import { validateToken } from "../middlewares/validateToken";
import "./configureMulter";

export function createApp() {
  const app = express();
  dotenv.config();
  app.use(express.json());
  app.use(validateToken);
  initializeRoute(app);
  return app;
}
