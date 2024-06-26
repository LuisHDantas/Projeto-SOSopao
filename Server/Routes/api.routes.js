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
import upload from "../upload/upload.js";

const router = express.Router();

//Rotas para autenticação 
router.post("/signup", authController.validateSuperToken, authController.register);
router.post("/signin", authController.login);
router.get("/expireToken/:token", authController.validateExpireToken);
router.get("/decodeToken/:token", authController.validateToken, authController.decodeToken);
router.get("/validateSuperToken", authController.validateSuperToken, (request, response) => {response.status(200).send()});

// Rotas para a tabela "Usuarios"
router.get("/usuarios", authController.validateToken, usuarioController.findAll);
router.get("/usuarios/:id", authController.validateToken, usuarioController.findById);
router.delete("/usuarios/:id", authController.validateSuperToken, usuarioController.deleteByPk); //Apenas super admin pode 
router.put("/usuarios/:id", authController.validateToken, usuarioController.update);
router.put("/usuarios/admin/:token", authController.validateToken, usuarioController.updateAdmin);
router.get("/usuarios/token/:token", authController.validateToken, usuarioController.getByToken);

// Rotas para a tabela "Eventos"
router.get("/eventos", eventoController.findAll);
router.get("/eventos/:id", eventoController.findById);
router.post("/eventos", authController.validateToken, upload.uploadFile.single("file"), eventoController.create);
router.delete("/eventos/:id", authController.validateToken, eventoController.deleteByPk);
router.put("/eventos/:id", authController.validateToken, upload.uploadFile.single("file"), eventoController.update);

// Rotas para a tabela "QrCode"
router.get("/qrcode", qrcodeController.findAll);
router.get("/qrcode/:id", qrcodeController.findById);
router.post("/qrcode", authController.validateToken, upload.uploadFile.single("file"), qrcodeController.create);
router.delete("/qrcode/:id", authController.validateToken, qrcodeController.deleteByPk);
router.put("/qrcode/:id", authController.validateToken, upload.uploadFile.single("file"), qrcodeController.update);

// Rotas para a tabela "Item"
router.get("/item", itemController.findAll);
router.get("/item/nome/:nome", itemController.findByNome);
router.get("/item/id/:id", itemController.findByID);
router.post("/item", authController.validateToken, itemController.create);
router.delete("/item/nome/:nome", authController.validateToken, itemController.deleteByNome);
router.delete("/item/id/:id", authController.validateToken, itemController.deleteByPk);
router.put("/item/nome/:nome", authController.validateToken, itemController.updateByNome);
router.put("/item/id/:id", authController.validateToken, itemController.updateByID);

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
router.get('/superalimento/id/:id', superalimentoController.findByID);
router.get('/superalimento/nome/:nome', superalimentoController.findByNome);
router.get('/superalimento/:id/alimentos', authController.validateToken, superalimentoController.getAlimentosByID);
router.post('/superalimento', authController.validateToken, upload.uploadFile.single("file"), superalimentoController.create);
router.delete('/superalimento/id/:id', authController.validateToken, superalimentoController.deleteByPk);
router.delete('/superalimento/nome/:nome', authController.validateToken, superalimentoController.deleteByNome);
router.put('/superalimento/nome/:nome', authController.validateToken, upload.uploadFile.single("file"), superalimentoController.updateByNome);
router.put('/superalimento/id/:id', authController.validateToken, upload.uploadFile.single("file"), superalimentoController.updateByID);

// Rotas para a tabela "Alimento"
router.get("/alimento", alimentoController.findAll);
router.get("/alimento/:id", alimentoController.findById);
router.post("/alimento", authController.validateToken, alimentoController.create);
router.post("/alimentos", authController.validateToken, alimentoController.createMultiple);
router.put("/alimento/:id", authController.validateToken, alimentoController.update);
router.delete("/alimento/:id", authController.validateToken, alimentoController.deleteByPk);

export default router;
