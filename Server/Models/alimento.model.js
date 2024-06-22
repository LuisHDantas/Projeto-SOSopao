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


const updateSuperQTD = async (instances, transaction) => {
    try {
        // Determine if instances is an array or a single instance
        const isBulkUpdate = Array.isArray(instances);

        // Extract superalimentoIDs based on whether it's a bulk update or not
        const superalimentoIDs = isBulkUpdate ? [...new Set(instances.map(instance => instance.superalimentoID))] : [instances.superalimentoID];

        // Build the update query
        const updateQuery = `
            UPDATE "Superalimentos" AS s
            SET quantidade = (
                SELECT COALESCE(SUM(quantidade), 0)
                FROM "Alimentos"
                WHERE "superalimentoID" = s.id
            )
            WHERE s.id IN (:superalimentoIDs);
        `;

        // Execute the update query
        await sequelize.query(updateQuery, {
            replacements: { superalimentoIDs },
            transaction
        });

    } catch (err) {
        console.error('Erro ao atualizar quantidade de Superalimento:', err);
        throw err; // Re-throw the error to handle it further up the call stack
    }
};

const updateSuperValidade = async (instances, transaction) => {
    try {
        const isBulkUpdate = Array.isArray(instances);

        
        const superalimentoIDs = isBulkUpdate ? [...new Set(instances.map(instance => instance.superalimentoID))] : [instances.superalimentoID];

        const updateQuery = `
            UPDATE "Superalimentos" AS s
            SET menor_validade = (
                SELECT MIN(validade)
                FROM "Alimentos"
                WHERE "superalimentoID" = s.id
            )
            WHERE s.id in (:superalimentoIDs);
        `;

        await sequelize.query(updateQuery, {
            replacements: { superalimentoIDs },
            transaction
        });

    } catch (err) {
        console.error('Erro ao atualizar validade do Superalimento', err);
        throw err;
    }
}


Alimento.afterSave(async (instance) => {
    const transaction = await sequelize.transaction();
    try {
        await Promise.all([
            updateSuperQTD(instance, transaction),
            updateSuperValidade(instance, transaction)
        ]);
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        console.error('Erro ao executar operações de atualização em Alimento:', err);
    }
});

Alimento.afterUpdate(async (instance) => {
    const transaction = await sequelize.transaction();
    try {
        await Promise.all([
            updateSuperQTD(instance, transaction),
            updateSuperValidade(instance, transaction)
        ]);
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        console.error('Erro ao executar operações de atualização em Alimento:', err);
    }
});

Alimento.afterDestroy(async (instance) => {
    const transaction = await sequelize.transaction();
    try {
        await Promise.all([
            updateSuperQTD(instance, transaction),
            updateSuperValidade(instance, transaction)
        ]);
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        console.error('Erro ao executar operações de exclusão em Alimento:', err);
    }
});


Alimento.afterBulkCreate(async (createdInstances, options) => {
    const transaction = options.transaction;
    try {
        if (createdInstances.length === 0) {
            console.log('Nenhum Alimento criado na operação em massa.');
            return;
        }
        await Promise.all([
            updateSuperValidade(createdInstances, transaction),
            updateSuperQTD(createdInstances, transaction),

        ]);
    } catch (err) {
        console.error('Erro ao executar operações de atualização em massa em Alimento:', err);
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
