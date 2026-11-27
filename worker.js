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
  NGN: { code: "NGN", symbol: "NGN ", rateFromNGN: 1 },
  USD: { code: "USD", symbol: "$", rateFromNGN: 1 / 1600 },
  EUR: { code: "EUR", symbol: "EUR ", rateFromNGN: 1 / 1730 },
  GBP: { code: "GBP", symbol: "GBP ", rateFromNGN: 1 / 2030 },
  XAF: { code: "XAF", symbol: "FCFA ", rateFromNGN: 615 / 1730 },
  XOF: { code: "XOF", symbol: "CFA ", rateFromNGN: 615 / 1730 },
  KES: { code: "KES", symbol: "KSh ", rateFromNGN: 130 / 1600 },
  GHS: { code: "GHS", symbol: "GHS ", rateFromNGN: 15.5 / 1600 },
  ZAR: { code: "ZAR", symbol: "R", rateFromNGN: 18 / 1600 },
  CLP: { code: "CLP", symbol: "$", rateFromNGN: 960 / 1600 },
  BRL: { code: "BRL", symbol: "R$", rateFromNGN: 5.7 / 1600 },
  INR: { code: "INR", symbol: "INR ", rateFromNGN: 84 / 1600 },
  CNY: { code: "CNY", symbol: "CNY ", rateFromNGN: 7.2 / 1600 },
  AED: { code: "AED", symbol: "AED ", rateFromNGN: 3.67 / 1600 }
};

const I18N = {
  en: {
    subtitle: "Simple global ledger - record entries first",
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
    subtitle: "Carnet mondial simple - enregistrez d'abord",
    backup: "Sauvegarder",
    moneyIn: "Entrees",
    moneyOut: "Sorties",
    balance: "Solde",
    tabRecord: "Enregistrer",
    tabCart: "Panier",
    tabStock: "Stock",
    tabHelp: "Assistant",
    recordTitle: "Nouvelle entree",
    kind: "Type",
    inOpt: "Entree d'argent (Vente / Recu)",
    outOpt: "Sortie d'argent (Depense / Achat)",
    debtOpt: "Dette / Credit",
    amount: "Montant",
    note: "Motif / Nom",
    recordNow: "Enregistrer",
    listTitle: "Entrees enregistrees",
    date: "Date",
    details: "Details",
    action: "Action",
    emptyRec: "Aucune entree pour l'instant.",
    cartTitle: "Panier",
    itemName: "Nom de l'article",
    qty: "Qte",
    price: "Prix",
    addItem: "Ajouter",
    total: "Total",
    cartTotal: "Total panier",
    clear: "Vider",
    saveCartSale: "Valider la vente",
    emptyCart: "Le panier est vide.",
    stockTitle: "Stock",
    inHand: "En stock",
    status: "Etat",
    saveItem: "Enregistrer l'article",
    emptyStock: "Aucun article ajoute.",
    low: "Faible",
    ok: "OK",
    assistantTitle: "Assistant",
    assistantIntro: "Posez une question sur le solde, le stock faible ou le resume.",
    askPlaceholder: "Solde, stock faible ou resume...",
    send: "Envoyer",
    enterAmount: "Entrez un montant valide.",
    enterItem: "Entrez le nom, la quantite et le prix.",
    enterStock: "Entrez le nom, le prix et la quantite."
  },
  es: {
    subtitle: "Registro global simple - anota primero",
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
    debtOpt: "Deuda / Credito",
    amount: "Monto",
    note: "Detalle / Nombre",
    recordNow: "Guardar ahora",
    listTitle: "Movimientos guardados",
    date: "Fecha",
    details: "Detalles",
    action: "Accion",
    emptyRec: "Sin registros todavia.",
    cartTitle: "Carrito",
    itemName: "Nombre del producto",
    qty: "Cant.",
    price: "Precio",
    addItem: "Agregar",
    total: "Total",
    cartTotal: "Total carrito",
    clear: "Limpiar",
    saveCartSale: "Guardar carrito como venta",
    emptyCart: "El carrito esta vacio.",
    stockTitle: "Inventario",
    inHand: "Disponible",
    status: "Estado",
    saveItem: "Guardar producto",
    emptyStock: "Sin productos todavia.",
    low: "Bajo",
    ok: "Bien",
    assistantTitle: "Asistente",
    assistantIntro: "Pregunta por tu saldo, stock bajo o resumen.",
    askPlaceholder: "Saldo, stock bajo o resumen...",
    send: "Enviar",
    enterAmount: "Ingresa un monto valido.",
    enterItem: "Ingresa nombre, cantidad y precio.",
    enterStock: "Ingresa nombre, precio y cantidad."
  },
  pt: {
    subtitle: "Livro global simples - registre primeiro",
    backup: "Backup",
    moneyIn: "Entradas",
    moneyOut: "Saidas",
    balance: "Saldo",
    tabRecord: "Registrar",
    tabCart: "Carrinho",
    tabStock: "Estoque",
    tabHelp: "Assistente",
    recordTitle: "Registrar lancamento",
    kind: "Tipo",
    inOpt: "Entrada (Venda / Recebido)",
    outOpt: "Saida (Despesa / Compra)",
    debtOpt: "Divida / Fiado",
    amount: "Valor",
    note: "Descricao / Nome",
    recordNow: "Registrar agora",
    listTitle: "Lancamentos",
    date: "Data",
    details: "Detalhes",
    action: "Acao",
    emptyRec: "Nada registrado ainda.",
    cartTitle: "Carrinho",
    itemName: "Nome do item",
    qty: "Qtd",
    price: "Preco",
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
    enterAmount: "Digite um valor valido.",
    enterItem: "Digite nome, quantidade e preco.",
    enterStock: "Digite nome, preco e estoque."
  },
  sw: {
    subtitle: "Daftari rahisi ya kimataifa - rekodi kwanza",
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
    subtitle: "Littafin lissafi na duniya - fara rubutawa",
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
  }
};

