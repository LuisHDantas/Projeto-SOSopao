import express from "express";
import apirouter from "./Routes/api.routes.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apirouter);

const port = 3001;
app.listen(port, function () {
  console.log("Serviço executando na porta " + port);
});
