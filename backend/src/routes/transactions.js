const express =
  require('express');

const router =
  express.Router();

const {
  Transaction
} = require(
  '../database/models/Transaction'
);

// =========================
// GET ALL TRANSACTIONS
// =========================

router.get(
  '/',
  async (req, res) => {

    try {

      const transactions =
        await Transaction.findAll({

          order: [
            ['createdAt', 'DESC']
          ]

        });

      return res.json({

        success: true,
        transactions

      });

    } catch (err) {

      return res.status(500).json({

        success: false,
        message: err.message

      });

    }

  }
);

// =========================
// CREATE TRANSACTION
// =========================

router.post(
  '/',
  async (req, res) => {

    try {

      const transaction =
        await Transaction.create(
          req.body
        );

      return res.json({

        success: true,
        transaction

      });

    } catch (err) {

      return res.status(500).json({

        success: false,
        message: err.message

      });

    }

  }
);

module.exports =
  router;