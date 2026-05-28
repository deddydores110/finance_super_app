const {
  DataTypes
} = require('sequelize');

const sequelize =
  require('../../config/database');

const Transaction =
  sequelize.define(
    'Transaction',
    {

      user_id: DataTypes.INTEGER,

      description: DataTypes.TEXT,

      amount: DataTypes.BIGINT,

      type: DataTypes.STRING,

      category: DataTypes.STRING,

      sub_category: DataTypes.STRING,

      source: DataTypes.STRING,

      transaction_date: DataTypes.DATE

    },
    {
      tableName: 'transactions',
      timestamps: false
    }
  );

module.exports = Transaction;
