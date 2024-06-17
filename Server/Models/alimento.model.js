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
        superalimentoID: { 
            type: DataTypes.INTEGER,
            references: {
                model: Superalimento,
                key: 'id'
            },
            allowNull: false
        }
    },{
        hooks: {
            beforeBulkUpdate: async (options) => 
                (options.individualHooks = true),
            beforeBulkDestroy: async (options) =>
                (options.individualHooks = true),
        },
        sequelize, 
        timestamps: false 
    }
);

Superalimento.hasMany(Alimento, {
    foreignKey: 'superalimentoID',
    sourceKey: 'id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true
});

// Definindo as relações
Alimento.belongsTo(Superalimento, {
    foreignKey: 'superalimentoID',
    targetKey: 'id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true
});

const updateSuperQTD = async (instance) => {
    try {
        const total_qtd = await Alimento.sum('quantidade', { where: {superalimentoID: instance.superalimentoID} });
        await Superalimento.update({ quantidade: total_qtd }, { where: { id: instance.superalimentoID } });

    } catch (err) {
        console.error('Erro ao atualizar quantidade de Superalimento', err);
    }

}


Alimento.afterSave(async (instance) => {
    updateSuperQTD(instance); 
});


Alimento.afterUpdate(async (instance) => {
    updateSuperQTD(instance);
});

Alimento.afterDestroy(async (instance) => {
    updateSuperQTD(instance);
});

// Para futuramente inserir vários alimentos de uma vez
//Alimento.afterBulkCreate(async (createdInstances) => {
//  try {
//    await updateSuperalimentoQtd({ superalimentoID: { [Sequelize.Op.in]: createdInstances.map(instance => instance.superalimentoID) } }); // Construct a single update for all created instances
//  } catch (err) {
//    console.error('Erro ao atualizar quantidade de Superalimento ao criar Alimento:', err);
//  }
//});

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
