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
  let linkImagem;
  if(!request.file) { linkImagem = request.file; }
  else { linkImagem = upload.getFileUrl(request.file.key) }

  QrCode
    .create({
      url_imagem: linkImagem,
      funcionalidade: request.body.funcionalidade || null, // Definindo como nulo se não for fornecido
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

async function deleteByPk(request, response) {
  // deleta a imagem armazenada no minio na url da tupla
  await QrCode
    .findByPk(request.params.id)
    .then(res => {
      if (res) {
        if(res.url_imagem) { upload.deleteFile(res.url_imagem); }
      } else {
        response.status(404).json({ error: "QR Code não encontrado" });
      }
    })

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

async function update(request, response) {
  // testa se a imagem foi atualizada e deleta a imagem antiga caso sim
  let linkImagem;
  if(!request.file) { 
    linkImagem = request.file; 
  } 
  else { 
    linkImagem = upload.getFileUrl(request.file.key) 

    await QrCode
    .findByPk(request.params.id)
    .then(res => {
      if (res) {
        if(res.url_imagem) { upload.deleteFile(res.url_imagem); }
      } else {
        response.status(404).json({ error: "QR Code não encontrado" });
      }
    })
  }

  QrCode
    .update(
      {
        url_imagem: linkImagem,
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
