import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Voluntario extends Model {};

Voluntario.init(
    {
        nome: {type: DataTypes.STRING, primaryKey:true},
        email: {type: DataTypes.STRING, primaryKey:true},
        telefone: {type: DataTypes.STRING, allowNull: true}
    },
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela "Voluntario" já não existe
(async () => {
    try {
        await Voluntario.sync();
        console.log('Tabela Voluntario verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Voluntario:', error);
    }
})();

export default Voluntario;