import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class QrCode extends Model {};

QrCode.init(
    {
        id_qr_code: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        url_imagem: {type: DataTypes.STRING, allowNull: false},
    },
    {sequelize: sequelize, timestamps: false }
);

// Verifica se a tabela "QrCode" já não existe
(async () => {
    try {
        await QrCode.sync();
        console.log('Tabela QrCode verificada.');
    } catch (error) {
        console.error('Erro ao verificar a tabela QrCode:', error);
    }
})();

export default QrCode;
