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
        const [results, metadata] = await sequelize.query(`
            UPDATE "Superalimentos"
            SET quantidade = (
                SELECT COALESCE(SUM(quantidade), 0)
                FROM "Alimentos"
                WHERE "superalimentoID" = :superalimentoID
            )
            WHERE id = :superalimentoID;
        `, {
            replacements: { superalimentoID: instance.superalimentoID }
        });

    } catch (err) {
        console.error('Erro ao atualizar quantidade de Superalimento', err);
    }
};


const updateSuperQTDForBulkCreate = async (instances, transaction) => {
    try {
        const superalimentoIDs = [...new Set(instances.map(instance => instance.superalimentoID))];
        for (const superalimentoID of superalimentoIDs) {
            const total_qtd = await Alimento.sum('quantidade', { where: { superalimentoID }, transaction });
            await Superalimento.update({ quantidade: total_qtd }, { where: { id: superalimentoID }, transaction });
        }
    } catch (err) {
        console.error('Erro ao atualizar quantidade de Superalimento em bulk create:', err);
    }
};

Alimento.afterSave(async (instance) => {
    updateSuperQTD(instance); 
});


Alimento.afterUpdate(async (instance) => {
    updateSuperQTD(instance);
});

Alimento.afterDestroy(async (instance) => {
    updateSuperQTD(instance);
});



Alimento.afterBulkCreate(async (createdInstances, options) => {
    try {
        if (createdInstances.length === 0) {
            console.log('Nenhum Alimento criado na operação em massa.');
            return;
        }
        await updateSuperQTDForBulkCreate(createdInstances, options.transaction);
    } catch (err) {
        console.error('Erro ao atualizar quantidade de Superalimento ao criar Alimento:', err);
    }
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
