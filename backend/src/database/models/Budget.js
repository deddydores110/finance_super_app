const {
  DataTypes
} = require('sequelize');

const sequelize =
  require('../../config/database');

const Budget =
  sequelize.define(
    'Budget',
    {

      user_id: DataTypes.INTEGER,

      category: DataTypes.STRING,

      amount: DataTypes.BIGINT

    },
    {
      tableName: 'budgets',
      timestamps: false
    }
  );

module.exports = Budget;
