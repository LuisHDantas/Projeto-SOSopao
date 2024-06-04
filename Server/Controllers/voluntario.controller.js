import Voluntario from "../Models/voluntario.model.js";

function findAll(request, response) {
  Voluntario
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findByPk(request, response) {
  Voluntario
    .findOne({ where: { nome: request.params.nome, email: request.params.email } })
    .then(res => {
    if (res) {
        response.status(200).json(res);
    } else {
        response.status(404).json({ error: "Voluntário não encontrado" });
    }
    })
    .catch(err => {
    response.status(500).json(err);
    });
}  

function create(request, response) {
  Voluntario
    .create({
      nome: request.body.nome,
      email: request.body.email,
      telefone: request.body.telefone,
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  Voluntario
    .destroy({ where: { nome: request.params.nome, email: request.params.email } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Voluntário não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  Voluntario
    .update(
      {
        nome: request.body.nome,
        email: request.body.email,
        telefone: request.body.telefone,
      },
      { where: { nome: request.params.nome, email: request.params.email } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Voluntário não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findByPk, create, deleteByPk, update };
