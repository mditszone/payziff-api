import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import Customer from './m_customer';

const Transactions = sequelize.define('Transactions', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cfOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  entity: {
    type: DataTypes.STRING,
    allowNull: true
  },
  orderCurrency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  orderAmount: {
    type: DataTypes.DOUBLE,
  },
  orderStatus: {
    type: DataTypes.STRING
  },
  orderNote: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});



export default Transactions;