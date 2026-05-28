'use client';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

import { useParams } from 'next/navigation';

import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  Brain,
  Bell,
  PiggyBank,
  ArrowUpRight,
  Crown,
  Activity,
  Coffee,
  ShoppingBag,
  Utensils,
  BadgeDollarSign,
  Settings,
  BarChart3,
  Receipt,
  Goal,
  Bot,
  PieChart as PieChartIcon
} from 'lucide-react';


export default function UserDashboard() {

  const params =
    useParams();

  const token =
    params?.token;

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  const [transactions, setTransactions] =
    useState([]);

  const [activeMenu, setActiveMenu] =
    useState('Dashboard');

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    if (token) {

      loadDashboard();

    }

  }, [token]);

  async function loadDashboard() {

    try {

      const res =
        await axios.get(
          `http://localhost:3005/auth/dashboard/${token}`
        );

      if (
        res.data &&
        res.data.success
      ) {

        setUser(
          res.data.user
        );

        setTransactions(
          res.data.transactions || []
        );

      }

    } catch (err) {

      console.log(
        'DASHBOARD ERROR:',
        err
      );

    } finally {

      setLoading(false);

    }

  }

  // =========================
// CALCULATIONS
// =========================

const income =
  transactions
    .filter(
      trx =>
        trx.type === 'income'
    )
    .reduce(
      (a, b) =>
        a + Number(b.amount),
      0
    );

const expense =
  transactions
    .filter(
      trx =>
        trx.type === 'expense'
    )
    .reduce(
      (a, b) =>
        a + Number(b.amount),
      0
    );

const balance =
  income - expense;

const savingsRate =
  income > 0
    ? Math.round(
        (
          (income - expense)
          / income
        ) * 100
      )
    : 0;

// =========================
// TOP CATEGORY
// =========================

const topCategory =
  useMemo(() => {

    const map = {};

    transactions.forEach(trx => {

      const category =
        trx.category || 'General';

      if (!map[category]) {

        map[category] = 0;

      }

      map[category] +=
        Number(trx.amount);

    });

    let winner = '-';
    let max = 0;

    for (
      const [cat, amount]
      of Object.entries(map)
    ) {

      if (amount > max) {

        max = amount;
        winner = cat;

      }

    }

    return winner;

  }, [transactions]);

// =========================
// PIE CHART DATA
// =========================

const financePieData = [

  {
    name: 'Income',
    value: income
  },

  {
    name: 'Expense',
    value: expense
  }

];

const categoryPieData =
  useMemo(() => {

    return Object.entries(

      transactions.reduce(
        (acc, trx) => {

          const category =
            trx.category || 'General';

          if (!acc[category]) {

            acc[category] = 0;

          }

          acc[category] +=
            Number(trx.amount);

          return acc;

        },
        {}
      )

    ).map(([name, value]) => ({

      name,
      value

    }));

  }, [transactions]);

