import Usuario from "./Models/usuario.model.js";

await Usuario.sync();

Usuario.findAll().then(res => {
  for(let r of res) {
    console.log(r.dataValues);
  }
})