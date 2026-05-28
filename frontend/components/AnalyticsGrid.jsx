'use client';

export default function AnalyticsGrid({

  income,
  expense,
  balance

}) {

  return (

    <div className=\"grid grid-cols-1 md:grid-cols-3 gap-5\">

      <div className=\"bg-cyan-500/10 rounded-3xl p-6\">

        <h2>Balance</h2>

        <p className=\"text-4xl font-black\">

          Rp {balance.toLocaleString()}

        </p>

      </div>

      <div className=\"bg-green-500/10 rounded-3xl p-6\">

        <h2>Income</h2>

        <p className=\"text-4xl font-black\">

          Rp {income.toLocaleString()}

        </p>

      </div>

      <div className=\"bg-red-500/10 rounded-3xl p-6\">

        <h2>Expense</h2>

        <p className=\"text-4xl font-black\">

          Rp {expense.toLocaleString()}

        </p>

      </div>

    </div>

  );

}
