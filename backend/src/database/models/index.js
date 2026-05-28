const User = require('./User');
const Transaction = require('./Transaction');
const Budget = require('./Budget');
const Goal = require('./Goal');
const Subscription = require('./Subscription');

User.hasMany(Transaction, {
  foreignKey: 'user_id'
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = {
  User,
  Transaction,
  Budget,
  Goal,
  Subscription
};
