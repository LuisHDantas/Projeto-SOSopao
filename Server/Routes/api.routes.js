import express from "express";
import usuarioController from "../Controllers/usuario.controller.js";
import eventoController from "../Controllers/evento.controller.js";
import qrcodeController from "../Controllers/qrcode.controller.js";
import itemController from "../Controllers/item.controller.js";
import voluntarioController from "../Controllers/voluntario.controller.js";
import pontoParadaController from '../Controllers/pontoParada.controller.js';
import superalimentoController from '../Controllers/superalimento.controller.js';
import alimentoController from '../Controllers/alimento.controller.js';

const router = express.Router();

// Rotas para a tabela "Usuarios"
router.get("/usuarios", usuarioController.findAll);
router.get("/usuarios/:id", usuarioController.findById);
router.post("/usuarios", usuarioController.create);
router.delete("/usuarios/:id", usuarioController.deleteByPk);
router.put("/usuarios/:id", usuarioController.update);

// Rotas para a tabela "Eventos"
router.get("/eventos", eventoController.findAll);
router.get("/eventos/:id", eventoController.findById);
router.post("/eventos", eventoController.create);
router.delete("/eventos/:id", eventoController.deleteByPk);
router.put("/eventos/:id", eventoController.update);

// Rotas para a tabela "QrCode"
router.get("/qrcode", qrcodeController.findAll);
router.get("/qrcode/:id", qrcodeController.findById);
router.post("/qrcode", qrcodeController.create);
router.delete("/qrcode/:id", qrcodeController.deleteByPk);
router.put("/qrcode/:id", qrcodeController.update);

// Rotas para a tabela "Item"
router.get("/item", itemController.findAll);
router.get("/item/:nome", itemController.findByNome);
router.post("/item", itemController.create);
router.delete("/item/:nome", itemController.deleteByPk);
router.put("/item/:nome", itemController.update);

// Rotas para a tabela "Voluntario"
router.get("/voluntario", voluntarioController.findAll);
router.get("/voluntario/:nome/:email", voluntarioController.findByPk);
router.post("/voluntario", voluntarioController.create);
router.delete("/voluntario/:nome/:email", voluntarioController.deleteByPk);
router.put("/voluntario/:nome/:email", voluntarioController.update);

// Rotas para a tabela "PontoParada"
router.get("/pontoparada", pontoParadaController.findAll);
router.get("/pontoparada/:posicao", pontoParadaController.findByPosicao);
router.post("/pontoparada", pontoParadaController.create);
router.delete("/pontoparada/:posicao", pontoParadaController.deleteByPk);
router.put("/pontoparada/:posicao", pontoParadaController.update);

// Rotas para a tabela "Superalimento"
router.get('/superalimento', superalimentoController.findAll);
router.get('/superalimento/:nome', superalimentoController.findByNome);
router.post('/superalimento', superalimentoController.create);
router.delete('/superalimento/:nome', superalimentoController.deleteByPk);
router.put('/superalimento/:nome', superalimentoController.update);

// Rotas para a tabela "Alimento"
router.get("/alimento", alimentoController.findAll);
router.get("/alimento/:id", alimentoController.findById);
router.post("/alimento", alimentoController.create);
router.put("/alimento/:id", alimentoController.update);
router.delete("/alimento/:id", alimentoController.deleteByPk);

export default router;