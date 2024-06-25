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

async function findByEmail(userEmail){
  const user = await Usuario.findOne({
      where: { email: userEmail },
  });

  return user;
}

function create(nome, email, senha, superadmin, response, getToken) {
    Usuario.create({
      nome: nome,
      email: email,
      senha: senha,
      ehSuperadmin: superadmin
    })
    .then((result) => {
        
        // criar e devolver o token
        const meuToken = getToken(
            result.dataValues.id_usuario,
            result.dataValues.email,
        );
        response.status(201).send({ token: meuToken });
    })
    .catch((erro) => {
        response.status(500).json(erro);
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

async function validaSuperAdmin(id) {
  const autorizado = await Usuario.findByPk(id);

  if (autorizado) {
    return autorizado.dataValues.ehSuperadmin;
  } else {
    return false;
  }
}

export default { findAll, findById, create, deleteByPk, update, findByEmail, validaSuperAdmin };