const SERVICE_WORKER_JS = [
  'const CACHE_NAME = "koboledger-global-v2";',
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
].join("\\n");

function makeSvgIcon(size) {
  var rx = Math.round(size * 0.22);
  var half = size * 0.5;
  var rad = size * 0.31;
  var sw = Math.max(4, Math.round(size * 0.04));
  var fs = Math.round(size * 0.34);
  return '<?xml version="1.0" encoding="UTF-8"?>\\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">\\n' +
    '  <rect width="' + size + '" height="' + size + '" rx="' + rx + '" fill="#0f766e"/>\\n' +
    '  <circle cx="' + half + '" cy="' + half + '" r="' + rad + '" fill="none" stroke="#99f6e4" stroke-width="' + sw + '"/>\\n' +
    '  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-weight="800" font-size="' + fs + '">K</text>\\n' +
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
        <div class="sub" id="txtSub">Simple global ledger - record entries first</div>
      </div>
      <div class="controls">
        <select id="langPick" aria-label="Language">
          <option value="en">English</option>
          <option value="fr">Francais</option>
          <option value="es">Espanol</option>
          <option value="pt">Portugues</option>
          <option value="sw">Kiswahili</option>
          <option value="ha">Hausa</option>
        </select>
        <select id="currencyPick" aria-label="Currency">
          <option value="NGN">NGN</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="XAF">XAF (FCFA)</option>
          <option value="XOF">XOF (CFA)</option>
          <option value="KES">KES</option>
          <option value="GHS">GHS</option>
          <option value="ZAR">ZAR (R)</option>
          <option value="CLP">CLP ($)</option>
          <option value="BRL">BRL (R$)</option>
          <option value="INR">INR</option>
          <option value="CNY">CNY</option>
          <option value="AED">AED</option>
        </select>
        <button type="button" class="btn-dark" id="btnBackup">Save Backup</button>
      </div>
    </div>

    <div class="summary">
      <div class="box"><small id="lblIn">Money In</small><strong id="sumIn" style="color:#4ade80;">0</strong></div>
      <div class="box"><small id="lblOut">Money Out</small><strong id="sumOut" style="color:#f87171;">0</strong></div>
      <div class="box"><small id="lblBal">Balance</small><strong id="sumBal">0</strong></div>
    </div>

    <div class="nav">
      <button type="button" id="tabBtn-record" class="active">Record</button>
      <button type="button" id="tabBtn-cart">Cart</button>
      <button type="button" id="tabBtn-stock">Stock</button>
      <button type="button" id="tabBtn-help">Assistant</button>
    </div>

    <div id="tab-record">
      <div class="card">
        <h2 id="lblRecordTitle">Record Entry</h2>
        <div class="row">
          <div>
            <small id="lblKind" style="display:block;color:#94a3b8;margin-bottom:4px;">Kind</small>
            <select id="recType" style="width:100%;">
              <option value="in" id="optIn">Money In (Sale / Received)</option>
              <option value="out" id="optOut">Money Out (Expense / Bought)</option>
              <option value="debt" id="optDebt">Owing / Credit</option>
            </select>
          </div>
          <div>
            <small id="lblAmount" style="display:block;color:#94a3b8;margin-bottom:4px;">Amount</small>
            <input id="recAmount" type="number" step="0.01" placeholder="5000" style="width:100%;" />
          </div>
          <div>
            <small id="lblNote" style="display:block;color:#94a3b8;margin-bottom:4px;">What For / Name</small>
            <input id="recNote" type="text" placeholder="e.g. Rice, transport, Musa" style="width:100%;" />
          </div>
        </div>
        <button type="button" class="btn-green" id="btnAddRecord" style="width:100%;">Record Now</button>
      </div>

      <div class="card">
        <h2 id="lblListTitle">Recorded Entries</h2>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="thDate">Date</th>
                <th id="thKind">Kind</th>
                <th id="thDetails">Details</th>
                <th id="thAmount">Amount</th>
                <th id="thAction">Action</th>
              </tr>
            </thead>
            <tbody id="recList"></tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="tab-cart" style="display:none;">
      <div class="card">
        <h2 id="lblCartTitle">Cart</h2>
        <div class="row">
          <input id="cartName" type="text" placeholder="Item name" />
          <input id="cartQty" type="number" min="1" value="1" placeholder="Qty" />
          <input id="cartPrice" type="number" step="0.01" placeholder="Price" />
          <button type="button" class="btn-teal" id="btnAddCart">Add Item</button>
        </div>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="thCartItem">Item name</th>
                <th id="thCartQty">Qty</th>
                <th id="thCartPrice">Price</th>
                <th id="thCartTotal">Total</th>
                <th id="thCartDel">Action</th>
              </tr>
            </thead>
            <tbody id="cartList"></tbody>
          </table>
        </div>
        <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <strong><span id="lblCartTotal">Cart Total</span>: <span id="cartTotal">0</span></strong>
          <div style="display:flex;gap:8px;">
            <button type="button" class="btn-dark" id="btnClearCart">Clear</button>
            <button type="button" class="btn-green" id="btnCheckout">Save Cart as Sale</button>
          </div>
        </div>
      </div>
    </div>

    <div id="tab-stock" style="display:none;">
      <div class="card">
        <h2 id="lblStockTitle">Stock</h2>
        <div class="row">
          <input id="stkName" type="text" placeholder="Item name" />
          <input id="stkPrice" type="number" step="0.01" placeholder="Price" />
          <input id="stkQty" type="number" min="0" value="5" placeholder="In Hand" />
          <input id="stkLow" type="number" min="0" value="2" placeholder="Low" />
          <button type="button" class="btn-teal" id="btnSaveStock">Save Item</button>
        </div>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="thStkItem">Item name</th>
                <th id="thStkPrice">Price</th>
                <th id="thStkHand">In Hand</th>
                <th id="thStkStatus">Status</th>
                <th id="thStkAction">Action</th>
              </tr>
            </thead>
            <tbody id="stkList"></tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="tab-help" style="display:none;">
      <div class="card">
        <h2 id="lblAssistantTitle">Assistant</h2>
        <div class="chat-log" id="chatLog">
          <div class="chat-line"><span class="who-ai">Assistant:</span> Ask about your balance, low stock, or summary.</div>
        </div>
        <div style="display:flex;gap:8px;">
          <input id="chatMsg" type="text" placeholder="Ask about balance, stock, or summary..." style="flex:1;" />
          <button type="button" class="btn-teal" id="btnSendChat">Send</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    var CURRENCIES = ${JSON.stringify(CURRENCIES)};
    var I18N = ${JSON.stringify(I18N)};
    var STORE_KEY = "koboledger_global_v2";

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
      var noDec = { NGN: 1, XAF: 1, XOF: 1, KES: 1, CLP: 1, INR: 1 };
      var dec = noDec[data.currency] ? 0 : 2;
      return c.symbol + v.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
    }

    function esc(s) {
      return String(s || "").replace(/[&<>"']/g, function(ch) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
      });
    }

    function setText(id, val) {
      var el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    function applyLanguageChrome() {
      document.documentElement.lang = data.lang;
      setText("txtSub", t("subtitle"));
      setText("btnBackup", t("backup"));

      setText("lblIn", t("moneyIn"));
      setText("lblOut", t("moneyOut"));
      setText("lblBal", t("balance"));

      setText("tabBtn-record", t("tabRecord"));
      setText("tabBtn-cart", t("tabCart"));
      setText("tabBtn-stock", t("tabStock"));
      setText("tabBtn-help", t("tabHelp"));

      setText("lblRecordTitle", t("recordTitle"));
      setText("lblKind", t("kind"));
      setText("optIn", t("inOpt"));
      setText("optOut", t("outOpt"));
      setText("optDebt", t("debtOpt"));
      setText("lblAmount", t("amount"));
      setText("lblNote", t("note"));
      setText("btnAddRecord", t("recordNow"));

      setText("lblListTitle", t("listTitle"));
      setText("thDate", t("date"));
      setText("thKind", t("kind"));
      setText("thDetails", t("details"));
      setText("thAmount", t("amount"));
      setText("thAction", t("action"));

      setText("lblCartTitle", t("cartTitle"));
      var cartNameEl = document.getElementById("cartName");
      var cartQtyEl = document.getElementById("cartQty");
      var cartPriceEl = document.getElementById("cartPrice");
      if (cartNameEl) cartNameEl.placeholder = t("itemName");
      if (cartQtyEl) cartQtyEl.placeholder = t("qty");
      if (cartPriceEl) cartPriceEl.placeholder = t("price");
      setText("btnAddCart", t("addItem"));
      setText("thCartItem", t("itemName"));
      setText("thCartQty", t("qty"));
      setText("thCartPrice", t("price"));
      setText("thCartTotal", t("total"));
      setText("thCartDel", t("action"));
      setText("lblCartTotal", t("cartTotal"));
      setText("btnClearCart", t("clear"));
      setText("btnCheckout", t("saveCartSale"));

      setText("lblStockTitle", t("stockTitle"));
      var stkNameEl = document.getElementById("stkName");
      var stkPriceEl = document.getElementById("stkPrice");
      var stkQtyEl = document.getElementById("stkQty");
      var stkLowEl = document.getElementById("stkLow");
      if (stkNameEl) stkNameEl.placeholder = t("itemName");
      if (stkPriceEl) stkPriceEl.placeholder = t("price");
      if (stkQtyEl) stkQtyEl.placeholder = t("inHand");
      if (stkLowEl) stkLowEl.placeholder = t("low");
      setText("btnSaveStock", t("saveItem"));
      setText("thStkItem", t("itemName"));
      setText("thStkPrice", t("price"));
      setText("thStkHand", t("inHand"));
      setText("thStkStatus", t("status"));
      setText("thStkAction", t("action"));

      setText("lblAssistantTitle", t("assistantTitle"));
      var chatMsgEl = document.getElementById("chatMsg");
      if (chatMsgEl) chatMsgEl.placeholder = t("askPlaceholder");
      setText("btnSendChat", t("send"));
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
      setText("sumIn", fmtMoney(totalIn));
      setText("sumOut", fmtMoney(totalOut));
      setText("sumBal", fmtMoney(totalIn - totalOut));
      var recListEl = document.getElementById("recList");
      if (recListEl) {
        recListEl.innerHTML = recHtml || '<tr><td colspan="5" class="empty">' + esc(t("emptyRec")) + '</td></tr>';
      }

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
      var cartListEl = document.getElementById("cartList");
      if (cartListEl) {
        cartListEl.innerHTML = cartHtml || '<tr><td colspan="5" class="empty">' + esc(t("emptyCart")) + '</td></tr>';
      }
      setText("cartTotal", fmtMoney(cartSum));

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
      var stkListEl = document.getElementById("stkList");
      if (stkListEl) {
        stkListEl.innerHTML = stkHtml || '<tr><td colspan="5" class="empty">' + esc(t("emptyStock")) + '</td></tr>';
      }
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
      return Response.json({ ok: true, app: "koboledger-global-v2" });
    }
    return new Response(INDEX_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};     
