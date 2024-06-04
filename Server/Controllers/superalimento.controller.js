import Alimento from "../Models/alimento.model.js";
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

async function deleteByPk(request, response) {
  try {
    // Primeiro, tenta deletar os alimentos que pertencem a esse superalimento
    // obs: 'onDelete: cascade' não funciona nesta versão de sequelize
    await Alimento.destroy({ where: { superalimentoNome: request.params.nome } });
    const superalimentoDeleted = await Superalimento.destroy({ where: { nome: request.params.nome } });
    if (!superalimentoDeleted) {
      return response.status(404).json({ error: "Superalimento não encontrado" });
    }
    response.status(200).send();
  } catch (err) {
    response.status(500).json(err);
  }
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
