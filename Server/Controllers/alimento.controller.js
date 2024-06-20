import Alimento from "../Models/alimento.model.js";
import Superalimento from "../Models/superalimento.model.js";
import sequelize from '../dbconfig.js';

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
    const superalimento = await Superalimento.findByPk(request.body.superalimentoID);
    if (!superalimento) {
      return response.status(400).json({ error: "Superalimento não encontrado" });
    }
    const alimento = await Alimento.create({
      marca: request.body.marca,
      data: request.body.data,
      validade: request.body.validade,
      quantidade: request.body.quantidade,
      superalimentoID: request.body.superalimentoID,
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
    const superalimento = await Superalimento.findByPk(request.body.superalimentoID);
    if (!superalimento) {
      return response.status(400).json({ error: "Superalimento não encontrado" });
    }
    const [updated] = await Alimento.update(
      {
        marca: request.body.marca,
        data: request.body.data,
        validade: request.body.validade,
        quantidade: request.body.quantidade,
        superalimentoID: request.body.superalimentoiD,
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

export async function createMultiple(request, response) {
  const {
    marca,
    data,
    validade,
    quantidade,
    superalimentoID,
    multiplicador
  } = request.body;

  if (!marca || !quantidade || !superalimentoID || !multiplicador) {
    return response.status(400).json({ error: "Input inválido. Insira nome, quantidade, superalimentoID, e multiplicador." });
  }

  const alimentos = [];
  for (let i = 0; i < multiplicador; i++) {
    alimentos.push({ marca, data, validade, quantidade, superalimentoID });
  }

  try {
    const createdInstances = await sequelize.transaction(async (transaction) => {
      const result = await Alimento.bulkCreate(alimentos, { transaction, returning: true });
      return result;
    });

    if (!createdInstances || createdInstances.length === 0) {
      return response.status(500).json({ error: "Failed to create Alimentos." });
    }

    response.status(200).json(createdInstances);
  } catch (err) {
    console.error("Erro ao criar múltiplos alimentos", err);
    response.status(500).json(err);
  }
}

  export default { findAll, findById, create, deleteByPk, update, createMultiple };
