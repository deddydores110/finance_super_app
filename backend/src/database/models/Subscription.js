const {
  DataTypes
} = require('sequelize');

const sequelize =
  require('../../config/database');

const Subscription =
  sequelize.define(
    'Subscription',
    {

      user_id: DataTypes.INTEGER,

      name: DataTypes.STRING,

      amount: DataTypes.BIGINT

    },
    {
      tableName: 'subscriptions',
      timestamps: false
    }
  );

module.exports = Subscription;
