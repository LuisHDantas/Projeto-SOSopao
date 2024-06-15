import express from "express";
import usuarioController from "../Controllers/usuario.controller.js";
import eventoController from "../Controllers/evento.controller.js";
import qrcodeController from "../Controllers/qrcode.controller.js";
import itemController from "../Controllers/item.controller.js";
import voluntarioController from "../Controllers/voluntario.controller.js";
import pontoParadaController from '../Controllers/pontoParada.controller.js';
import superalimentoController from '../Controllers/superalimento.controller.js';
import alimentoController from '../Controllers/alimento.controller.js';
import authController from "../Controllers/auth.controller.js";

const router = express.Router();

//Rotas para autenticação
router.post("/signup", authController.validateToken, authController.register);
router.post("/signin", authController.login);
router.get("/expireToken/:token", authController.validateExpireToken);


// Rotas para a tabela "Usuarios"
router.get("/usuarios", authController.validateToken, usuarioController.findAll);
router.get("/usuarios/:id", authController.validateToken, usuarioController.findById);
router.delete("/usuarios/:id", authController.validateSuperToken, usuarioController.deleteByPk); //Apenas super admin pode 
router.put("/usuarios/:id", authController.validateToken, usuarioController.update);

// Rotas para a tabela "Eventos"
router.get("/eventos", eventoController.findAll);
router.get("/eventos/:id", eventoController.findById);
router.post("/eventos", authController.validateToken, eventoController.create);
router.delete("/eventos/:id", authController.validateToken, eventoController.deleteByPk);
router.put("/eventos/:id", authController.validateToken, eventoController.update);

// Rotas para a tabela "QrCode"
router.get("/qrcode", qrcodeController.findAll);
router.get("/qrcode/:id", qrcodeController.findById);
router.post("/qrcode", authController.validateToken, qrcodeController.create);
router.delete("/qrcode/:id", authController.validateToken, qrcodeController.deleteByPk);
router.put("/qrcode/:id", authController.validateToken, qrcodeController.update);

// Rotas para a tabela "Item"
router.get("/item", itemController.findAll);
router.get("/item/:nome", itemController.findByNome);
router.post("/item", authController.validateToken, itemController.create);
router.delete("/item/:nome", authController.validateToken, itemController.deleteByPk);
router.put("/item/:nome", authController.validateToken, itemController.update);

// Rotas para a tabela "Voluntario"
router.all("/voluntario", authController.validateToken);
router.get("/voluntario", voluntarioController.findAll);
router.get("/voluntario/:nome/:email", voluntarioController.findByPk);
router.post("/voluntario", voluntarioController.create);
router.delete("/voluntario/:nome/:email", voluntarioController.deleteByPk);
router.put("/voluntario/:nome/:email", voluntarioController.update);

// Rotas para a tabela "PontoParada"
router.all("/pontoparada", authController.validateToken);
router.get("/pontoparada", pontoParadaController.findAll);
router.get("/pontoparada/:posicao", pontoParadaController.findByPosicao);
router.post("/pontoparada", pontoParadaController.create);
router.delete("/pontoparada/:posicao", pontoParadaController.deleteByPk);
router.put("/pontoparada/:posicao", pontoParadaController.update);

// Rotas para a tabela "Superalimento"
router.get('/superalimento', superalimentoController.findAll);
router.get('/superalimento/:nome', superalimentoController.findByNome);
router.post('/superalimento', authController.validateToken, superalimentoController.create);
router.delete('/superalimento/:nome', authController.validateToken, superalimentoController.deleteByPk);
router.put('/superalimento/:nome', authController.validateToken, superalimentoController.update);

// Rotas para a tabela "Alimento"
router.get("/alimento", alimentoController.findAll);
router.get("/alimento/:id", alimentoController.findById);
router.post("/alimento", authController.validateToken, alimentoController.create);
router.put("/alimento/:id", authController.validateToken, alimentoController.update);
router.delete("/alimento/:id", authController.validateToken, alimentoController.deleteByPk);

export default router;