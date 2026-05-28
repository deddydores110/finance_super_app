const express = require('express');

const router = express.Router();

const goals = [

  {

    id: 1,

    title: 'Mac Mini M4',

    target: 15000000,

    current: 8500000,

    percentage: 56,

    eta: '4 bulan lagi'

  },

  {

    id: 2,

    title: 'Emergency Fund',

    target: 50000000,

    current: 12000000,

    percentage: 24,

    eta: '10 bulan lagi'

  }

];

router.get('/', async (req, res) => {

  res.json({

    success: true,
    goals

  });

});

router.post('/', async (req, res) => {

  const goal = {

    id: Date.now(),

    ...req.body

  };

  goals.push(goal);

  res.json({

    success: true,
    goal

  });

});

module.exports = router;
