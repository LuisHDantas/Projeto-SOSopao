import { Model, DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

class Usuario extends Model {};

Usuario.init({
    id_usuario: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    nome: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    senha: {type: DataTypes.STRING, allowNull: false},
}, {sequelize: sequelize, timestamps: false });

export default Usuario;