const pieColors = [

  '#06b6d4',
  '#22c55e',
  '#ef4444',
  '#8b5cf6',
  '#f59e0b',
  '#ec4899',
  '#14b8a6',
  '#3b82f6'

];

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-20 h-20 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto mb-5" />

          <h1 className="text-3xl font-black">
            Loading AI Dashboard...
          </h1>

        </div>

      </div>

    );

  }

  // =========================
  // USER NOT FOUND
  // =========================

  if (!user) {

    return (

      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">

        Dashboard not found

      </div>

    );

  }

  // =========================
  // MENU ITEMS
  // =========================

  const menuItems = [

    {
      name: 'Dashboard',
      icon: <Wallet size={20} />
    },

    {
      name: 'Transactions',
      icon: <Receipt size={20} />
    },

    {
      name: 'Analytics',
      icon: <BarChart3 size={20} />
    },

    {
      name: 'Budgets',
      icon: <PiggyBank size={20} />
    },

    {
      name: 'Goals',
      icon: <Goal size={20} />
    },

    {
      name: 'AI Insight',
      icon: <Bot size={20} />
    },

    {
      name: 'Settings',
      icon: <Settings size={20} />
    }

  ];

  return (

    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* SIDEBAR */}

      <div className="hidden lg:flex w-72 border-r border-white/10 flex-col p-6">

        <div className="flex items-center gap-4 mb-10">

          <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.25)]">

            <Wallet className="text-cyan-400" />

          </div>

          <div>

            <h1 className="text-3xl font-black">
              Finance AI
            </h1>

            <p className="text-gray-400">
              Premium Dashboard
            </p>

          </div>

        </div>

        <div className="space-y-3">

          {

            menuItems.map(item => (

              <button
                key={item.name}
                onClick={() =>
                  setActiveMenu(
                    item.name
                  )
                }
                className={`
                  w-full
                  flex items-center gap-3
                  rounded-2xl
                  px-5 py-4
                  transition-all duration-300
                  border

                  ${
                    activeMenu === item.name
                      ? 'bg-cyan-500/20 border-cyan-500/20 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                      : 'bg-white/5 border-white/5 hover:bg-cyan-500/10'
                  }
                `}
              >

                {item.icon}

                {item.name}

              </button>

            ))

          }

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-5 lg:p-10 overflow-y-auto">

        {

          activeMenu === 'Dashboard' && (

            <DashboardPage
              user={user}
              transactions={transactions}
              income={income}
              expense={expense}
              balance={balance}
              savingsRate={savingsRate}
              topCategory={topCategory}
              financePieData={financePieData}
              categoryPieData={categoryPieData}
              pieColors={pieColors}
            />

          )

        }

        {

          activeMenu === 'Transactions' && (

            <TransactionsPage
              transactions={transactions}
            />

          )

        }

        {

          activeMenu === 'Analytics' && (

            <AnalyticsPage
              income={income}
              expense={expense}
              balance={balance}
              transactions={transactions}
              financePieData={financePieData}
              categoryPieData={categoryPieData}
              pieColors={pieColors}
            />

          )

        }

        {

          activeMenu === 'Budgets' && (

            <BudgetsPage
              expense={expense}
            />

          )

        }

        {

          activeMenu === 'Goals' && (

            <GoalsPage />

          )

        }

        {

          activeMenu === 'AI Insight' && (

            <AIInsightPage
              topCategory={topCategory}
              expense={expense}
            />

          )

        }

        {

          activeMenu === 'Settings' && (

            <SettingsPage
              user={user}
            />

          )

        }

      </div>

    </div>

  );

}

// =========================
// DASHBOARD
// =========================

function DashboardPage({
  user,
  transactions,
  income,
  expense,
  balance,
  savingsRate,
  topCategory,
  financePieData,
  categoryPieData,
  pieColors
}) {

  return (

    <>

      {/* HERO */}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">

          <div className="flex items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-5xl font-black text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)]">

              {user.full_name?.charAt(0)}

            </div>

            <div>

              <h1 className="text-5xl font-black">

                Hi, {user.full_name}

              </h1>

              <p className="text-gray-400 mt-3">

                Connected WhatsApp

              </p>

              <div className="flex items-center gap-2 mt-3 text-cyan-400">

                <BadgeDollarSign size={18} />

                {user.phone_number}

              </div>

            </div>

          </div>

          <div className="mt-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400">

                  AI Financial Score

                </p>

                <h2 className="text-5xl font-black text-cyan-400 mt-3">

                  82

                </h2>

              </div>

              <Brain className="w-14 h-14 text-cyan-400" />

            </div>

          </div>

        </div>

        {/* BALANCE */}

        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 rounded-[32px] p-8 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-300">

                  Current Balance

                </p>

                <h1 className="text-6xl font-black mt-5">

                  Rp {balance.toLocaleString()}

                </h1>

              </div>

              <TrendingUp className="w-16 h-16 text-cyan-400" />

            </div>

            <div className="mt-10 flex items-center gap-3 text-green-400">

              <ArrowUpRight />

              +12.8% this month

            </div>

          </div>

        </div>

      </div>

      {/* AI INSIGHT */}

      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border border-purple-500/20 rounded-[32px] p-8 mb-8">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

            <Sparkles className="text-purple-400" />

          </div>

          <div>

            <h2 className="text-3xl font-black">
              AI Insight
            </h2>

            <p className="text-gray-400 mt-2">
              Smart financial analysis
            </p>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">

            <p className="text-gray-400">
              Top Spending
            </p>

            <h2 className="text-3xl font-black mt-4 text-red-400">

              {topCategory}

            </h2>

          </div>

          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">

            <p className="text-gray-400">
              Savings Rate
            </p>

            <h2 className="text-3xl font-black mt-4 text-green-400">

              {savingsRate}%

            </h2>

          </div>

          <div className="bg-white/5 rounded-3xl p-6 border border-white/10">

            <p className="text-gray-400">
              AI Suggestion
            </p>

            <h2 className="text-xl font-bold mt-4 text-cyan-400 leading-relaxed">

              Kurangi pengeluaran 18% untuk meningkatkan tabungan.

            </h2>

          </div>

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <AnalyticsCard
          title="Balance"
          value={`Rp ${balance.toLocaleString()}`}
          icon={<Wallet />}
          color="cyan"
        />

        <AnalyticsCard
          title="Income"
          value={`Rp ${income.toLocaleString()}`}
          icon={<TrendingUp />}
          color="green"
        />

        <AnalyticsCard
          title="Expense"
          value={`Rp ${expense.toLocaleString()}`}
          icon={<TrendingDown />}
          color="red"
        />

        <AnalyticsCard
          title="Savings"
          value={`${savingsRate}%`}
          icon={<PiggyBank />}
          color="purple"
        />

      </div>
      {/* PREMIUM PIE CHART */}

<div className="grid lg:grid-cols-2 gap-6 mb-8">

  {/* FINANCE RATIO */}

  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2 className="text-3xl font-black">

          Finance Ratio

        </h2>

        <p className="text-gray-400 mt-2">

          Income vs Expense

        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

        <PieChartIcon />

      </div>

    </div>

    <div className="h-[350px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={financePieData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={70}
            paddingAngle={5}
            dataKey="value"
            label
          >

            {

              financePieData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      pieColors[index % pieColors.length]
                    }
                  />

                )
              )

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* CATEGORY PIE */}

  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2 className="text-3xl font-black">

          Expense Categories

        </h2>

        <p className="text-gray-400 mt-2">

          Spending distribution

        </p>

      </div>

      <Activity className="text-cyan-400" />

    </div>

    <div className="h-[350px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={categoryPieData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={65}
            paddingAngle={4}
            dataKey="value"
            label
          >

            {

              categoryPieData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      pieColors[index % pieColors.length]
                    }
                  />

                )
              )

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

      {/* TRANSACTIONS */}

      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-black">
              Transactions
            </h2>

            <p className="text-gray-400 mt-2">
              AI detected finance activity
            </p>

          </div>

          <Bell className="text-cyan-400" />

        </div>

        <div className="space-y-4">

          {

            transactions.map(trx => (

              <TransactionItem
                key={trx.id}
                trx={trx}
              />

            ))

          }

        </div>

      </div>

    </>

  );

}

