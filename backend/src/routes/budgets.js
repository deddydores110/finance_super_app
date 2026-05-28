const express = require('express');

const router = express.Router();

const budgets = [

  {

    id: 1,

    category: 'Food',

    limit: 1500000,

    used: 1200000,

    percentage: 80,

    prediction:
      'Kemungkinan overbudget 5 hari lagi'

  },

  {

    id: 2,

    category: 'Transportation',

    limit: 800000,

    used: 350000,

    percentage: 43,

    prediction:
      'Budget masih aman'

  }

];

router.get('/', async (req, res) => {

  res.json({

    success: true,
    budgets

  });

});

router.post('/', async (req, res) => {

  const budget = {

    id: Date.now(),

    ...req.body

  };

  budgets.push(budget);

  res.json({

    success: true,
    budget

  });

});

module.exports = router;
