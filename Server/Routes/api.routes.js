import express from "express";
import usuarioController from "../Controllers/usuario.controller.js";

const router = express.Router();

router.get("/usuarios", usuarioController.findAll);
router.get("/usuarios/:id", usuarioController.findById);
router.post("/usuarios", usuarioController.create);
router.delete("/usuarios/:id", usuarioController.deleteByPk);
router.put("/usuarios/:id", usuarioController.update);

export default router;