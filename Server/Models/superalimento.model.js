import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Superalimento extends Model {};

Superalimento.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        nome: {type: DataTypes.STRING, allowNull:false, unique:true},
        meta: {type: DataTypes.INTEGER, allowNull: false},
        quantidade: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        unidade_medida: {type: DataTypes.STRING, allowNull: false},
        url_imagem: {type: DataTypes.STRING(2048), allowNull: true}
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
