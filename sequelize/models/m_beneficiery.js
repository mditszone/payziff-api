import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Beneficiary = sequelize.define('beneficiary', {
  beneId: {
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
    allowNull: true
  }
}, {
  // Other model options go here
});


export default Beneficiary;