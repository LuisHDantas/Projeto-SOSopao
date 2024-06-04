import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Evento extends Model {};

Evento.init(
    {
        id_evento: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        nome: {type: DataTypes.STRING, allowNull: false},
        data: {type: DataTypes.DATEONLY, allowNull: false},
        descricao: {type: DataTypes.STRING, allowNull: true},
        url_imagem: {type: DataTypes.STRING, allowNull: true}
    },
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela Eventos já não existe
(async () => {
    try {
        await Evento.sync();
        console.log('Tabela Eventos verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela Eventos:', error);
    }
})();

export default Evento;