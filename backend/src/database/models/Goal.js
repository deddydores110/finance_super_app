const {
  DataTypes
} = require('sequelize');

const sequelize =
  require('../../config/database');

const Goal =
  sequelize.define(
    'Goal',
    {

      user_id: DataTypes.INTEGER,

      title: DataTypes.STRING,

      target_amount: DataTypes.BIGINT,

      current_amount: DataTypes.BIGINT

    },
    {
      tableName: 'goals',
      timestamps: false
    }
  );

module.exports = Goal;
