const crypto =
  require('crypto');

const User =
  require(
    '../database/models/User'
  );

const Transaction =
  require(
    '../database/models/Transaction'
  );

// =========================
// CACHE ANTI DUPLICATE
// =========================

const processedMessages =
  new Set();

// =========================
// HANDLE MESSAGE
// =========================

async function handleMessage(
  sock,
  msg
) {

  try {

    if (!msg.message) return;

    const from =
      msg.key.remoteJid;

    // =========================
    // IGNORE GROUP
    // =========================

    if (
      from.includes('@g.us')
    ) {
      return;
    }

    // =========================
    // GET TEXT
    // =========================

    const text =
      msg.message.conversation ||

      msg.message.extendedTextMessage
        ?.text ||

      '';

    if (!text) return;

    const lower =
      text.toLowerCase().trim();

    // =========================
    // ANTI DOUBLE MESSAGE
    // =========================

    const uniqueKey =
      `${from}_${lower}`;

    if (
      processedMessages.has(
        uniqueKey
      )
    ) {

      return;

    }

    processedMessages.add(
      uniqueKey
    );

    setTimeout(() => {

      processedMessages.delete(
        uniqueKey
      );

    }, 5000);

    // =========================
    // LOG
    // =========================

    console.log(`
======================
📩 NEW MESSAGE
FROM : ${from}
TEXT : ${text}
======================
`);

    // =========================
    // FIND USER
    // =========================

    let user =
      await User.findOne({

        where: {
          whatsapp_jid: from
        }

      });

    // =========================
    // REGISTER
    // =========================

    if (
      lower === 'daftar'
    ) {

      if (!user) {

        user =
          await User.create({

            full_name:
              msg.pushName ||
              'WhatsApp User',

            phone_number:
              from.split('@')[0],

            whatsapp_jid: from,

            dashboard_token:
              crypto
                .randomBytes(32)
                .toString('hex'),

            is_verified: true

          });

        console.log(
          '✅ USER CREATED'
        );

      }

      const dashboardUrl =
        `http://localhost:3006/user/${user.dashboard_token}`;

      await sock.sendMessage(from, {

        text:
`✅ Registrasi berhasil

Dashboard:

${dashboardUrl}`

      });

      return;

    }

    // =========================
    // USER NOT FOUND
    // =========================

    if (!user) {

      await sock.sendMessage(from, {

        text:
`❌ Kamu belum terdaftar

Ketik:
DAFTAR`

      });

      return;

    }

    // =========================
    // DETECT AMOUNT
    // =========================

    const amountMatch =
      lower.match(/\d+/g);

    if (!amountMatch) {

      return;

    }

    const amount =
      parseInt(
        amountMatch.join('')
      );

    // =========================
    // DESCRIPTION
    // =========================

    const description =
      lower
        .replace(/[0-9]/g, '')
        .trim();

    // =========================
    // =========================
    // ADVANCED AI NLP ENGINE
    // =========================

    const aiEngine = {

      incomeKeywords: [

        // salary

        'gaji',
        'salary',
        'payroll',
        'thr',
        'bonus',
        'insentif',
        'komisi',
        'fee',
        'bayaran',
        'dibayar',
        'upah',
        'honor',
        'honorarium',

        // business

        'profit',
        'cuan',
        'untung',
        'income',
        'pendapatan',
        'omset',
        'cashflow masuk',
        'revenue',
        'jualan',
        'jual',
        'sold',
        'closing',
        'deal',

        // transfer

        'transfer masuk',
        'uang masuk',
        'dapat transfer',
        'masuk',
        'dibayar client',

        // investment

        'dividen',
        'staking',
        'yield',
        'crypto profit',
        'capital gain',
        'saham naik',

        // misc

        'cashback',
        'refund',
        'hadiah',
        'giveaway',
        'arisan',
        'hibah',
        'sumbangan',
        'donasi masuk',
        'klaim',
        'bpjs cair',
        'pencairan',
        'withdraw',
        'wd',
        'payout',
        'affiliate',
        'adsense',
        'youtube income'

      ],

      categories: {

        'Food & Dining': [

          'makan',
          'bakso',
          'mie',
          'mie ayam',
          'ayam',
          'geprek',
          'soto',
          'nasi',
          'padang',
          'warteg',
          'rice bowl',
          'ayam bakar',
          'ayam goreng',
          'kopi',
          'ngopi',
          'coffee',
          'cappuccino',
          'latte',
          'espresso',
          'starbucks',
          'fore',
          'janji jiwa',
          'roti',
          'toast',
          'donut',
          'pizza',
          'burger',
          'kfc',
          'mcd',
          'mixue',
          'boba',
          'chatime',
          'gofood',
          'grabfood',
          'resto',
          'restoran',
          'cafe',
          'jajan',
          'snack',
          'cemilan',
          'minum',
          'air mineral',
          'aqua',
          'teh',
          'jus',
          'susu',
          'sarapan',
          'makan siang',
          'makan malam'

        ],

        Transportation: [

          'grab',
          'gojek',
          'gocar',
          'goride',
          'maxim',
          'inDrive',
          'taksi',
          'taxi',
          'uber',
          'transport',
          'transportasi',
          'bensin',
          'pertalite',
          'pertamax',
          'solar',
          'spbu',
          'parkir',
          'tol',
          'kereta',
          'krl',
          'mrt',
          'transjakarta',
          'pesawat',
          'travel',
          'bus',
          'shuttle',
          'servis motor',
          'servis mobil',
          'oli',
          'ban',
          'bbm'

        ],

        Shopping: [

          'shopee',
          'tokopedia',
          'lazada',
          'tiktok shop',
          'blibli',
          'bukalapak',
          'checkout',
          'co',
          'beli',
          'shopping',
          'belanja',
          'sepatu',
          'sneakers',
          'nike',
          'adidas',
          'new balance',
          'hoodie',
          'kaos',
          'kemeja',
          'celana',
          'cargo',
          'jaket',
          'fashion',
          'uniqlo',
          'zara',
          'h&m',
          'bershka',
          'iphone',
          'samsung',
          'macbook',
          'ipad',
          'laptop',
          'pc',
          'monitor',
          'keyboard',
          'mouse',
          'ssd',
          'ram',
          'kamera',
          'headset',
          'airpods',
          'aksesoris',
          'jam tangan',
          'tas',
          'dompet'

        ],

        Subscription: [

          'spotify',
          'netflix',
          'chatgpt',
          'openai',
          'hosting',
          'vps',
          'server',
          'aws',
          'digital ocean',
          'linode',
          'cursor ai',
          'github',
          'youtube premium',
          'google drive',
          'icloud',
          'canva',
          'figma',
          'adobe',
          'envato',
          'midjourney',
          'domain',
          'cloudflare',
          'apple music',
          'subscription',
          'langganan',
          'premium'

        ],

        Investment: [

          'crypto',
          'bitcoin',
          'btc',
          'ethereum',
          'eth',
          'solana',
          'bnb',
          'trading',
          'future',
          'spot',
          'saham',
          'stock',
          'reksadana',
          'bibit',
          'ajaib',
          'stockbit',
          'investasi',
          'deposito',
          'emas',
          'gold',
          'forex',
          'obligasi'

        ],

        Bills: [

          'listrik',
          'pln',
          'wifi',
          'internet',
          'biznet',
          'indihome',
          'air',
          'pdam',
          'tagihan',
          'pulsa',
          'paket data',
          'token listrik',
          'bpjs',
          'asuransi',
          'cicilan',
          'angsuran',
          'kpr'

        ],

        Entertainment: [

          'bioskop',
          'cinema',
          'film',
          'netflix',
          'spotify',
          'game',
          'steam',
          'valorant',
          'mobile legends',
          'ml',
          'pubg',
          'genshin',
          'playstation',
          'ps5',
          'xbox',
          'karaoke',
          'hiburan'

        ],

        Health: [

          'dokter',
          'rumah sakit',
          'rs',
          'klinik',
          'medical',
          'obat',
          'vitamin',
          'suplemen',
          'gym',
          'fitness',
          'protein',
          'cek darah',
          'tes kesehatan'

        ],

        Education: [

          'kursus',
          'bootcamp',
          'kelas',
          'udemy',
          'coursera',
          'kuliah',
          'sekolah',
          'ebook',
          'buku',
          'pelatihan',
          'sertifikat'

        ],

        Business: [

          'client',
          'invoice',
          'project',
          'iklan',
          'facebook ads',
          'google ads',
          'marketing',
          'supplier',
          'reseller',
          'dropship',
          'operasional',
          'ongkir',
          'packaging',
          'bisnis'

        ]

      }

    };
    // =========================
    // AI TEXT NORMALIZER
    // =========================

    const normalized =
      lower

        .replace(/yg/g, 'yang')
        .replace(/utk/g, 'untuk')
        .replace(/dr/g, 'dari')
        .replace(/dpt/g, 'dapat')
        .replace(/trx/g, 'transaksi')
        .replace(/bgt/g, 'banget')
        .replace(/krn/g, 'karena')
        .replace(/blm/g, 'belum')
        .replace(/udh/g, 'sudah')
        .replace(/aja/g, 'saja')
        .replace(/ga/g, 'tidak')
        .replace(/gk/g, 'tidak')
        .replace(/rp/g, '')
        .trim();


    // =========================
    // TYPE DETECTION
    // =========================

    let type =
      'expense';

    const isIncome =
      aiEngine.incomeKeywords.some(
        keyword =>
          lower.includes(keyword)
      );

    if (isIncome) {

      type = 'income';

    }

    // =========================
    // CATEGORY DETECTION
    // =========================

    let category =
      'General';

    let highestScore = 0;

    for (
      const [cat, keywords]
      of Object.entries(
        aiEngine.categories
      )
    ) {

      let score = 0;

      keywords.forEach(keyword => {

        if (
          lower.includes(keyword)
        ) {

          score++;

        }

      });

      if (
        score > highestScore
      ) {

        highestScore = score;

        category = cat;

      }

    }

    // AUTO INCOME CATEGORY

    if (
      type === 'income' &&
      category === 'General'
    ) {

      category =
        'Income';

    }

    // =========================
    // SUB CATEGORY
    // =========================

    let sub_category =
      'General';

    if (
      category ===
      'Food & Dining'
    ) {

      if (
        lower.includes('kopi')
      ) {

        sub_category =
          'Coffee';

      }

      else if (
        lower.includes('bakso')
      ) {

        sub_category =
          'Bakso';

      }

      else if (
        lower.includes('mie')
      ) {

        sub_category =
          'Noodles';

      }

      else {

        sub_category =
          'Meal';

      }

    }

    // =========================
    // AI FLAGS
    // =========================

    const ai_flags = {

      recurring:
        category ===
        'Subscription',

      high_spending:
        amount >= 1000000,

      possible_saving:
        category ===
          'Food & Dining' &&
        amount >= 100000,

      luxury:

        lower.includes('iphone') ||
        lower.includes('macbook')

    };

    console.log(`
======================
🤖 AI ANALYSIS
TYPE: ${type}
CATEGORY: ${category}
SUB CATEGORY: ${sub_category}
FLAGS:
${JSON.stringify(ai_flags)}
======================
`);

    // =========================
    // SAVE DATABASE
    // =========================

    const transaction =
      await Transaction.create({

        user_id: user.id,

        description,

        amount,

        type,

        category,

        sub_category,

        ai_flags:
          JSON.stringify(
            ai_flags
          ),

        source: 'whatsapp',

        transaction_date:
          new Date()

      });

    // =========================
    // SUCCESS REPLY
    // =========================

    await sock.sendMessage(from, {

      text:
`✅ Transaksi berhasil dicatat

📝 ${description}

💰 Rp ${amount.toLocaleString()}

📂 ${category}

🏷️ ${sub_category}

📊 ${type.toUpperCase()}

🆔 ${transaction.id}`

    });

    console.log(
      '✅ TRANSACTION SAVED'
    );

    return;

  } catch (err) {

    console.log(
      'MESSAGE HANDLER ERROR:',
      err.message
    );

  }

}

// =========================
// EXPORT
// =========================

module.exports = {
  handleMessage
};