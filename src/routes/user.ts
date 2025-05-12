import { Router } from "express";
import { login, register } from "../controllers/user";

const router = Router();

router.post("/api/user/register", async (req, res) => {
    await register(req, res);
});

router.post("/api/user/login", async (req, res) => {
    await login(req, res);
});

export default router;
