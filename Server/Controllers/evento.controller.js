import Evento from "../Models/evento.model.js";
import upload from "../upload/upload.js";

function findAll(request, response) {
  Evento
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findById(request, response) {
  Evento
    .findByPk(request.params.id)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "Evento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
  let linkImagem;
  if(!request.file) { linkImagem = null; }
  else { linkImagem = upload.getFileUrl(request.file.key) }

  Evento
    .create({
      nome: request.body.nome,
      data: request.body.data,
      descricao: request.body.descricao,
      url_imagem: linkImagem,
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  // TODO deleta imagem do link
  
  Evento
    .destroy({ where: { id_evento: request.params.id } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Evento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  // TODO deleta imagem velha

  let linkImagem;
  if(!request.file) { linkImagem = null; }
  else { linkImagem = upload.getFileUrl(request.file.key) }
  
  Evento
    .update(
      {
        nome: request.body.nome,
        data: request.body.data,
        descricao: request.body.descricao,
        url_imagem: linkImagem,
      },
      { where: { id_evento: request.params.id } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Evento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findById, create, deleteByPk, update };
