import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { PertController } from "./controllers/PertController";
import { SessionController } from "./controllers/SessionController";

import { handleAuth } from "./middlewares/authMiddleware";

const userController = new UserController();
const pertController = new PertController();
const sessionController = new SessionController();

export const router = Router();

router.post("/authenticate", sessionController.createSession);

router.post("/create-user", userController.createUser);
router.get("/get-user", handleAuth, userController.getUser);
router.get("/get-users", handleAuth, userController.getUsers);

router.post("/create-pert", handleAuth, pertController.create);
router.get("/get-pert/:id", handleAuth, pertController.getPert);
router.get("/get-perts-by-user", handleAuth, pertController.getPertsByUser);
router.get("/get-perts", handleAuth, pertController.getPerts);
router.put("/put-pert/:id", handleAuth, pertController.update);
router.delete("/delete-pert/:id", handleAuth, pertController.delete);
