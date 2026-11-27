const MANIFEST_JSON = {
  name: "KoboLedger",
  short_name: "KoboLedger",
  description: "Global business ledger, cart, stock & assistant.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#0b1120",
  theme_color: "#0f766e",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
  ]
};

const CURRENCIES = {
  NGN: { code: "NGN", symbol: "₦", rateFromNGN: 1 },
  USD: { code: "USD", symbol: "$", rateFromNGN: 1 / 1600 },
  EUR: { code: "EUR", symbol: "€", rateFromNGN: 1 / 1730 },
  GBP: { code: "GBP", symbol: "£", rateFromNGN: 1 / 2030 },
  XAF: { code: "XAF", symbol: "FCFA ", rateFromNGN: 615 / 1730 },
  XOF: { code: "XOF", symbol: "CFA ", rateFromNGN: 615 / 1730 },
  KES: { code: "KES", symbol: "KSh ", rateFromNGN: 130 / 1600 },
  GHS: { code: "GHS", symbol: "₵", rateFromNGN: 15.5 / 1600 },
  ZAR: { code: "ZAR", symbol: "R", rateFromNGN: 18 / 1600 },
  CLP: { code: "CLP", symbol: "$", rateFromNGN: 960 / 1600 },
  BRL: { code: "BRL", symbol: "R$", rateFromNGN: 5.7 / 1600 },
  INR: { code: "INR", symbol: "₹", rateFromNGN: 84 / 1600 },
  CNY: { code: "CNY", symbol: "¥", rateFromNGN: 7.2 / 1600 },
  AED: { code: "AED", symbol: "AED ", rateFromNGN: 3.67 / 1600 }
};