// =========================
// TRANSACTIONS
// =========================

function TransactionsPage({
  transactions
}) {

  return (

    <div>

      <h1 className="text-5xl font-black mb-8">

        Transactions

      </h1>

      <div className="space-y-5">

        {

          transactions.map(trx => (

            <TransactionItem
              key={trx.id}
              trx={trx}
            />

          ))

        }

      </div>

    </div>

  );

}

// =========================
// ANALYTICS
// =========================

function AnalyticsPage({
  income,
  expense,
  balance,
  transactions,
  financePieData,
  categoryPieData,
  pieColors
}) {

  return (

    <div>

      <h1 className="text-5xl font-black mb-8">

        Analytics

      </h1>

      {/* TOP CARDS */}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <AnalyticsCard
          title="Income"
          value={`Rp ${income.toLocaleString()}`}
          icon={<TrendingUp />}
          color="green"
        />

        <AnalyticsCard
          title="Expense"
          value={`Rp ${expense.toLocaleString()}`}
          icon={<TrendingDown />}
          color="red"
        />

        <AnalyticsCard
          title="Balance"
          value={`Rp ${balance.toLocaleString()}`}
          icon={<Wallet />}
          color="cyan"
        />

      </div>

      {/* PIE CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* FINANCE PIE */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-black mb-8">

            Income vs Expense

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={financePieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={70}
                  dataKey="value"
                  label
                >

                  {

                    financePieData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            pieColors[index % pieColors.length]
                          }
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* CATEGORY PIE */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-black mb-8">

            Category Analytics

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={70}
                  dataKey="value"
                  label
                >

                  {

                    categoryPieData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            pieColors[index % pieColors.length]
                          }
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* SUMMARY */}

      <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-black mb-5">

          Total Transactions

        </h2>

        <h1 className="text-6xl font-black text-cyan-400">

          {transactions.length}

        </h1>

      </div>

    </div>

  );

}

// =========================
// BUDGETS
// =========================

function BudgetsPage({
  expense
}) {

  const budget =
    10000000;

  const used =
    Math.round(
      (expense / budget) * 100
    );

  return (

    <div>

      <h1 className="text-5xl font-black mb-8">

        Smart Budgets

      </h1>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-black">

          Monthly Budget

        </h2>

        <div className="w-full h-5 rounded-full bg-white/10 overflow-hidden mt-8">

          <div
            className="h-full bg-cyan-400"
            style={{
              width: `${used}%`
            }}
          />

        </div>

        <p className="mt-5 text-cyan-400 text-2xl">

          {used}% used

        </p>

      </div>

    </div>

  );

}

// =========================
// GOALS
// =========================

function GoalsPage() {

  return (

    <div>

      <h1 className="text-5xl font-black mb-8">

        Financial Goals

      </h1>

      <div className="space-y-5">

        <GoalCard
          title="Mac Mini M4"
          current={8500000}
          target={15000000}
        />

        <GoalCard
          title="Emergency Fund"
          current={12000000}
          target={20000000}
        />

      </div>

    </div>

  );

}

// =========================
// AI INSIGHT
// =========================

function AIInsightPage({
  topCategory,
  expense
}) {

  return (

    <div>

      <h1 className="text-5xl font-black mb-8">

        AI Insight

      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-8">

          <h2 className="text-3xl font-black mb-5">

            🤖 Smart Analysis

          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">

            Pengeluaran terbesar ada di kategori:

            <span className="text-red-400 font-bold">

              {' '}
              {topCategory}

            </span>

          </p>

        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8">

          <h2 className="text-3xl font-black mb-5">

            🧠 AI Recommendation

          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">

            Pengeluaran bulan ini Rp {expense.toLocaleString()}.

            AI menyarankan pengurangan 15%.

          </p>

        </div>

      </div>

    </div>

  );

}

// =========================
// SETTINGS
// =========================

function SettingsPage({
  user
}) {

  return (

    <div>

      <h1 className="text-5xl font-black mb-8">

        Settings

      </h1>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">

        <div>

          <p className="text-gray-400">
            Full Name
          </p>

          <h2 className="text-3xl font-black mt-2">

            {user.full_name}

          </h2>

        </div>

        <div>

          <p className="text-gray-400">
            WhatsApp
          </p>

          <h2 className="text-3xl font-black mt-2">

            {user.phone_number}

          </h2>

        </div>

        <div>

          <p className="text-gray-400">
            Premium Status
          </p>

          <div className="inline-flex px-5 py-3 rounded-2xl bg-green-500/20 border border-green-500/20 text-green-400 font-bold mt-3">

            ACTIVE PREMIUM

          </div>

        </div>

      </div>

    </div>

  );

}

// =========================
// TRANSACTION ITEM
// =========================

function TransactionItem({
  trx
}) {

  return (

    <div className="bg-white/5 hover:bg-white/10 transition-all border border-white/10 rounded-3xl p-6 flex items-center justify-between">

      <div className="flex items-center gap-5">

        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

          {

            trx.category === 'Food & Dining'
              ? <Utensils />
              : trx.category === 'Shopping'
              ? <ShoppingBag />
              : <Coffee />

          }

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            {trx.description}

          </h2>

          <p className="text-gray-400 mt-2">

            {trx.category} • WhatsApp

          </p>

        </div>

      </div>

      <div
        className={
          trx.type === 'income'
            ? 'text-green-400 text-3xl font-black'
            : 'text-red-400 text-3xl font-black'
        }
      >

        {

          trx.type === 'income'
            ? '+'
            : '-'

        }

        Rp {Number(trx.amount).toLocaleString()}

      </div>

    </div>

  );

}

// =========================
// ANALYTICS CARD
// =========================

function AnalyticsCard({
  title,
  value,
  icon,
  color
}) {

  const colors = {

    cyan:
      'from-cyan-500/20 to-blue-500/10 border-cyan-500/20 text-cyan-400',

    green:
      'from-green-500/20 to-emerald-500/10 border-green-500/20 text-green-400',

    red:
      'from-red-500/20 to-pink-500/10 border-red-500/20 text-red-400',

    purple:
      'from-purple-500/20 to-violet-500/10 border-purple-500/20 text-purple-400'

  };

  return (

    <div
      className={`bg-gradient-to-br ${colors[color]} border rounded-[28px] p-6`}
    >

      <div className="flex items-center justify-between mb-5">

        {icon}

        <Crown size={18} />

      </div>

      <p className="text-gray-400">

        {title}

      </p>

      <h2 className="text-4xl font-black mt-4">

        {value}

      </h2>

    </div>

  );

}

// =========================
// GOAL CARD
// =========================

function GoalCard({
  title,
  current,
  target
}) {

  const percent =
    Math.round(
      (current / target) * 100
    );

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-2xl font-bold">

          {title}

        </h2>

        <Activity className="text-cyan-400" />

      </div>

      <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full bg-cyan-400 rounded-full"
          style={{
            width: `${percent}%`
          }}
        />

      </div>

      <div className="flex items-center justify-between mt-4 text-gray-400">

        <span>

          Rp {current.toLocaleString()}

        </span>

        <span>

          {percent}%

        </span>

      </div>

    </div>

  );

}