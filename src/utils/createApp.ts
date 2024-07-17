import express from "express";
import dotenv from "dotenv";

export function createApp() {
  const app = express();
  dotenv.config();
  app.use(express.json());

  return app;
}
