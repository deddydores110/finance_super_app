const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {

  try {

    const analytics = {

      balance: 12500000,

      income: 18500000,

      expense: 6000000,

      savings_rate: 68,

      financial_score: 82,

      prediction_next_month: 4200000,

      top_category: 'Food & Dining',

      ai_summary:
        'Pengeluaran makanan meningkat 32% bulan ini.'

    };

    res.json({

      success: true,
      analytics

    });

  } catch (err) {

    res.status(500).json({

      success: false,
      message: err.message

    });

  }

});

module.exports = router;
