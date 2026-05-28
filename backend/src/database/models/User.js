const {
  DataTypes
} = require('sequelize');

const sequelize =
  require('../../config/database');

const User =
  sequelize.define(
    'User',
    {

      full_name: DataTypes.STRING,

      phone_number: DataTypes.STRING,

      whatsapp_jid: DataTypes.STRING,

      dashboard_token: DataTypes.TEXT,

      otp_code: DataTypes.STRING,

      otp_expired: DataTypes.DATE,

      ai_score: {
        type: DataTypes.INTEGER,
        defaultValue: 82
      },

      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }

    },
    {
      tableName: 'users',
      timestamps: false
    }
  );

module.exports = User;
