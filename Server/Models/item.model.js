import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Item extends Model {};

Item.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        nome: {type: DataTypes.STRING, allowNull:false, unique:true},
        descricao: {type: DataTypes.STRING, allowNull: true},
        quantidade: {type: DataTypes.INTEGER, allowNull: false}
    },
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela "Item" já não existe
(async () => {
    try {
        await Item.sync();
        console.log('Tabela Item verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Item:', error);
    }
})();

export default Item;
