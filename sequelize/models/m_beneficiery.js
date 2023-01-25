import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const Beneficiary = sequelize.define('Beneficiary', {
  beneId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});


export default Beneficiary;