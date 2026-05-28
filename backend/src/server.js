require('dotenv').config();

const app =
  require('./app');

const sequelize =
  require('./config/database');

const {
  startWhatsApp
} =
  require('./whatsapp/bot');

const PORT =
  process.env.PORT || 3005;

const cors = require('cors');

app.use(cors({
  origin: '*'
}));

async function startServer() {

  try {

    await sequelize.authenticate();

    console.log(
      '✅ Database connected'
    );

    app.listen(PORT, () => {

      console.log(
        `🚀 Server running on ${PORT}`
      );

    });

    // =========================
    // START WHATSAPP
    // =========================

    startWhatsApp();

  } catch (err) {

    console.log(
      'SERVER ERROR:',
      err.message
    );

  }

}

startServer();