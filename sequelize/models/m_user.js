import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import Role from '../models/m_role';


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Other model options go here
});

User.belongsTo(Role, {
    foreignKey: "roleId",
    allowNull: false
});

export default User;