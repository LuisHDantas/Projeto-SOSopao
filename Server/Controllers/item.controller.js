import Item from "../Models/item.model.js";

function findAll(request, response) {
  Item
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findByNome(request, response) {
  Item
    .findByPk(request.params.nome)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "Item não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
  Item
    .create({
      nome: request.body.nome,
      descricao: request.body.descricao,
      quantidade: request.body.quantidade,
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  Item
    .destroy({ where: { nome: request.params.nome } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Item não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  Item
    .update(
      {
        nome: request.body.nome,
        descricao: request.body.descricao,
        quantidade: request.body.quantidade,
      },
      { where: { nome: request.params.nome } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Item não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findByNome, create, deleteByPk, update };
