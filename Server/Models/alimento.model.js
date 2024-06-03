import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";
import Superalimento from "./superalimento.model.js";

class Alimento extends Model {};

Alimento.init(
    {
        id_alimento: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        marca: {type: DataTypes.STRING, allowNull: false},
        data: {type: DataTypes.DATEONLY, allowNull: false},
        validade: {type: DataTypes.DATEONLY, allowNull: false},
        quantidade: {type: DataTypes.INTEGER, allowNull: false}
    },
    {sequelize: sequelize, timestamps: false}
);

Alimento.belongsTo(Superalimento);
Superalimento.hasMany(Alimento);

// Verifica se a tabela Alimentos já não existe
(async () => {
    try {
        await Alimento.sync();
        console.log('Tabela Alimentos verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Alimentos:', error);
    }
})();

export default Alimento;