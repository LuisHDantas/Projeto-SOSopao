import Alimento from "../Models/alimento.model.js";

function findAll(request, response) {
  Alimento
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findById(request, response) {
  Alimento
    .findByPk(request.params.id_alimento)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "Alimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
  Alimento
    .create({
      marca: request.body.marca,
      data: request.body.data,
      validade: request.body.validade,
      quantidade: request.body.quantidade,
      SuperalimentoNome: request.body.SuperalimentoNome // Note que isso pode mudar dependendo do nome da chave estrangeira no seu modelo
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  Alimento
    .destroy({ where: { id_alimento: request.params.id_alimento } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Alimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  Alimento
    .update(
      {
        marca: request.body.marca,
        data: request.body.data,
        validade: request.body.validade,
        quantidade: request.body.quantidade,
        SuperalimentoNome: request.body.SuperalimentoNome // Note que isso pode mudar dependendo do nome da chave estrangeira no seu modelo
      },
      { where: { id_alimento: request.params.id_alimento } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Alimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findById, create, deleteByPk, update };
