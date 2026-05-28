const express =
  require('express');

const router =
  express.Router();

const {
  User,
  Transaction
} = require('../database/models');

// =========================
// DASHBOARD TOKEN
// =========================

router.get(
  '/dashboard/:token',

  async (req, res) => {

    try {

      const {
        token
      } = req.params;

      // =========================
      // FIND USER
      // =========================

      const user =
        await User.findOne({

          where: {
            dashboard_token: token
          }

        });

      // =========================
      // USER NOT FOUND
      // =========================

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            'Dashboard token invalid'

        });

      }

      // =========================
      // GET TRANSACTIONS
      // =========================

      const transactions =
        await Transaction.findAll({

          where: {
            user_id: user.id
          },

          order: [
            ['created_at', 'DESC']
          ]

        });

      // =========================
      // SUCCESS
      // =========================

      return res.json({

        success: true,

        user,

        transactions

      });

    } catch (err) {

      console.log(
        'DASHBOARD ERROR:',
        err
      );

      return res.status(500).json({

        success: false,

        message:
          'Internal server error'

      });

    }

  }

);

module.exports =
  router;