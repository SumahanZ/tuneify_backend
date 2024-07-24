import { Router } from "express";
import { validateUser } from "../../middlewares/validateUser";
import { addRemoveFavoriteHandler, getUserFavoritesHandler } from "./favorite_controller";

const router = Router();

router.post("/favorite", validateUser, addRemoveFavoriteHandler);

router.get("/favorite", validateUser, getUserFavoritesHandler);

router.use("/api", router);

export default router;
