import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Superalimento extends Model {};

Superalimento.init(
    {
        nome: {type: DataTypes.STRING, primaryKey:true},
        meta: {type: DataTypes.INTEGER, allowNull: false},
        quantidade: {type: DataTypes.INTEGER, allowNull: false},
        unidade_medida: {type: DataTypes.STRING, allowNull: false}
    },
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela Superalimentos já não existe
(async () => {
    try {
        await Superalimento.sync();
        console.log('Tabela Superalimentos verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Superalimentos:', error);
    }
})();

export default Superalimento;