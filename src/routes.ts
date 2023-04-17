import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { PertController } from "./controllers/PertController";

const userController = new UserController();
const pertController = new PertController();

export const router = Router();

router.post("/create-user", userController.createUser);
router.get("/get-user", userController.getUser);
router.get("/get-users", userController.getUsers);

router.post("/create-pert/:userId", pertController.create);
router.get("/get-pert/:id", pertController.getPert);
router.get("/get-perts-by-user/:userId", pertController.getPertsByUser);
router.get("/get-perts", pertController.getPerts);
router.put("/put-pert/:id", pertController.update);
router.delete("/delete-pert/:id", pertController.delete);
