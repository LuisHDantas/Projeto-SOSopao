import Usuario from "../Models/usuario.model.js";

function findAll(request, response) {
  Usuario
    .findAll()
    .then(res => {
      response.status(200).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function findById(request, response) {
  Usuario
    .findByPk(request.params.id)
    .then(res => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).json({ error: "Usuário não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function create(request, response) {
    console.log(request.body);
  Usuario
    .create({
      nome: request.body.nome,
      email: request.body.email,
      senha: request.body.senha,
    })
    .then(res => {
      response.status(201).json(res);
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function deleteByPk(request, response) {
  Usuario
    .destroy({ where: { id_usuario: request.params.id } })
    .then(res => {
      if (res) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Usuário não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

function update(request, response) {
  Usuario
    .update(
      {
        nome: request.body.nome,
        email: request.body.email,
        senha: request.body.senha,
      },
      { where: { id_usuario: request.params.id } }
    )
    .then(res => {
      if (res[0] > 0) {
        response.status(200).send();
      } else {
        response.status(404).json({ error: "Usuário não encontrado" });
      }
    })
    .catch(err => {
      response.status(500).json(err);
    });
}

export default { findAll, findById, create, deleteByPk, update };
