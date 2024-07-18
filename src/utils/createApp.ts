import express from "express";
import dotenv from "dotenv";
import { initializeRoute } from "./routeInitializer";

export function createApp() {
  const app = express();
  dotenv.config();
  app.use(express.json());
  initializeRoute(app);
  return app;
}
