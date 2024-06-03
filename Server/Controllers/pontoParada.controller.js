import PontoParada from "../Models/pontoParada.model.js";

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
      cep: request.body.cep,
      rua: request.body.rua,
      numero: request.body.numero,
      cidade: request.body.cidade,
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  PontoParada
    .destroy({ where: { posicao: request.params.posicao } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Ponto de parada não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  PontoParada
    .update(
      {
        cep: request.body.cep,
        rua: request.body.rua,
        numero: request.body.numero,
        cidade: request.body.cidade,
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

export default { findAll, findByPosicao, create, deleteByPk, update };
