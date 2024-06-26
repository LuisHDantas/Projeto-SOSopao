import Usuario from "../Models/usuario.model.js";
import authController from "../Controllers/auth.controller.js";

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
      ehSuperadmin: false
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

async function getByToken(request, response){
    const result = await authController.decodeToken(request.params.token);
    Usuario
    .findByPk(result.sub)
    .then(res => {
      if (res) {
        response.status(200).send(res);
      } else {
        response.status(404).send("Usuário não encontrado");
      }
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

async function updateAdmin(request, response) {
  
  try {
      let storedToken = request.params.token;
      const responsePassword = await authController.testPassword(storedToken, request.body.senha);
      
    console.log(responsePassword);
      if (responsePassword == true){
          const decodedToken = await authController.decodeToken(storedToken);
      console.log(decodedToken);
          const id = decodedToken.sub;

          const hashedPassword = authController.hashSenha(request.body.novaSenha);

          const updatedUsuario = await Usuario.update(
          {
            nome: request.body.nome,
            email: request.body.email,
            senha: hashedPassword
          },
            { where: { id_usuario: id } }
          );

          if (updatedUsuario[0] > 0) {
            response.status(200).send({id});
          } else {
            response.status(404).send("Usuário não encontrado");
          }      
      } 
      else {
        console.error("Erro: senha incorreta", response.statusText);
        response.status(404).send("Senha incorreta");
      }
  } catch (err) {
      console.error("Erro ao alterar dados", err);
      response.status(500).send("Erro:", err);
  }

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

export default { findAll, findById, create, deleteByPk, update, findByEmail, validaSuperAdmin, updateAdmin, getByToken };
