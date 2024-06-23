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

function findByID(request, response) {
  Superalimento
    .findByPk(request.params.id)
    .then(superalimento => {
      if(superalimento){
        response.status(200).json(superalimento);
      } else {
        response.status(404).json({ error: "Superalimento não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findByNome(request, response) {
  const nome = request.params.nome;

  Superalimento
    .findOne({
      where: { nome: nome }
    })
    .then(superalimento => {
      if (superalimento) {
        response.status(200).json(superalimento);
      } else {
        response.status(404).json({ error: "Superalimento não encontrado" });
      }
    })
    .catch(err => {
      console.error('Erro ao buscar superalimento:', err);
      response.status(500).json({ error: "Erro ao buscar superalimento" });
    });
}

function create(request, response) {
  let linkImagem;
  if(!request.file) { linkImagem = null; }
  else { linkImagem = upload.getFileUrl(request.file.key) }

  Superalimento
    .create({
      nome: request.body.nome,
      meta: request.body.meta,
      unidade_medida: request.body.unidade_medida,
      url_imagem: linkImagem
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

async function deleteByPk(request, response) {
  // TODO deleta imagem do link
  
  try {
    const superalimentoDeleted = await Superalimento.destroy({ where: { id: request.params.id } });
    if (!superalimentoDeleted) {
      return response.status(404).json({ error: "Superalimento não encontrado" });
    }
    response.status(200).send();
  } catch (err) {
    response.status(500).json(err);
  }
}

async function deleteByNome(request, response) {
  // TODO deleta imagem do link

  try {
    const superalimentoDeleted = await Superalimento.destroy({
      where: {
        nome: request.params.nome
      }
    });
  
    if(!superalimentoDeleted) {
      return response.status(404).json({ error: "Superalimento não encontrado" });
    }

    response.status(200).send();
  } catch (err) {
    response.status(500).json(err);
  }
}

function updateByNome(request, response) {
  // TODO deleta imagem antiga

  let linkImagem;
  if(!request.file) { linkImagem = null; }
  else { linkImagem = upload.getFileUrl(request.file.key) }

  Superalimento
    .update(
      {
        nome: request.body.nome,
        meta: request.body.meta,
        unidade_medida: request.body.unidade_medida,
        url_imagem: upload.getFileUrl(request.file.key)
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

function updateByID(request, response) {
  // TODO deleta imagem velha

  let linkImagem;
  if(!request.file) { linkImagem = null; }
  else { linkImagem = upload.getFileUrl(request.file.key) }

  Superalimento
    .update(
      {
        nome: request.body.nome,
        meta: request.body.meta,
        unidade_medida: request.body.unidade_medida,
        url_imagem: linkImagem
      },
      { where: { id: request.params.id } }
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

function getAlimentosByID(request, response) {
  const superid = request.params.id;

  Alimento.findAll({ where: { superalimentoID: superid } })
    .then(alimentos => {
      if (alimentos.length > 0) {
        response.status(200).json(alimentos);
      } else {
        response.status(404).json({ message: 'No alimentos found for this superalimento ID' });
      }
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
}

export default { findAll, findByID, findByNome, create, deleteByPk, deleteByNome, updateByNome, updateByID, getAlimentosByID };
