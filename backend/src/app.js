const express = require('express');
const cors = require('cors');

const authRoutes =
  require('./routes/auth');

const transactionRoutes =
  require('./routes/transactions');

const analyticsRoutes =
  require('./routes/analytics');

const budgetRoutes =
  require('./routes/budgets');

const goalRoutes =
  require('./routes/goals');

const subscriptionRoutes =
  require('./routes/subscriptions');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/transactions', transactionRoutes);

app.use('/analytics', analyticsRoutes);

app.use('/budgets', budgetRoutes);

app.use('/goals', goalRoutes);

app.use('/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {

  res.json({

    success: true,

    message:
      'AI Finance Super App Backend'

  });

});

module.exports = app;
