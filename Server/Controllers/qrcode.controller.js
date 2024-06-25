import QrCode from "../Models/qrcode.model.js";

function findAll(request, response) {
  QrCode
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findById(request, response) {
  QrCode
    .findByPk(request.params.id)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "QrCode não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
  QrCode
    .create({
      url_imagem: request.body.url_imagem,
      funcionalidade: request.body.funcionalidade || null, // Definindo como nulo se não for fornecido
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  QrCode
    .destroy({ where: { id_qr_code: request.params.id } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "QrCode não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  QrCode
    .update(
      {
        url_imagem: request.body.url_imagem,
        funcionalidade: request.body.funcionalidade || null, // Definindo como nulo se não for fornecido
      },
      { where: { id_qr_code: request.params.id } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "QrCode não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findById, create, deleteByPk, update };
