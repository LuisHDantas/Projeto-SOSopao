import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import usuarioController from "./usuario.controller.js";

const secret = process.env["AUTH_SECRET"];

async function register(request, response) {
    // valores vazios
    if (!request.body.senha || !request.body.email || !request.body.nome) {
        return response.status(400).send("Informe nome, email e senha!");
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(request.body.email)){
        return response.status(400).send("Informe um email valido!");
    }

    // já existe cadastro no bd
    const user = await usuarioController.findByEmail(request.body.email);
    if (user) {
        return response.status(400).send("Usuário já cadastrado!");
    }
    // hashing da senha
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(request.body.senha, salt);
    
    //cadastra usuario
    const nome = request.body.nome;
    const email = request.body.email;
    usuarioController.create(nome, email, hashedPassword, false, response, getToken);
}


function getToken(id_usuario, email) {    
    const meuToken = jwt.sign(
        {
            sub: id_usuario,
            email: email,
        },
        secret,
        {
            expiresIn: "1d",
        },
    );
    return meuToken;
}

async function login(request, response) {
    // valores vazios
    if (!request.body.senha || !request.body.email) {
        return response.status(400).send("Informe usuário e senha!");
    }

    // não existe
    const user = await usuarioController.findByEmail(request.body.email);
    if (!user) {
        return response.status(400).send("Usuário não cadastrado!");
    }

    // compara senha
    const isEqual = bcrypt.compareSync(request.body.senha, user.senha);
    // inválida
    if (!isEqual) {
        return response.status(401).send("Usuário e senha inválidos!");
    }
    // usuário e senha válidos, cria token
    const meuToken = getToken(user.id_usuario, user.email);
    response
        .status(200)
        .json({ id: user.id_usuario, email: user.email, token: meuToken });
}

async function validateToken(request, response, next) {
    let token = request.headers.authorization;
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length);
            const decodedToken = jwt.verify(token, secret);
            next();
        } else {
            return response.status(401).send({ message: "Unauthorized" });
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" });
    }
}

async function validateSuperToken(request, response, next){
    let token = request.headers.authorization;

    try{
        if (token && token.startsWith("Bearer")) {

            token = token.substring(7, token.length);
            const decodedToken = jwt.verify(token, secret);
            
            const autorizado = await usuarioController.validaSuperAdmin(decodedToken.sub);
            
            if (autorizado) { 
                next();
            }else{
                return response.status(401).send({ message: "Unauthorized" });
            }
        } else {
            return response.status(401).send({ message: "Unauthorized" });
        }

    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" });
    }
}



async function validateExpireToken(request, response) {
    let token = request.params.token;
    try {
        if ((typeof token === 'string') && token.trim().length > 0) {
            const decodedToken = jwt.verify(token, secret);
            
            if(decodedToken){
                return response.status(200).send({ valid: true });
            }
        }
    } catch (e) {
        console.log(e.message);
        //Se tiver erro, apenas desloga o usuario. Não estou fazendo outro tratamento
        return response.status(200).send({ valid: false });
    }

    return response.status(200).send({ valid: false });
}

export default { register, login, validateToken, validateSuperToken, validateExpireToken }
