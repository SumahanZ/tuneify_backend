import { Router } from "express";

const router = Router();

router.post("/song/upload-song");

router.use("/api", router);

export default router;
