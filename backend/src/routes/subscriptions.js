const express = require('express');

const router = express.Router();

const subscriptions = [

  {

    id: 1,

    name: 'Netflix',

    amount: 186000,

    active: true

  },

  {

    id: 2,

    name: 'Spotify',

    amount: 55000,

    active: true

  },

  {

    id: 3,

    name: 'ChatGPT',

    amount: 300000,

    active: true

  },

  {

    id: 4,

    name: 'VPS',

    amount: 250000,

    active: true

  }

];

router.get('/', async (req, res) => {

  res.json({

    success: true,
    subscriptions

  });

});

module.exports = router;
