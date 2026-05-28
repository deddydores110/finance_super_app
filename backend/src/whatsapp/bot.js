const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const qrcode =
  require('qrcode-terminal');

const {
  handleMessage
} = require('./messageHandler');

async function startWhatsApp() {

  const {
    state,
    saveCreds
  } =
    await useMultiFileAuthState(
      'baileys_auth'
    );

  const {
    version
  } =
    await fetchLatestBaileysVersion();

  console.log(
    'Using WA Version:',
    version
  );

  const sock =
    makeWASocket({

      version,

      auth: state,
      logger: require('pino')({
        level: 'silent'
      }),

      syncFullHistory: false,

      browser: [
        'AI Finance',
        'Chrome',
        '1.0.0'
      ]

    });

  // =========================
  // SAVE CREDS
  // =========================

  sock.ev.on(
    'creds.update',
    saveCreds
  );

  // =========================
  // CONNECTION
  // =========================

  sock.ev.on(
    'connection.update',
    async ({
      connection,
      lastDisconnect,
      qr
    }) => {

      // QR

      if (qr) {

        console.log(
          '📱 Scan QR WhatsApp'
        );

        qrcode.generate(
          qr,
          { small: true }
        );

      }

      // CONNECTED

      if (
        connection === 'open'
      ) {

        console.log(`
===================================
✅ WhatsApp Connected
🤖 Finance Bot Active
🗄️ Database Connected
===================================
`);

      }

      // DISCONNECTED

      if (connection === 'close') {

        console.log(
          '❌ WhatsApp Disconnected'
        );

        console.log(
          JSON.stringify(
            lastDisconnect,
            null,
            2
          )
        );

        const shouldReconnect =
          lastDisconnect
            ?.error
            ?.output
            ?.statusCode !==
          DisconnectReason.loggedOut;

        if (shouldReconnect) {

          console.log(
            '🔄 Reconnecting WhatsApp...'
          );

          setTimeout(() => {

            startWhatsApp();

          }, 5000);

        }

      }

    }
  );

  // =========================
  // ANTI DUPLICATE CACHE
  // =========================

  const processedMessages =
    new Set();

  // =========================
  // MESSAGE LISTENER
  // =========================

  sock.ev.on(
    'messages.upsert',
    async ({ messages, type }) => {

      try {

        if (
          type !== 'notify'
        ) {
          return;
        }

        const msg =
          messages[0];

        if (!msg) return;

        // IGNORE SELF

        if (
          msg.key.fromMe
        ) {
          return;
        }

        // IGNORE EMPTY

        if (
          !msg.message
        ) {
          return;
        }

        // =========================
        // UNIQUE MESSAGE ID
        // =========================

        const msgId =
          msg.key.id;

        if (
          processedMessages.has(
            msgId
          )
        ) {

          return;

        }

        processedMessages.add(
          msgId
        );

        setTimeout(() => {

          processedMessages.delete(
            msgId
          );

        }, 60000);

        // =========================
        // HANDLE MESSAGE
        // =========================

        await handleMessage(
          sock,
          msg
        );

      } catch (err) {

        console.log(
          'BOT ERROR:',
          err.message
        );

      }

    }
  );

}

module.exports = {
  startWhatsApp
};