const I18N = {
  en: {
    subtitle: "Simple global ledger — record entries first",
    backup: "Save Backup",
    moneyIn: "Money In",
    moneyOut: "Money Out",
    balance: "Balance",
    tabRecord: "Record",
    tabCart: "Cart",
    tabStock: "Stock",
    tabHelp: "Assistant",
    recordTitle: "Record Entry",
    kind: "Kind",
    inOpt: "Money In (Sale / Received)",
    outOpt: "Money Out (Expense / Bought)",
    debtOpt: "Owing / Credit",
    amount: "Amount",
    note: "What For / Name",
    recordNow: "Record Now",
    listTitle: "Recorded Entries",
    date: "Date",
    details: "Details",
    action: "Action",
    emptyRec: "Nothing recorded yet. Add your entry above.",
    cartTitle: "Cart",
    itemName: "Item name",
    qty: "Qty",
    price: "Price",
    addItem: "Add Item",
    total: "Total",
    cartTotal: "Cart Total",
    clear: "Clear",
    saveCartSale: "Save Cart as Sale",
    emptyCart: "Cart is empty.",
    stockTitle: "Stock",
    inHand: "In Hand",
    status: "Status",
    saveItem: "Save Item",
    emptyStock: "No items added yet.",
    low: "Low",
    ok: "OK",
    assistantTitle: "Assistant",
    assistantIntro: "Ask about your balance, low stock, or summary.",
    askPlaceholder: "Ask about balance, stock, or summary...",
    send: "Send",
    enterAmount: "Enter a valid amount.",
    enterItem: "Enter item name, quantity, and price.",
    enterStock: "Enter item name, price, and stock count."
  },
  fr: {
    subtitle: "Carnet mondial simple — enregistrez d'abord",
    backup: "Sauvegarder",
    moneyIn: "Entrées",
    moneyOut: "Sorties",
    balance: "Solde",
    tabRecord: "Enregistrer",
    tabCart: "Panier",
    tabStock: "Stock",
    tabHelp: "Assistant",
    recordTitle: "Nouvelle entrée",
    kind: "Type",
    inOpt: "Entrée d'argent (Vente / Reçu)",
    outOpt: "Sortie d'argent (Dépense / Achat)",
    debtOpt: "Dette / Crédit",
    amount: "Montant",
    note: "Motif / Nom",
    recordNow: "Enregistrer",
    listTitle: "Entrées enregistrées",
    date: "Date",
    details: "Détails",
    action: "Action",
    emptyRec: "Aucune entrée pour l'instant.",
    cartTitle: "Panier",
    itemName: "Nom de l'article",
    qty: "Qté",
    price: "Prix",
    addItem: "Ajouter",
    total: "Total",
    cartTotal: "Total panier",
    clear: "Vider",
    saveCartSale: "Valider la vente",
    emptyCart: "Le panier est vide.",
    stockTitle: "Stock",
    inHand: "En stock",
    status: "État",
    saveItem: "Enregistrer l'article",
    emptyStock: "Aucun article ajouté.",
    low: "Faible",
    ok: "OK",
    assistantTitle: "Assistant",
    assistantIntro: "Posez une question sur le solde, le stock faible ou le résumé.",
    askPlaceholder: "Solde, stock faible ou résumé...",
    send: "Envoyer",
    enterAmount: "Entrez un montant valide.",
    enterItem: "Entrez le nom, la quantité et le prix.",
    enterStock: "Entrez le nom, le prix et la quantité."
  },
  es: {
    subtitle: "Registro global simple — anota primero",
    backup: "Respaldar",
    moneyIn: "Ingresos",
    moneyOut: "Gastos",
    balance: "Saldo",
    tabRecord: "Registrar",
    tabCart: "Carrito",
    tabStock: "Inventario",
    tabHelp: "Asistente",
    recordTitle: "Anotar movimiento",
    kind: "Tipo",
    inOpt: "Ingreso (Venta / Cobro)",
    outOpt: "Gasto (Compra / Pago)",
    debtOpt: "Deuda / Crédito",
    amount: "Monto",
    note: "Detalle / Nombre",
    recordNow: "Guardar ahora",
    listTitle: "Movimientos guardados",
    date: "Fecha",
    details: "Detalles",
    action: "Acción",
    emptyRec: "Sin registros todavía.",
    cartTitle: "Carrito",
    itemName: "Nombre del producto",
    qty: "Cant.",
    price: "Precio",
    addItem: "Agregar",
    total: "Total",
    cartTotal: "Total carrito",
    clear: "Limpiar",
    saveCartSale: "Guardar carrito como venta",
    emptyCart: "El carrito está vacío.",
    stockTitle: "Inventario",
    inHand: "Disponible",
    status: "Estado",
    saveItem: "Guardar producto",
    emptyStock: "Sin productos todavía.",
    low: "Bajo",
    ok: "Bien",
    assistantTitle: "Asistente",
    assistantIntro: "Pregunta por tu saldo, stock bajo o resumen.",
    askPlaceholder: "Saldo, stock bajo o resumen...",
    send: "Enviar",
    enterAmount: "Ingresa un monto válido.",
    enterItem: "Ingresa nombre, cantidad y precio.",
    enterStock: "Ingresa nombre, precio y cantidad."
  },
  pt: {
    subtitle: "Livro global simples — registre primeiro",
    backup: "Backup",
    moneyIn: "Entradas",
    moneyOut: "Saídas",
    balance: "Saldo",
    tabRecord: "Registrar",
    tabCart: "Carrinho",
    tabStock: "Estoque",
    tabHelp: "Assistente",
    recordTitle: "Registrar lançamento",
    kind: "Tipo",
    inOpt: "Entrada (Venda / Recebido)",
    outOpt: "Saída (Despesa / Compra)",
    debtOpt: "Dívida / Fiado",
    amount: "Valor",
    note: "Descrição / Nome",
    recordNow: "Registrar agora",
    listTitle: "Lançamentos",
    date: "Data",
    details: "Detalhes",
    action: "Ação",
    emptyRec: "Nada registrado ainda.",
    cartTitle: "Carrinho",
    itemName: "Nome do item",
    qty: "Qtd",
    price: "Preço",
    addItem: "Adicionar",
    total: "Total",
    cartTotal: "Total do carrinho",
    clear: "Limpar",
    saveCartSale: "Salvar carrinho como venda",
    emptyCart: "Carrinho vazio.",
    stockTitle: "Estoque",
    inHand: "Em estoque",
    status: "Status",
    saveItem: "Salvar item",
    emptyStock: "Nenhum item adicionado.",
    low: "Baixo",
    ok: "OK",
    assistantTitle: "Assistente",
    assistantIntro: "Pergunte sobre saldo, estoque baixo ou resumo.",
    askPlaceholder: "Saldo, estoque baixo ou resumo...",
    send: "Enviar",
    enterAmount: "Digite um valor válido.",
    enterItem: "Digite nome, quantidade e preço.",
    enterStock: "Digite nome, preço e estoque."
  },
  ar: {
    subtitle: "دفتر عالمي بسيط — سجّل أولاً",
    backup: "نسخ احتياطي",
    moneyIn: "الوارد",
    moneyOut: "المنصرف",
    balance: "الرصيد",
    tabRecord: "تسجيل",
    tabCart: "السلة",
    tabStock: "المخزون",
    tabHelp: "المساعد",
    recordTitle: "تسجيل عملية",
    kind: "النوع",
    inOpt: "وارد (بيع / مقبوضات)",
    outOpt: "منصرف (مصروف / شراء)",
    debtOpt: "دين / آجل",
    amount: "المبلغ",
    note: "الوصف / الاسم",
    recordNow: "سجّل الآن",
    listTitle: "السجلات",
    date: "التاريخ",
    details: "التفاصيل",
    action: "إجراء",
    emptyRec: "لا توجد سجلات بعد.",
    cartTitle: "السلة",
    itemName: "اسم الصنف",
    qty: "الكمية",
    price: "السعر",
    addItem: "إضافة",
    total: "الإجمالي",
    cartTotal: "إجمالي السلة",
    clear: "مسح",
    saveCartSale: "حفظ السلة كبيع",
    emptyCart: "السلة فارغة.",
    stockTitle: "المخزون",
    inHand: "المتوفر",
    status: "الحالة",
    saveItem: "حفظ الصنف",
    emptyStock: "لا توجد أصناف بعد.",
    low: "منخفض",
    ok: "جيد",
    assistantTitle: "المساعد",
    assistantIntro: "اسأل عن الرصيد أو نقص المخزون أو الملخص.",
    askPlaceholder: "الرصيد أو المخزون أو الملخص...",
    send: "إرسال",
    enterAmount: "أدخل مبلغاً صحيحاً.",
    enterItem: "أدخل اسم الصنف والكمية والسعر.",
    enterStock: "أدخل اسم الصنف والسعر والكمية."
  },
  zh: {
    subtitle: "全球简明账本 —— 先记账",
    backup: "导出备份",
    moneyIn: "收入",
    moneyOut: "支出",
    balance: "结余",
    tabRecord: "记账",
    tabCart: "购物车",
    tabStock: "库存",
    tabHelp: "助手",
    recordTitle: "记录明细",
    kind: "类型",
    inOpt: "收入（销售 / 收款）",
    outOpt: "支出（费用 / 进货）",
    debtOpt: "欠款 / 赊账",
    amount: "金额",
    note: "说明 / 名称",
    recordNow: "立即记录",
    listTitle: "已记账目",
    date: "日期",
    details: "详情",
    action: "操作",
    emptyRec: "暂无记录，请在上方添加。",
    cartTitle: "购物车",
    itemName: "商品名称",
    qty: "数量",
    price: "单价",
    addItem: "加入",
    total: "小计",
    cartTotal: "购物车合计",
    clear: "清空",
    saveCartSale: "将购物车存为销售",
    emptyCart: "购物车为空。",
    stockTitle: "库存",
    inHand: "现有库存",
    status: "状态",
    saveItem: "保存商品",
    emptyStock: "暂无库存商品。",
    low: "偏低",
    ok: "正常",
    assistantTitle: "助手",
    assistantIntro: "询问结余、低库存或账目摘要。",
    askPlaceholder: "输入结余、库存或摘要...",
    send: "发送",
    enterAmount: "请输入有效金额。",
    enterItem: "请输入名称、数量和单价。",
    enterStock: "请输入名称、单价和库存数量。"
  },
  hi: {
    subtitle: "सरल वैश्विक खाता — पहले एंट्री दर्ज करें",
    backup: "बैकअप",
    moneyIn: "आवक",
    moneyOut: "खर्च",
    balance: "बचाव / बैलेंस",
    tabRecord: "दर्ज करें",
    tabCart: "कार्ट",
    tabStock: "स्टॉक",
    tabHelp: "सहायक",
    recordTitle: "एंट्री दर्ज करें",
    kind: "प्रकार",
    inOpt: "आवक (बिक्री / मिला)",
    outOpt: "खर्च (खरीद / भुगतान)",
    debtOpt: "उधार / बकाया",
    amount: "राशि",
    note: "विवरण / नाम",
    recordNow: "अभी दर्ज करें",
    listTitle: "दर्ज एंट्री",
    date: "तारीख",
    details: "विवरण",
    action: "कार्रवाई",
    emptyRec: "अभी कोई एंट्री नहीं है।",
    cartTitle: "कार्ट",
    itemName: "सामान का नाम",
    qty: "मात्रा",
    price: "कीमत",
    addItem: "जोड़ें",
    total: "कुल",
    cartTotal: "कार्ट कुल",
    clear: "साफ करें",
    saveCartSale: "कार्ट को बिक्री में सहेजें",
    emptyCart: "कार्ट खाली है।",
    stockTitle: "स्टॉक",
    inHand: "उपलब्ध",
    status: "स्थिति",
    saveItem: "सामान सहेजें",
    emptyStock: "कोई सामान नहीं जोड़ा गया।",
    low: "कम",
    ok: "ठीक",
    assistantTitle: "सहायक",
    assistantIntro: "बैलेंस, कम स्टॉक या सारांश के बारे में पूछें।",
    askPlaceholder: "बैलेंस, स्टॉक या सारांश पूछें...",
    send: "भेजें",
    enterAmount: "सही राशि दर्ज करें।",
    enterItem: "नाम, मात्रा और कीमत दर्ज करें।",
    enterStock: "नाम, कीमत और स्टॉक दर्ज करें।"
  },
  sw: {
    subtitle: "Daftari rahisi ya kimataifa — rekodi kwanza",
    backup: "Hifadhi Nakala",
    moneyIn: "Zilizoingia",
    moneyOut: "Zilizotoka",
    balance: "Salio",
    tabRecord: "Rekodi",
    tabCart: "Kikapu",
    tabStock: "Stoku",
    tabHelp: "Msaidizi",
    recordTitle: "Rekodi Muamala",
    kind: "Aina",
    inOpt: "Zilizoingia (Mauzo / Malipo)",
    outOpt: "Zilizotoka (Matumizi / Manunuzi)",
    debtOpt: "Deni / Mkopo",
    amount: "Kiasi",
    note: "Maelezo / Jina",
    recordNow: "Rekodi Sasa",
    listTitle: "Zilizorekodiwa",
    date: "Tarehe",
    details: "Maelezo",
    action: "Hatua",
    emptyRec: "Hakuna rekodi bado.",
    cartTitle: "Kikapu",
    itemName: "Jina la bidhaa",
    qty: "Idadi",
    price: "Bei",
    addItem: "Ongeza",
    total: "Jumla",
    cartTotal: "Jumla ya Kikapu",
    clear: "Futa",
    saveCartSale: "Hifadhi Kikapu kama Mauzo",
    emptyCart: "Kikapu hakina kitu.",
    stockTitle: "Stoku",
    inHand: "Zilizopo",
    status: "Hali",
    saveItem: "Hifadhi Bidhaa",
    emptyStock: "Hakuna bidhaa bado.",
    low: "Chache",
    ok: "Sawa",
    assistantTitle: "Msaidizi",
    assistantIntro: "Uliza kuhusu salio, stoku chache, au muhtasari.",
    askPlaceholder: "Uliza salio, stoku, au muhtasari...",
    send: "Tuma",
    enterAmount: "Weka kiasi sahihi.",
    enterItem: "Weka jina, idadi, na bei.",
    enterStock: "Weka jina, bei, na idadi."
  },
  ha: {
    subtitle: "Littafin lissafi na duniya — fara rubutawa",
    backup: "Ajiye Kwafi",
    moneyIn: "Kudin Da Ya Shigo",
    moneyOut: "Kudin Da Ya Fita",
    balance: "Ragowar Kudi",
    tabRecord: "Rubuta",
    tabCart: "Kwando",
    tabStock: "Haja",
    tabHelp: "Mataimaki",
    recordTitle: "Rubuta Bayani",
    kind: "Nau'i",
    inOpt: "Kudin Da Ya Shigo (Sayarwa)",
    outOpt: "Kudin Da Ya Fita (Kashewa)",
    debtOpt: "Bashi",
    amount: "Adadi",
    note: "Dalili / Suna",
    recordNow: "Rubuta Yanzu",
    listTitle: "Abubuwan Da Aka Rubuta",
    date: "Kwanan Wata",
    details: "Bayani",
    action: "Aiki",
    emptyRec: "Ba a rubuta komai ba tukuna.",
    cartTitle: "Kwando",
    itemName: "Sunan kaya",
    qty: "Yawa",
    price: "Farashi",
    addItem: "Kara",
    total: "Jimilla",
    cartTotal: "Jimillar Kwando",
    clear: "Share",
    saveCartSale: "Ajiye Kwando A Matsayin Sayarwa",
    emptyCart: "Kwando babu komai.",
    stockTitle: "Haja",
    inHand: "A Hannu",
    status: "Yanayi",
    saveItem: "Ajiye Kaya",
    emptyStock: "Ba a saka kaya ba tukuna.",
    low: "Ya Yi Kadan",
    ok: "Lafiya",
    assistantTitle: "Mataimaki",
    assistantIntro: "Tambaya game da ragowa, karancin kaya, ko jimilla.",
    askPlaceholder: "Tambayi ragowa, kaya, ko jimilla...",
    send: "Aika",
    enterAmount: "Shigar da adadi daidai.",
    enterItem: "Shigar da suna, yawa, da farashi.",
    enterStock: "Shigar da suna, farashi, da yawa."
  },
  yo: {
    subtitle: "Ìwé ìṣirò àgbáyé — kọ àkọsílẹ̀ ní àkọ́kọ́",
    backup: "Ṣe Àdàkọ",
    moneyIn: "Owó Tí Ó Wọlé",
    moneyOut: "Owó Tí Ó Jáde",
    balance: "Ìyókù Owó",
    tabRecord: "Kọ Ìṣirò",
    tabCart: "Àpótí Ọjà",
    tabStock: "Ọjà Wà",
    tabHelp: "Olùrànlọ́wọ́",
    recordTitle: "Kọ Àkọsílẹ̀",
    kind: "Irú",
    inOpt: "Owó Tí Ó Wọlé (Títà)",
    outOpt: "Owó Tí Ó Jáde (Ìnáwó)",
    debtOpt: "Gbèsè",
    amount: "Ìye Owó",
    note: "Àlàyé / Orúkọ",
    recordNow: "Kọ Sílẹ̀ Báyìí",
    listTitle: "Àwọn Àkọsílẹ̀",
    date: "Ọjọ́",
    details: "Àlàyé",
    action: "Ìṣe",
    emptyRec: "Kò sí àkọsílẹ̀ kankan síbẹ̀.",
    cartTitle: "Àpótí Ọjà",
    itemName: "Orúkọ ọjà",
    qty: "Iye",
    price: "Iye Owó",
    addItem: "Fi Kún",
    total: "Àpapọ̀",
    cartTotal: "Àpapọ̀ Àpótí",
    clear: "Kó Kúrò",
    saveCartSale: "Fi Ṣe Títà",
    emptyCart: "Àpótí ọjà ṣófo.",
    stockTitle: "Ọjà Wà",
    inHand: "Ní Ọwọ́",
    status: "Ipò",
    saveItem: "Fi Ọjà Pamọ́",
    emptyStock: "Kò sí ọjà kankan síbẹ̀.",
    low: "Tí Dín Kù",
    ok: "Dára",
    assistantTitle: "Olùrànlọ́wọ́",
    assistantIntro: "Béèrè nípa ìyókù, ọjà tí ó dín kù, tàbí àkópọ̀.",
    askPlaceholder: "Béèrè nípa ìyókù tàbí ọjà...",
    send: "Fì Ránṣẹ́",
    enterAmount: "Tẹ ìye owó tí ó tọ́.",
    enterItem: "Tẹ orúkọ, iye, àti owó.",
    enterStock: "Tẹ orúkọ, owó, àti iye ọjà."
  },
  ig: {
    subtitle: "Akwụkwọ ego ụwa — dee ndekọ mbụ",
    backup: "Chekwaa Ndabere",
    moneyIn: "Ego Batara",
    moneyOut: "Ego Pụtara",
    balance: "Ego Fọdụrụ",
    tabRecord: "Dekọọ",
    tabCart: "Nkata",
    tabStock: "Ngwaahịa",
    tabHelp: "Onye Enyemaka",
    recordTitle: "Dekọọ Ihe Mere",
    kind: "Ụdị",
    inOpt: "Ego Batara (Ịre Ahịa)",
    outOpt: "Ego Pụtara (Mmefu)",
    debtOpt: "Ụgwọ",
    amount: "Ego",
    note: "Ihe O Mere / Aha",
    recordNow: "Dekọọ Ugbu A",
    listTitle: "Ihe Ndị E Dekọrọ",
    date: "Ụbọchị",
    details: "Nkọwa",
    action: "Omume",
    emptyRec: "Enweghị ndekọ ọ bụla ugbu a.",
    cartTitle: "Nkata",
    itemName: "Aha ngwaahịa",
    qty: "Ọnụọgụgụ",
    price: "Ọnụ Ahịa",
    addItem: "Tinye",
    total: "Ngụkọta",
    cartTotal: "Ngụkọta Nkata",
    clear: "Kpochapụ",
    saveCartSale: "Chekwaa Dịka Ịre Ahịa",
    emptyCart: "Nkata tọgbọ chakoo.",
    stockTitle: "Ngwaahịa",
    inHand: "N'Aka",
    status: "Ọnọdụ",
    saveItem: "Chekwaa Ngwaahịa",
    emptyStock: "Enweghị ngwaahịa ọ bụla.",
    low: "Dị Ala",
    ok: "Ọ Dị Mma",
    assistantTitle: "Onye Enyemaka",
    assistantIntro: "Jụọ gbasara ego fọdụrụ, ngwaahịa dị ala, ma ọ bụ nchịkọta.",
    askPlaceholder: "Jụọ gbasara ego fọdụrụ ma ọ bụ ngwaahịa...",
    send: "Ziga",
    enterAmount: "Tinye ego ziri ezi.",
    enterItem: "Tinye aha, ọnụọgụgụ, na ọnụ ahịa.",
    enterStock: "Tinye aha, ọnụ ahịa, na ngwaahịa."
  }
};

