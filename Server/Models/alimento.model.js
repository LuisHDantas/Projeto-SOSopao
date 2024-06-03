import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";
import Superalimento from "./superalimento.model.js";

class Alimento extends Model {};

Alimento.init(
    {
        id_alimento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        marca: { type: DataTypes.STRING, allowNull: false },
        data: { type: DataTypes.DATEONLY, allowNull: false },
        validade: { type: DataTypes.DATEONLY, allowNull: false },
        quantidade: { type: DataTypes.INTEGER, allowNull: false },
        superalimentoNome: { 
            type: DataTypes.STRING,
            references: {
                model: Superalimento,
                key: 'nome'
            },
            allowNull: false
        }
    },
    { sequelize, timestamps: false }
);

// Definindo as relações
Alimento.belongsTo(Superalimento, {
    foreignKey: 'superalimentoNome',
    targetKey: 'nome',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Superalimento.hasMany(Alimento, {
    foreignKey: 'superalimentoNome',
    sourceKey: 'nome',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// Verifica se a tabela Alimentos já não existe
(async () => {
    try {
        await Alimento.sync();
        console.log('Tabela Alimentos verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Alimentos:', error);
    }
})();

// Deletando a tabela Alimento
// (async () => {
//     try {
//         await Alimento.drop();
//         console.log('Tabela Alimento deletada com sucesso.');
//     } catch (error) {
//         console.error('Erro ao deletar a tabela Alimento:', error);
//     }
// })();

export default Alimento;