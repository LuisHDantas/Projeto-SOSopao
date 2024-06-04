import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class PontoParada extends Model {};

PontoParada.init(
    {
        posicao: {type: DataTypes.INTEGER, autoIncrement:false, primaryKey:true},
        cep: {type: DataTypes.STRING, allowNull: false},
        rua: {type: DataTypes.STRING, allowNull: false},
        numero: {type: DataTypes.INTEGER, allowNull: false},
        cidade: {type: DataTypes.STRING, allowNull: false}
    },
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela "PontoParada" já não existe
(async () => {
    try {
        await PontoParada.sync();
        console.log('Tabela PontoParada verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela PontoParada:', error);
    }
})();

export default PontoParada;