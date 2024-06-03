import Superalimento from "../Models/superalimento.model.js";

function findAll(request, response) {
  Superalimento
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findByNome(request, response) {
  Superalimento
    .findByPk(request.params.nome)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "Superalimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
  Superalimento
    .create({
      nome: request.body.nome,
      meta: request.body.meta,
      quantidade: request.body.quantidade,
      unidade_medida: request.body.unidade_medida,
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  Superalimento
    .destroy({ where: { nome: request.params.nome } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Superalimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  Superalimento
    .update(
      {
        nome: request.body.nome,
        meta: request.body.meta,
        quantidade: request.body.quantidade,
        unidade_medida: request.body.unidade_medida,
      },
      { where: { nome: request.params.nome } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Superalimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findByNome, create, deleteByPk, update };
