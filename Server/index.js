import express from "express";
import apirouter from "./Routes/api.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apirouter);
app.use(cors());

const port = 3000;
app.listen(port, function () {
  console.log("Serviço executanto na porta " + port);
});
