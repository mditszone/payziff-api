import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import User from './m_user';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  createdAt: false,
  updatedAt: false
});




export default Role;