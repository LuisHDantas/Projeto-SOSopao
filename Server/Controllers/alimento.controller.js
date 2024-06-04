import Alimento from "../Models/alimento.model.js";
import Superalimento from "../Models/superalimento.model.js";

function findAll(request, response) {
  Alimento
    .findAll({
      include: {
        model: Superalimento,
        attributes: ['nome'],  // Inclua apenas os atributos necessários
      }
    })
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findById(request, response) {
  Alimento
    .findByPk(request.params.id, {
      include: {
        model: Superalimento,
        attributes: ['nome'],  // Inclua apenas os atributos necessários
      }
    })
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

async function create(request, response) {
  try {
    const superalimento = await Superalimento.findByPk(request.body.superalimentoNome);
    if (!superalimento) {
      return response.status(400).json({ error: "Superalimento não encontrado" });
    }
    const alimento = await Alimento.create({
      marca: request.body.marca,
      data: request.body.data,
      validade: request.body.validade,
      quantidade: request.body.quantidade,
      superalimentoNome: request.body.superalimentoNome,
    });
    response.status(201).json(alimento);
  } catch (err) {
    response.status(500).json(err);
  }
}

async function deleteByPk(request, response) {
  try {
    const res = await Alimento.destroy({ where: { id_alimento: request.params.id } });
    if (res) {
      response.status(200).send();
    } else {
      response.status(404).json({ error: "Alimento não encontrado" });
    }
  } catch (err) {
    response.status(500).json(err);
  }
}

async function update(request, response) {
  try {
    const superalimento = await Superalimento.findByPk(request.body.superalimentoNome);
    if (!superalimento) {
      return response.status(400).json({ error: "Superalimento não encontrado" });
    }
    const [updated] = await Alimento.update(
      {
        marca: request.body.marca,
        data: request.body.data,
        validade: request.body.validade,
        quantidade: request.body.quantidade,
        superalimentoNome: request.body.superalimentoNome,
      },
      { where: { id_alimento: request.params.id } }
    );
    if (updated) {
      response.status(200).send();
    } else {
      response.status(404).json({ error: "Alimento não encontrado" });
    }
  } catch (err) {
    response.status(500).json(err);
  }
}

export default { findAll, findById, create, deleteByPk, update };