const SERVICE_WORKER_JS = [
  'const CACHE_NAME = "koboledger-global-v1";',
  'self.addEventListener("install", function(e) {',
  '  e.waitUntil(caches.open(CACHE_NAME).then(function(c) { return c.addAll(["/", "/manifest.json"]); }));',
  '  self.skipWaiting();',
  '});',
  'self.addEventListener("activate", function(e) {',
  '  e.waitUntil(caches.keys().then(function(keys) {',
  '    return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));',
  '  }));',
  '  self.clients.claim();',
  '});',
  'self.addEventListener("fetch", function(e) {',
  '  if (e.request.method !== "GET") return;',
  '  var u = new URL(e.request.url);',
  '  if (u.pathname.indexOf("/api/") === 0) return;',
  '  e.respondWith(fetch(e.request).catch(function() { return caches.match(e.request); }));',
  '});'
].join("\n");

function makeSvgIcon(size) {
  var rx = Math.round(size * 0.22);
  var half = size * 0.5;
  var rad = size * 0.31;
  var sw = Math.max(4, Math.round(size * 0.04));
  var fs = Math.round(size * 0.34);
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">\n' +
    '  <rect width="' + size + '" height="' + size + '" rx="' + rx + '" fill="#0f766e"/>\n' +
    '  <circle cx="' + half + '" cy="' + half + '" r="' + rad + '" fill="none" stroke="#99f6e4" stroke-width="' + sw + '"/>\n' +
    '  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-weight="800" font-size="' + fs + '">K</text>\n' +
    '</svg>';
}

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KoboLedger</title>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0f766e" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: #0b1120;
      color: #f8fafc;
      padding: 16px;
      padding-bottom: 60px;
    }
    .wrap { max-width: 920px; margin: 0 auto; }
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      background: #132038;
      border: 1px solid #24375c;
      padding: 14px 16px;
      border-radius: 12px;
      margin-bottom: 14px;
    }
    .topbar h1 { font-size: 20px; }
    .topbar .sub { font-size: 13px; color: #94a3b8; }
    .controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    select, input, button {
      font-family: inherit;
      font-size: 14px;
      border-radius: 8px;
      border: 1px solid #2e4570;
      background: #0f172a;
      color: #f8fafc;
      padding: 9px 11px;
    }
    button { cursor: pointer; font-weight: 600; }
    .btn-green { background: #10b981; color: #052e16; border-color: transparent; }
    .btn-teal { background: #14b8a6; color: #042f2e; border-color: transparent; }
    .btn-red { background: #ef4444; color: #ffffff; border-color: transparent; }
    .btn-dark { background: #1e293b; color: #e2e8f0; }

    .summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    @media (max-width: 640px) { .summary { grid-template-columns: 1fr; } }
    .box {
      background: #132038;
      border: 1px solid #24375c;
      border-radius: 10px;
      padding: 12px;
    }
    .box small { display: block; color: #94a3b8; font-size: 12px; }
    .box strong { display: block; font-size: 18px; margin-top: 4px; }

    .nav {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .nav button {
      background: #132038;
      color: #cbd5e1;
      border: 1px solid #24375c;
      padding: 9px 14px;
    }
    .nav button.active {
      background: #14b8a6;
      color: #042f2e;
      border-color: #14b8a6;
    }

    .card {
      background: #132038;
      border: 1px solid #24375c;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .card h2 { font-size: 16px; margin-bottom: 12px; }
    .row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 10px;
      margin-bottom: 10px;
    }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td {
      text-align: left;
      padding: 9px 8px;
      border-bottom: 1px solid #24375c;
      font-size: 14px;
    }
    th { color: #94a3b8; font-size: 12px; }
    .empty { color: #94a3b8; font-size: 14px; padding: 10px 0; }
    .low { color: #fca5a5; font-weight: 700; }
    .ok { color: #86efac; font-weight: 700; }
    .chat-log {
      background: #0f172a;
      border: 1px solid #24375c;
      border-radius: 10px;
      padding: 12px;
      min-height: 140px;
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .chat-line { margin-bottom: 8px; }
    .who-user { color: #5eead4; font-weight: 700; }
    .who-ai { color: #fde68a; font-weight: 700; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="topbar">
      <div>
        <h1>KoboLedger</h1>
        <div class="sub" id="txtSub"></div>
      </div>
      <div class="controls">
        <select id="langPick" aria-label="Language">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
          <option value="ar">العربية</option>
          <option value="zh">中文</option>
          <option value="hi">हिन्दी</option>
          <option value="sw">Kiswahili</option>
          <option value="ha">Hausa</option>
          <option value="yo">Yorùbá</option>
          <option value="ig">Igbo</option>
        </select>
        <select id="currencyPick" aria-label="Currency">
          <option value="NGN">NGN (₦)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="XAF">XAF (FCFA)</option>
          <option value="XOF">XOF (CFA)</option>
          <option value="KES">KES (KSh)</option>
          <option value="GHS">GHS (₵)</option>
          <option value="ZAR">ZAR (R)</option>
          <option value="CLP">CLP ($)</option>
          <option value="BRL">BRL (R$)</option>
          <option value="INR">INR (₹)</option>
          <option value="CNY">CNY (¥)</option>
          <option value="AED">AED</option>
        </select>
        <button type="button" class="btn-dark" id="btnBackup"></button>
      </div>
    </div>

    <div class="summary">
      <div class="box"><small id="lblIn"></small><strong id="sumIn" style="color:#4ade80;"></strong></div>
      <div class="box"><small id="lblOut"></small><strong id="sumOut" style="color:#f87171;"></strong></div>
      <div class="box"><small id="lblBal"></small><strong id="sumBal"></strong></div>
    </div>

    <div class="nav">
      <button type="button" id="tabBtn-record" class="active"></button>
      <button type="button" id="tabBtn-cart"></button>
      <button type="button" id="tabBtn-stock"></button>
      <button type="button" id="tabBtn-help"></button>
    </div>

    <!-- TAB 1: RECORD FIRST -->
    <div id="tab-record">
      <div class="card">
        <h2 id="lblRecordTitle"></h2>
        <div class="row">
          <div>
            <small id="lblKind" style="display:block;color:#94a3b8;margin-bottom:4px;"></small>
            <select id="recType" style="width:100%;">
              <option value="in" id="optIn"></option>
              <option value="out" id="optOut"></option>
              <option value="debt" id="optDebt"></option>
            </select>
          </div>
          <div>
            <small id="lblAmount" style="display:block;color:#94a3b8;margin-bottom:4px;"></small>
            <input id="recAmount" type="number" step="0.01" style="width:100%;" />
          </div>
          <div>
            <small id="lblNote" style="display:block;color:#94a3b8;margin-bottom:4px;"></small>
            <input id="recNote" type="text" style="width:100%;" />
          </div>
        </div>
        <button type="button" class="btn-green" id="btnAddRecord" style="width:100%;"></button>
      </div>

      <div class="card">
        <h2 id="lblListTitle"></h2>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="thDate"></th>
                <th id="thKind"></th>
                <th id="thDetails"></th>
                <th id="thAmount"></th>
                <th id="thAction"></th>
              </tr>
            </thead>
            <tbody id="recList"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: CART -->
    <div id="tab-cart" style="display:none;">
      <div class="card">
        <h2 id="lblCartTitle"></h2>
        <div class="row">
          <input id="cartName" type="text" />
          <input id="cartQty" type="number" min="1" value="1" />
          <input id="cartPrice" type="number" step="0.01" />
          <button type="button" class="btn-teal" id="btnAddCart"></button>
        </div>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="thCartItem"></th>
                <th id="thCartQty"></th>
                <th id="thCartPrice"></th>
                <th id="thCartTotal"></th>
                <th id="thCartDel"></th>
              </tr>
            </thead>
            <tbody id="cartList"></tbody>
          </table>
        </div>
        <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <strong><span id="lblCartTotal"></span>: <span id="cartTotal"></span></strong>
          <div style="display:flex;gap:8px;">
            <button type="button" class="btn-dark" id="btnClearCart"></button>
            <button type="button" class="btn-green" id="btnCheckout"></button>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: STOCK -->
    <div id="tab-stock" style="display:none;">
      <div class="card">
        <h2 id="lblStockTitle"></h2>
        <div class="row">
          <input id="stkName" type="text" />
          <input id="stkPrice" type="number" step="0.01" />
          <input id="stkQty" type="number" min="0" value="5" />
          <input id="stkLow" type="number" min="0" value="2" />
          <button type="button" class="btn-teal" id="btnSaveStock"></button>
        </div>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="thStkItem"></th>
                <th id="thStkPrice"></th>
                <th id="thStkHand"></th>
                <th id="thStkStatus"></th>
                <th id="thStkAction"></th>
              </tr>
            </thead>
            <tbody id="stkList"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 4: ASSISTANT -->
    <div id="tab-help" style="display:none;">
      <div class="card">
        <h2 id="lblAssistantTitle"></h2>
        <div class="chat-log" id="chatLog"></div>
        <div style="display:flex;gap:8px;">
          <input id="chatMsg" type="text" style="flex:1;" />
          <button type="button" class="btn-teal" id="btnSendChat"></button>
        </div>
      </div>
    </div>
  </div>

  <script>
    var CURRENCIES = ${JSON.stringify(CURRENCIES)};
    var I18N = ${JSON.stringify(I18N)};
    var STORE_KEY = "koboledger_global_v1";

    function detectLang() {
      try {
        var nav = (navigator.language || "en").toLowerCase().slice(0, 2);
        return I18N[nav] ? nav : "en";
      } catch (e) {
        return "en";
      }
    }

    var data = {
      lang: detectLang(),
      currency: "NGN",
      records: [],
      cart: [],
      stock: []
    };

    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          data.lang = I18N[parsed.lang] ? parsed.lang : detectLang();
          data.currency = CURRENCIES[parsed.currency] ? parsed.currency : "NGN";
          data.records = Array.isArray(parsed.records) ? parsed.records : [];
          data.cart = Array.isArray(parsed.cart) ? parsed.cart : [];
          data.stock = Array.isArray(parsed.stock) ? parsed.stock : [];
        }
      }
    } catch (e) {}

    function t(key) {
      var pack = I18N[data.lang] || I18N.en;
      return pack[key] || I18N.en[key] || key;
    }

    function saveLocal() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
      render();
    }

    function curObj() {
      return CURRENCIES[data.currency] || CURRENCIES.NGN;
    }

    function toNGN(val) {
      return Number(val || 0) / curObj().rateFromNGN;
    }

    function fmtMoney(ngnAmount) {
      var c = curObj();
      var v = Number(ngnAmount || 0) * c.rateFromNGN;
      var noDec = { NGN: 1, XAF: 1, XOF: 1, KES: 1, CLP: 1, INR: 1, JPY: 1 };
      var dec = noDec[data.currency] ? 0 : 2;
      return c.symbol + v.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
    }

    function esc(s) {
      return String(s || "").replace(/[&<>"']/g, function(ch) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
      });
    }

    function applyLanguageChrome() {
      document.documentElement.lang = data.lang;
      document.documentElement.dir = (data.lang === "ar") ? "rtl" : "ltr";

      document.getElementById("txtSub").textContent = t("subtitle");
      document.getElementById("btnBackup").textContent = t("backup");

      document.getElementById("lblIn").textContent = t("moneyIn");
      document.getElementById("lblOut").textContent = t("moneyOut");
      document.getElementById("lblBal").textContent = t("balance");

      document.getElementById("tabBtn-record").textContent = t("tabRecord");
      document.getElementById("tabBtn-cart").textContent = t("tabCart");
      document.getElementById("tabBtn-stock").textContent = t("tabStock");
      document.getElementById("tabBtn-help").textContent = t("tabHelp");

      document.getElementById("lblRecordTitle").textContent = t("recordTitle");
      document.getElementById("lblKind").textContent = t("kind");
      document.getElementById("optIn").textContent = t("inOpt");
      document.getElementById("optOut").textContent = t("outOpt");
      document.getElementById("optDebt").textContent = t("debtOpt");
      document.getElementById("lblAmount").textContent = t("amount");
      document.getElementById("lblNote").textContent = t("note");
      document.getElementById("btnAddRecord").textContent = t("recordNow");

      document.getElementById("lblListTitle").textContent = t("listTitle");
      document.getElementById("thDate").textContent = t("date");
      document.getElementById("thKind").textContent = t("kind");
      document.getElementById("thDetails").textContent = t("details");
      document.getElementById("thAmount").textContent = t("amount");
      document.getElementById("thAction").textContent = t("action");

      document.getElementById("lblCartTitle").textContent = t("cartTitle");
      document.getElementById("cartName").placeholder = t("itemName");
      document.getElementById("cartQty").placeholder = t("qty");
      document.getElementById("cartPrice").placeholder = t("price");
      document.getElementById("btnAddCart").textContent = t("addItem");
      document.getElementById("thCartItem").textContent = t("itemName");
      document.getElementById("thCartQty").textContent = t("qty");
      document.getElementById("thCartPrice").textContent = t("price");
      document.getElementById("thCartTotal").textContent = t("total");
      document.getElementById("thCartDel").textContent = t("action");
      document.getElementById("lblCartTotal").textContent = t("cartTotal");
      document.getElementById("btnClearCart").textContent = t("clear");
      document.getElementById("btnCheckout").textContent = t("saveCartSale");

      document.getElementById("lblStockTitle").textContent = t("stockTitle");
      document.getElementById("stkName").placeholder = t("itemName");
      document.getElementById("stkPrice").placeholder = t("price");
      document.getElementById("stkQty").placeholder = t("inHand");
      document.getElementById("stkLow").placeholder = t("low");
      document.getElementById("btnSaveStock").textContent = t("saveItem");
      document.getElementById("thStkItem").textContent = t("itemName");
      document.getElementById("thStkPrice").textContent = t("price");
      document.getElementById("thStkHand").textContent = t("inHand");
      document.getElementById("thStkStatus").textContent = t("status");
      document.getElementById("thStkAction").textContent = t("action");

      document.getElementById("lblAssistantTitle").textContent = t("assistantTitle");
      document.getElementById("chatMsg").placeholder = t("askPlaceholder");
      document.getElementById("btnSendChat").textContent = t("send");

      var log = document.getElementById("chatLog");
      if (!log.dataset.seeded) {
        log.innerHTML = '<div class="chat-line"><span class="who-ai">' + esc(t("tabHelp")) + ':</span> ' + esc(t("assistantIntro")) + '</div>';
        log.dataset.seeded = "1";
      }
    }

    function showTab(name) {
      var tabs = ["record", "cart", "stock", "help"];
      for (var i = 0; i < tabs.length; i++) {
        var k = tabs[i];
        var panel = document.getElementById("tab-" + k);
        var btn = document.getElementById("tabBtn-" + k);
        if (panel) panel.style.display = (k === name) ? "block" : "none";
        if (btn) btn.className = (k === name) ? "active" : "";
      }
    }

    document.getElementById("tabBtn-record").onclick = function() { showTab("record"); };
    document.getElementById("tabBtn-cart").onclick = function() { showTab("cart"); };
    document.getElementById("tabBtn-stock").onclick = function() { showTab("stock"); };
    document.getElementById("tabBtn-help").onclick = function() { showTab("help"); };

    document.getElementById("langPick").onchange = function(e) {
      data.lang = e.target.value;
      document.getElementById("chatLog").dataset.seeded = "";
      saveLocal();
    };

    document.getElementById("currencyPick").onchange = function(e) {
      data.currency = e.target.value;
      saveLocal();
    };

    document.getElementById("btnAddRecord").onclick = function() {
      var type = document.getElementById("recType").value;
      var amt = parseFloat(document.getElementById("recAmount").value);
      var note = document.getElementById("recNote").value.trim();
      if (isNaN(amt) || amt <= 0) {
        alert(t("enterAmount"));
        return;
      }
      data.records.unshift({
        id: "r_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
        date: new Date().toLocaleDateString(),
        type: type,
        note: note || "-",
        amountNGN: toNGN(amt)
      });
      document.getElementById("recAmount").value = "";
      document.getElementById("recNote").value = "";
      saveLocal();
    };

    window.delRecord = function(id) {
      data.records = data.records.filter(function(r) { return r.id !== id; });
      saveLocal();
    };

    document.getElementById("btnAddCart").onclick = function() {
      var name = document.getElementById("cartName").value.trim();
      var qty = parseInt(document.getElementById("cartQty").value, 10);
      var price = parseFloat(document.getElementById("cartPrice").value);
      if (!name || isNaN(qty) || qty < 1 || isNaN(price) || price <= 0) {
        alert(t("enterItem"));
        return;
      }
      data.cart.push({ name: name, qty: qty, priceNGN: toNGN(price) });
      document.getElementById("cartName").value = "";
      document.getElementById("cartQty").value = "1";
      document.getElementById("cartPrice").value = "";
      saveLocal();
    };

    window.delCart = function(idx) {
      data.cart.splice(idx, 1);
      saveLocal();
    };

    document.getElementById("btnClearCart").onclick = function() {
      data.cart = [];
      saveLocal();
    };

    document.getElementById("btnCheckout").onclick = function() {
      if (!data.cart.length) return;
      var totalNGN = 0;
      var names = [];
      for (var i = 0; i < data.cart.length; i++) {
        var item = data.cart[i];
        totalNGN += item.priceNGN * item.qty;
        names.push(item.name + " x" + item.qty);
        for (var j = 0; j < data.stock.length; j++) {
          if (data.stock[j].name.toLowerCase() === item.name.toLowerCase()) {
            data.stock[j].qty = Math.max(0, data.stock[j].qty - item.qty);
          }
        }
      }
      data.records.unshift({
        id: "r_" + Date.now(),
        date: new Date().toLocaleDateString(),
        type: "in",
        note: names.join(", "),
        amountNGN: totalNGN
      });
      data.cart = [];
      saveLocal();
      showTab("record");
    };

    document.getElementById("btnSaveStock").onclick = function() {
      var name = document.getElementById("stkName").value.trim();
      var price = parseFloat(document.getElementById("stkPrice").value);
      var qty = parseInt(document.getElementById("stkQty").value, 10);
      var low = parseInt(document.getElementById("stkLow").value, 10);
      if (!name || isNaN(price) || price <= 0 || isNaN(qty) || qty < 0) {
        alert(t("enterStock"));
        return;
      }
      data.stock.push({
        id: "s_" + Date.now(),
        name: name,
        priceNGN: toNGN(price),
        qty: qty,
        low: isNaN(low) ? 2 : low
      });
      document.getElementById("stkName").value = "";
      document.getElementById("stkPrice").value = "";
      document.getElementById("stkQty").value = "5";
      saveLocal();
    };

    window.addOneStock = function(id) {
      for (var i = 0; i < data.stock.length; i++) {
        if (data.stock[i].id === id) data.stock[i].qty += 1;
      }
      saveLocal();
    };

    window.delStock = function(id) {
      data.stock = data.stock.filter(function(s) { return s.id !== id; });
      saveLocal();
    };

    document.getElementById("btnBackup").onclick = function() {
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "koboledger-backup.json";
      a.click();
      URL.revokeObjectURL(url);
    };

    document.getElementById("btnSendChat").onclick = function() {
      var inp = document.getElementById("chatMsg");
      var q = inp.value.trim();
      if (!q) return;
      var log = document.getElementById("chatLog");

      var moneyIn = 0;
      var moneyOut = 0;
      for (var i = 0; i < data.records.length; i++) {
        if (data.records[i].type === "in") moneyIn += data.records[i].amountNGN;
        if (data.records[i].type === "out") moneyOut += data.records[i].amountNGN;
      }
      var lowItems = [];
      for (var j = 0; j < data.stock.length; j++) {
        if (data.stock[j].qty <= data.stock[j].low) {
          lowItems.push(data.stock[j].name + " (" + data.stock[j].qty + ")");
        }
      }

      var reply = t("moneyIn") + ": " + fmtMoney(moneyIn) + " | " +
        t("moneyOut") + ": " + fmtMoney(moneyOut) + " | " +
        t("balance") + ": " + fmtMoney(moneyIn - moneyOut);
      if (lowItems.length) {
        reply += " | " + t("low") + " " + t("stockTitle") + ": " + lowItems.join(", ");
      }

      log.innerHTML += '<div class="chat-line"><span class="who-user">' + esc(q) + '</span></div>';
      log.innerHTML += '<div class="chat-line"><span class="who-ai">' + esc(t("tabHelp")) + ':</span> ' + esc(reply) + '</div>';
      inp.value = "";
      log.scrollTop = log.scrollHeight;
    };

    function render() {
      document.getElementById("langPick").value = data.lang;
      document.getElementById("currencyPick").value = data.currency;
      applyLanguageChrome();

      var totalIn = 0;
      var totalOut = 0;
      var recHtml = "";
      for (var i = 0; i < data.records.length; i++) {
        var r = data.records[i];
        if (r.type === "in") totalIn += r.amountNGN;
        if (r.type === "out") totalOut += r.amountNGN;
        var kindTxt = r.type === "in" ? t("moneyIn") : (r.type === "out" ? t("moneyOut") : t("debtOpt"));
        recHtml += "<tr>" +
          "<td>" + esc(r.date) + "</td>" +
          "<td>" + esc(kindTxt) + "</td>" +
          "<td>" + esc(r.note) + "</td>" +
          "<td>" + fmtMoney(r.amountNGN) + "</td>" +
          '<td><button type="button" class="btn-red" onclick="delRecord(\'' + r.id + '\')">X</button></td>' +
          "</tr>";
      }
      document.getElementById("recList").innerHTML = recHtml || '<tr><td colspan="5" class="empty">' + esc(t("emptyRec")) + '</td></tr>';
      document.getElementById("sumIn").textContent = fmtMoney(totalIn);
      document.getElementById("sumOut").textContent = fmtMoney(totalOut);
      document.getElementById("sumBal").textContent = fmtMoney(totalIn - totalOut);

      var cartHtml = "";
      var cartSum = 0;
      for (var c = 0; c < data.cart.length; c++) {
        var ci = data.cart[c];
        var sub = ci.priceNGN * ci.qty;
        cartSum += sub;
        cartHtml += "<tr>" +
          "<td>" + esc(ci.name) + "</td>" +
          "<td>" + ci.qty + "</td>" +
          "<td>" + fmtMoney(ci.priceNGN) + "</td>" +
          "<td>" + fmtMoney(sub) + "</td>" +
          '<td><button type="button" class="btn-red" onclick="delCart(' + c + ')">X</button></td>' +
          "</tr>";
      }
      document.getElementById("cartList").innerHTML = cartHtml || '<tr><td colspan="5" class="empty">' + esc(t("emptyCart")) + '</td></tr>';
      document.getElementById("cartTotal").textContent = fmtMoney(cartSum);

      var stkHtml = "";
      for (var s = 0; s < data.stock.length; s++) {
        var st = data.stock[s];
        var isLow = st.qty <= st.low;
        stkHtml += "<tr>" +
          "<td>" + esc(st.name) + "</td>" +
          "<td>" + fmtMoney(st.priceNGN) + "</td>" +
          "<td>" + st.qty + "</td>" +
          '<td class="' + (isLow ? "low" : "ok") + '">' + esc(isLow ? t("low") : t("ok")) + "</td>" +
          '<td><button type="button" class="btn-teal" onclick="addOneStock(\'' + st.id + '\')">+1</button> ' +
          '<button type="button" class="btn-red" onclick="delStock(\'' + st.id + '\')">X</button></td>' +
          "</tr>";
      }
      document.getElementById("stkList").innerHTML = stkHtml || '<tr><td colspan="5" class="empty">' + esc(t("emptyStock")) + '</td></tr>';
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(function() {});
    }

    render();
  </script>
</body>
</html>`;

export default {
  async fetch(request) {
    var url = new URL(request.url);
    if (url.pathname === "/manifest.json") {
      return new Response(JSON.stringify(MANIFEST_JSON, null, 2), {
        headers: { "Content-Type": "application/manifest+json; charset=utf-8" }
      });
    }
    if (url.pathname === "/sw.js") {
      return new Response(SERVICE_WORKER_JS, {
        headers: { "Content-Type": "application/javascript; charset=utf-8" }
      });
    }
    if (url.pathname === "/icon-192.png") {
      return new Response(makeSvgIcon(192), {
        headers: { "Content-Type": "image/svg+xml; charset=utf-8" }
      });
    }
    if (url.pathname === "/icon-512.png") {
      return new Response(makeSvgIcon(512), {
        headers: { "Content-Type": "image/svg+xml; charset=utf-8" }
      });
    }
    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, app: "koboledger-global" });
    }
    return new Response(INDEX_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
