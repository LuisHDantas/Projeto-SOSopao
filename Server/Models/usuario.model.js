import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Usuario extends Model {};

Usuario.init(
    {
        id_usuario: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        nome: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        senha: {type: DataTypes.STRING, allowNull: false},
        ehSuperadmin: {type: DataTypes.BOOLEAN, allowNull: false}
    }, 
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela já não existe
(async () => {
    try {
        await Usuario.sync();
        console.log('Tabela Usuários verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Usuários:', error);
    }
})();

export default Usuario;
