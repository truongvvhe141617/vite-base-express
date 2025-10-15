import { DataTypes } from  'sequelize';
import { sequelize } from ("../../../shared/database/connection");

const UserModel = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  passwordHash: { type: DataTypes.STRING },
  refreshToken: { type: DataTypes.STRING },
}, {
  tableName: "Users",
  timestamps: false,
});

module.exports = UserModel;
