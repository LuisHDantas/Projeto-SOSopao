import PontoParada from "../Models/pontoParada.model.js";
import sequelize from '../dbconfig.js';

function findAll(request, response) {
  PontoParada
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findByPosicao(request, response) {
  PontoParada
    .findByPk(request.params.posicao)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "Ponto de parada não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
  PontoParada
    .create({
      posicao: request.body.posicao,
      descricao: request.body.descricao
    })
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}



async function deleteByPk(request, response) {
  const posicao = request.params.posicao;

  try {
    await sequelize.transaction(async (t) => {
      console.log(posicao);
      const instanceToDelete = await PontoParada.findByPk(posicao, { transaction: t });
      if (!instanceToDelete) {
        throw new Error("Ponto de parada não encontrado");
      }

      await PontoParada.destroy({
        where: { posicao: posicao },
        transaction: t,
      });

      await shiftPositions(posicao, t);
    });

    response.status(200).send();
  } catch (err) {
    response.status(500).json({ error: "Erro ao deletar ponto de parada", details: err.message });
  }
}



function update(request, response) {
  PontoParada
    .update(
      {
        posicao: request.body.posicao,
        descricao: request.body.descricao
      },
      { where: { posicao: request.params.posicao } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Ponto de parada não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}



async function shiftPositions(posicao, t) {
  const tableName = PontoParada.getTableName();
  const sqlQuery = `
    UPDATE "PontoParadas" 
    SET posicao = posicao - 1 
    WHERE posicao > :posicao;
  `;

  await sequelize.query(sqlQuery, {
    replacements: { posicao: posicao },
    transaction: t, 
  });
}



export default { findAll, findByPosicao, create, deleteByPk, update };
