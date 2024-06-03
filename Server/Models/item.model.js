import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Item extends Model {};

Item.init(
    {
        nome: {type: DataTypes.STRING, primaryKey:true},
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