 const MANIFEST_JSON = {
  name: "KoboLedger",
  short_name: "KoboLedger",
  description: "Global business ledger, inventory, sales, debt tracker & AI.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#f3f4f6",
  theme_color: "#0f8a4b",
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
  GHS: { code: "GHS", symbol: "GHS ", rateFromNGN: 15.5 / 1600 },
  ZAR: { code: "ZAR", symbol: "R", rateFromNGN: 18 / 1600 },
  CLP: { code: "CLP", symbol: "$", rateFromNGN: 960 / 1600 },
  BRL: { code: "BRL", symbol: "R$", rateFromNGN: 5.7 / 1600 },
  INR: { code: "INR", symbol: "INR ", rateFromNGN: 84 / 1600 },
  CNY: { code: "CNY", symbol: "CNY ", rateFromNGN: 7.2 / 1600 },
  AED: { code: "AED", symbol: "AED ", rateFromNGN: 3.67 / 1600 }
};

const SERVICE_WORKER_JS = [
  'const CACHE_NAME = "koboledger-ui-v1";',
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
    '  <rect width="' + size + '" height="' + size + '" rx="' + rx + '" fill="#0f8a4b"/>\\n' +
    '  <circle cx="' + half + '" cy="' + half + '" r="' + rad + '" fill="none" stroke="#ffffff" stroke-width="' + sw + '"/>\\n' +
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
  <meta name="theme-color" content="#0f8a4b" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f3f4f6;
      color: #111827;
      padding-bottom: 90px;
    }
    .header {
      background: #0f8a4b;
      color: #ffffff;
      padding: 16px 16px 14px;
      text-align: center;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.01em;
    }
    .header-sub {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .header-sub select, .header-sub button {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 8px;
      padding: 5px 9px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .header-sub select option {
      color: #111827;
      background: #ffffff;
    }
    .tabs {
      display: flex;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tabs::-webkit-scrollbar { display: none; }
    .tab-btn {
      flex: 0 0 auto;
      padding: 14px 18px;
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      font-size: 15px;
      font-weight: 700;
      color: #4b5563;
      cursor: pointer;
      white-space: nowrap;
    }
    .tab-btn.active {
      color: #0f8a4b;
      border-bottom-color: #0f8a4b;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
      padding: 18px 16px;
    }
    .section-title {
      font-size: 21px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 14px;
    }
    .overview-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 22px;
    }
    .stat-box {
      background: #ffffff;
      border-radius: 14px;
      padding: 20px 14px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
    }
    .stat-label {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 10px;
      font-weight: 500;
    }
    .stat-num {
      font-size: 24px;
      font-weight: 800;
    }
    .c-green { color: #0f8a4b; }
    .c-red { color: #ef4444; }
    .c-amber { color: #f59e0b; }
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 22px;
    }
    .btn-green {
      background: #0f8a4b;
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 15px 14px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
    }
    .btn-green:active { opacity: 0.9; }
    .btn-outline {
      background: #ffffff;
      color: #111827;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-danger {
      background: #fee2e2;
      color: #b91c1c;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .card {
      background: #ffffff;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
    }
    .card h3 {
      font-size: 17px;
      font-weight: 800;
      margin-bottom: 12px;
      color: #111827;
    }
    .muted {
      color: #4b5563;
      font-size: 15px;
    }
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-bottom: 12px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: #4b5563;
      margin-bottom: 4px;
    }
    input, select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 15px;
      color: #111827;
      background: #ffffff;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }
    th, td {
      text-align: left;
      padding: 10px 6px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
    }
    th {
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
    }
    .fab {
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f59e0b;
      color: #ffffff;
      border: none;
      font-size: 32px;
      line-height: 1;
      font-weight: 700;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
      cursor: pointer;
      z-index: 30;
    }
    .chat-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 12px;
      min-height: 120px;
      max-height: 280px;
      overflow-y: auto;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .chat-msg { margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>KoboLedger</h1>
    <div class="header-sub">
      <select id="langSelect" aria-label="Language" onchange="setLang(this.value)">
        <option value="en">English</option>
        <option value="fr">Francais</option>
        <option value="es">Espanol</option>
        <option value="pt">Portugues</option>
        <option value="sw">Kiswahili</option>
        <option value="ha">Hausa</option>
        <option value="yo">Yoruba</option>
        <option value="ig">Igbo</option>
      </select>
      <select id="curSelect" aria-label="Currency" onchange="setCur(this.value)">
        <option value="NGN">NGN (₦)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
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
      <button type="button" id="btnExport" onclick="exportData()">Backup</button>
    </div>
  </div>

  <div class="tabs">
    <button type="button" class="tab-btn active" id="tabBtn-dashboard" onclick="openTab('dashboard')">Dashboard</button>
    <button type="button" class="tab-btn" id="tabBtn-inventory" onclick="openTab('inventory')">Inventory</button>
    <button type="button" class="tab-btn" id="tabBtn-sale" onclick="openTab('sale')">New Sale</button>
    <button type="button" class="tab-btn" id="tabBtn-debt" onclick="openTab('debt')">Debt Tracker</button>
    <button type="button" class="tab-btn" id="tabBtn-ai" onclick="openTab('ai')">AI</button>
  </div>

  <div class="container">
    <!-- DASHBOARD -->
    <div id="view-dashboard">
      <div class="section-title" id="t-overview">Business Overview</div>

      <div class="overview-grid">
        <div class="stat-box">
          <div class="stat-label" id="t-salesToday">Total Sales (Today)</div>
          <div class="stat-num c-green" id="valSalesToday">₦0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label" id="t-estProfit">Estimated Profit</div>
          <div class="stat-num c-green" id="valProfit">₦0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label" id="t-debtOwed">Total Debt Owed</div>
          <div class="stat-num c-red" id="valDebt">₦0</div>
        </div>
        <div class="stat-box">
          <div class="stat-label" id="t-lowCount">Low Stock Items</div>
          <div class="stat-num c-amber" id="valLowCount">0</div>
        </div>
      </div>

      <div class="section-title" id="t-quickActions">Quick Actions</div>
      <div class="quick-grid">
        <button type="button" class="btn-green" id="btnQuickSale" onclick="openTab('sale')">+ Record Sale</button>
        <button type="button" class="btn-green" id="btnQuickStock" onclick="openTab('inventory')">Manage Stock</button>
      </div>

      <div class="section-title" id="t-lowAlerts">Low Stock Alerts</div>
      <div id="lowAlertsBox" class="muted">All stock levels are optimal.</div>

      <div class="card" style="margin-top:18px;">
        <h3 id="t-recentTx">Recent Entries</h3>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="th-date">Date</th>
                <th id="th-type">Type</th>
                <th id="th-note">Note</th>
                <th id="th-amt">Amount</th>
                <th id="th-act">Action</th>
              </tr>
            </thead>
            <tbody id="recentTxBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- INVENTORY -->
    <div id="view-inventory" style="display:none;">
      <div class="section-title" id="t-invTitle">Inventory</div>
      <div class="card">
        <h3 id="t-addStock">Add Stock Item</h3>
        <div class="form-row">
          <div>
            <label id="l-itemName">Item Name</label>
            <input type="text" id="invName" placeholder="e.g. Rice Bag" />
          </div>
          <div>
            <label id="l-sellPrice">Selling Price</label>
            <input type="number" step="0.01" id="invPrice" placeholder="5000" />
          </div>
          <div>
            <label id="l-costPrice">Cost Price</label>
            <input type="number" step="0.01" id="invCost" placeholder="3500" />
          </div>
          <div>
            <label id="l-qty">Stock Qty</label>
            <input type="number" min="0" id="invQty" value="10" />
          </div>
          <div>
            <label id="l-lowAt">Low Alert At</label>
            <input type="number" min="0" id="invLow" value="3" />
          </div>
        </div>
        <button type="button" class="btn-green" id="btnSaveInv" onclick="saveStock()">Save Item</button>
      </div>

      <div class="card">
        <h3 id="t-stockList">Stock Items</h3>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="th-item">Item</th>
                <th id="th-price">Price</th>
                <th id="th-qty">Qty</th>
                <th id="th-status">Status</th>
                <th id="th-sact">Action</th>
              </tr>
            </thead>
            <tbody id="invTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- NEW SALE / CART -->
    <div id="view-sale" style="display:none;">
      <div class="section-title" id="t-saleTitle">New Sale</div>
      <div class="card">
        <h3 id="t-quickRecord">Record Sale / Expense</h3>
        <div class="form-row">
          <div>
            <label id="l-entryKind">Entry Type</label>
            <select id="saleKind">
              <option value="sale" id="o-sale">Sale (+)</option>
              <option value="expense" id="o-expense">Expense (-)</option>
              <option value="debt" id="o-debt">Debt / Credit</option>
            </select>
          </div>
          <div>
            <label id="l-fromInv">From Stock (Optional)</label>
            <select id="saleInvPick" onchange="pickStockForSale(this.value)">
              <option value="">-- Custom --</option>
            </select>
          </div>
          <div>
            <label id="l-desc">Item / Customer Note</label>
            <input type="text" id="saleNote" placeholder="e.g. Customer Musa" />
          </div>
          <div>
            <label id="l-sqty">Qty</label>
            <input type="number" min="1" id="saleQty" value="1" />
          </div>
          <div>
            <label id="l-sprice">Amount / Price</label>
            <input type="number" step="0.01" id="saleAmt" placeholder="5000" />
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button type="button" class="btn-green" id="btnAddCart" onclick="addToCart()">+ Add to Cart</button>
          <button type="button" class="btn-outline" id="btnDirectSave" onclick="recordDirectEntry()">Record Directly</button>
        </div>
      </div>

      <div class="card">
        <h3 id="t-cartBox">Sale Cart</h3>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="th-citem">Item</th>
                <th id="th-cqty">Qty</th>
                <th id="th-ctot">Total</th>
                <th id="th-cdel">Remove</th>
              </tr>
            </thead>
            <tbody id="cartBody"></tbody>
          </table>
        </div>
        <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <strong style="font-size:17px;"><span id="t-totalLabel">Total</span>: <span id="cartTotalVal">₦0</span></strong>
          <button type="button" class="btn-green" id="btnCheckout" onclick="completeCartSale()">Complete Sale</button>
        </div>
      </div>
    </div>

    <!-- DEBT TRACKER -->
    <div id="view-debt" style="display:none;">
      <div class="section-title" id="t-debtTitle">Debt Tracker</div>
      <div class="card">
        <h3 id="t-addDebt">Record Debt</h3>
        <div class="form-row">
          <div>
            <label id="l-dperson">Person / Customer</label>
            <input type="text" id="debtName" placeholder="e.g. Chinedu" />
          </div>
          <div>
            <label id="l-damt">Amount Owed</label>
            <input type="number" step="0.01" id="debtAmt" placeholder="10000" />
          </div>
          <div>
            <label id="l-dnote">Note</label>
            <input type="text" id="debtNote" placeholder="e.g. Goods on credit" />
          </div>
        </div>
        <button type="button" class="btn-green" id="btnSaveDebt" onclick="addDebtEntry()">+ Save Debt</button>
      </div>

      <div class="card">
        <h3 id="t-debtList">Unpaid &amp; Settled Debts</h3>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th id="th-dperson">Person</th>
                <th id="th-dnote">Note</th>
                <th id="th-damt">Amount</th>
                <th id="th-dstat">Status</th>
                <th id="th-dact">Action</th>
              </tr>
            </thead>
            <tbody id="debtBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- AI -->
    <div id="view-ai" style="display:none;">
      <div class="section-title" id="t-aiTitle">AI Assistant</div>
      <div class="card">
        <div class="chat-box" id="aiChatBox">
          <div class="chat-msg"><strong>AI:</strong> Ask me about today's sales, estimated profit, debts owed, or low stock.</div>
        </div>
        <div style="display:flex;gap:8px;">
          <input type="text" id="aiPrompt" placeholder="Ask about sales, profit, debts, or stock..." />
          <button type="button" class="btn-green" id="btnAskAi" onclick="askAi()">Ask</button>
        </div>
      </div>
    </div>
  </div>

  <button type="button" class="fab" id="fabAdd" title="Quick Record" onclick="openTab('sale')">+</button>

  <script>
    var RATES = {
      NGN: 1,
      USD: 1 / 1600,
      EUR: 1 / 1730,
      GBP: 1 / 2030,
      XAF: 615 / 1730,
      XOF: 615 / 1730,
      KES: 130 / 1600,
      GHS: 15.5 / 1600,
      ZAR: 18 / 1600,
      CLP: 960 / 1600,
      BRL: 5.7 / 1600,
      INR: 84 / 1600,
      CNY: 7.2 / 1600,
      AED: 3.67 / 1600
    };

    var SYMBOLS = {
      NGN: "₦",
      USD: "$",
      EUR: "€",
      GBP: "£",
      XAF: "FCFA ",
      XOF: "CFA ",
      KES: "KSh ",
      GHS: "GHS ",
      ZAR: "R",
      CLP: "$",
      BRL: "R$",
      INR: "INR ",
      CNY: "CNY ",
      AED: "AED "
    };

    var LANGS = {
      en: {
        overview: "Business Overview",
        salesToday: "Total Sales (Today)",
        estProfit: "Estimated Profit",
        debtOwed: "Total Debt Owed",
        lowCount: "Low Stock Items",
        quickActions: "Quick Actions",
        recSale: "+ Record Sale",
        manageStock: "Manage Stock",
        lowAlerts: "Low Stock Alerts",
        optimal: "All stock levels are optimal.",
        tabDash: "Dashboard",
        tabInv: "Inventory",
        tabSale: "New Sale",
        tabDebt: "Debt Tracker",
        tabAi: "AI"
      },
      fr: {
        overview: "Apercu de l'activite",
        salesToday: "Ventes totales (Aujourd'hui)",
        estProfit: "Benefice estime",
        debtOwed: "Dettes dues",
        lowCount: "Stock faible",
        quickActions: "Actions rapides",
        recSale: "+ Enregistrer vente",
        manageStock: "Gerer le stock",
        lowAlerts: "Alertes stock faible",
        optimal: "Tous les niveaux de stock sont bons.",
        tabDash: "Tableau",
        tabInv: "Inventaire",
        tabSale: "Nouvelle vente",
        tabDebt: "Dettes",
        tabAi: "IA"
      },
      es: {
        overview: "Resumen del negocio",
        salesToday: "Ventas de hoy",
        estProfit: "Ganancia estimada",
        debtOwed: "Deuda pendiente",
        lowCount: "Stock bajo",
        quickActions: "Acciones rapidas",
        recSale: "+ Registrar venta",
        manageStock: "Gestionar stock",
        lowAlerts: "Alertas de stock bajo",
        optimal: "Todos los niveles de stock estan bien.",
        tabDash: "Panel",
        tabInv: "Inventario",
        tabSale: "Nueva venta",
        tabDebt: "Deudas",
        tabAi: "IA"
      },
      pt: {
        overview: "Resumo do negocio",
        salesToday: "Vendas (Hoje)",
        estProfit: "Lucro estimado",
        debtOwed: "Dividas em aberto",
        lowCount: "Estoque baixo",
        quickActions: "Acoes rapidas",
        recSale: "+ Registrar venda",
        manageStock: "Gerir estoque",
        lowAlerts: "Alertas de estoque baixo",
        optimal: "Todos os niveis de estoque estao otimos.",
        tabDash: "Painel",
        tabInv: "Estoque",
        tabSale: "Nova venda",
        tabDebt: "Dividas",
        tabAi: "IA"
      },
      sw: {
        overview: "Muhtasari wa Biashara",
        salesToday: "Mauzo Yote (Leo)",
        estProfit: "Faida Inayokadiriwa",
        debtOwed: "Madeni Yaliyobaki",
        lowCount: "Stoku Chache",
        quickActions: "Hatua za Haraka",
        recSale: "+ Rekodi Mauzo",
        manageStock: "Simamia Stoku",
        lowAlerts: "Tahadhari ya Stoku Chache",
        optimal: "Viwango vyote vya stoku viko sawa.",
        tabDash: "Dashibodi",
        tabInv: "Stoku",
        tabSale: "Mauzo Mapya",
        tabDebt: "Madeni",
        tabAi: "AI"
      },
      ha: {
        overview: "Bayani Kan Kasuwanci",
        salesToday: "Jimillar Sayarwa (Yau)",
        estProfit: "Riba Da Ake Sa Rai",
        debtOwed: "Bashin Da Ake Bi",
        lowCount: "Kaya Masu Karanci",
        quickActions: "Ayyuka Cikin Gaggawa",
        recSale: "+ Rubuta Sayarwa",
        manageStock: "Kula Da Haja",
        lowAlerts: "Fadakarwar Karancin Haja",
        optimal: "Dukkan kaya suna daidai.",
        tabDash: "Dashboard",
        tabInv: "Haja",
        tabSale: "Sabuwar Sayarwa",
        tabDebt: "Bashi",
        tabAi: "AI"
      },
      yo: {
        overview: "Akopọ Iṣowo",
        salesToday: "Àpapọ̀ Títà (Òní)",
        estProfit: "Èrè Tí A Fojú Sùn",
        debtOwed: "Gbèsè Tí Ó Kù",
        lowCount: "Ọjà Tí Ó Dín Kù",
        quickActions: "Àwọn Ìgbésẹ̀ Kíákíá",
        recSale: "+ Kọ Títà",
        manageStock: "Ṣàkóso Ọjà",
        lowAlerts: "Ìkìlọ̀ Ọjà Dídín Kù",
        optimal: "Gbogbo ọjà wà ní ìwọ̀n tó dára.",
        tabDash: "Dashboard",
        tabInv: "Ọjà",
        tabSale: "Títà Tuntun",
        tabDebt: "Gbèsè",
        tabAi: "AI"
      },
      ig: {
        overview: "Nchịkọta Azụmaahịa",
        salesToday: "Ngụkọta Ahịa (Taa)",
        estProfit: "Uru E Chepụtara",
        debtOwed: "Ụgwọ Fọdụrụ",
        lowCount: "Ngwaahịa Dị Ala",
        quickActions: "Omume Ngwa Ngwa",
        recSale: "+ Dekọọ Ahịa",
        manageStock: "Jikwaa Ngwaahịa",
        lowAlerts: "Ịdọ Aka Ná Ntị Ngwaahịa Dị Ala",
        optimal: "Ọnụọgụgụ ngwaahịa niile dị mma.",
        tabDash: "Dashboard",
        tabInv: "Ngwaahịa",
        tabSale: "Ahịa Ọhụrụ",
        tabDebt: "Ụgwọ",
        tabAi: "AI"
      }
    };

    var KEY = "koboledger_ui_v1";
    var state = {
      lang: "en",
      currency: "NGN",
      entries: [],
      inventory: [],
      cart: []
    };

    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && typeof p === "object") {
          if (LANGS[p.lang]) state.lang = p.lang;
          if (RATES[p.currency]) state.currency = p.currency;
          if (Array.isArray(p.entries)) state.entries = p.entries;
          if (Array.isArray(p.inventory)) state.inventory = p.inventory;
          if (Array.isArray(p.cart)) state.cart = p.cart;
        }
      } else {
        var navLang = (navigator.language || "en").toLowerCase().slice(0, 2);
        if (LANGS[navLang]) state.lang = navLang;
      }
    } catch (e) {}

    function tr(key) {
      var pack = LANGS[state.lang] || LANGS.en;
      return pack[key] || LANGS.en[key] || key;
    }

    function setTxt(id, txt) {
      var el = document.getElementById(id);
      if (el) el.textContent = txt;
    }

    function esc(s) {
      return String(s || "").replace(/[&<>"']/g, function(c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function fmt(ngn) {
      var rate = RATES[state.currency] || 1;
      var sym = SYMBOLS[state.currency] || (state.currency + " ");
      var val = Number(ngn || 0) * rate;
      var noDec = { NGN: 1, XAF: 1, XOF: 1, KES: 1, CLP: 1, INR: 1 };
      var dec = noDec[state.currency] ? 0 : 2;
      return sym + val.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
    }

    function toNgn(val) {
      var rate = RATES[state.currency] || 1;
      return Number(val || 0) / rate;
    }

    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      render();
    }

    function openTab(tabName) {
      var names = ["dashboard", "inventory", "sale", "debt", "ai"];
      for (var i = 0; i < names.length; i++) {
        var n = names[i];
        var view = document.getElementById("view-" + n);
        var btn = document.getElementById("tabBtn-" + n);
        if (view) view.style.display = (n === tabName) ? "block" : "none";
        if (btn) btn.className = "tab-btn" + (n === tabName ? " active" : "");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function setLang(l) {
      if (LANGS[l]) {
        state.lang = l;
        save();
      }
    }

    function setCur(c) {
      if (RATES[c]) {
        state.currency = c;
        save();
      }
    }

    function pickStockForSale(id) {
      if (!id) return;
      for (var i = 0; i < state.inventory.length; i++) {
        if (state.inventory[i].id === id) {
          var item = state.inventory[i];
          var noteEl = document.getElementById("saleNote");
          var amtEl = document.getElementById("saleAmt");
          var rate = RATES[state.currency] || 1;
          if (noteEl) noteEl.value = item.name;
          if (amtEl) amtEl.value = Number((item.priceNGN * rate).toFixed(2));
          break;
        }
      }
    }

    function recordDirectEntry() {
      try {
        var kind = document.getElementById("saleKind").value;
        var note = document.getElementById("saleNote").value.trim();
        var qty = parseInt(document.getElementById("saleQty").value, 10) || 1;
        var amt = parseFloat(document.getElementById("saleAmt").value);
        if (isNaN(amt) || amt <= 0) {
          alert("Enter a valid amount.");
          return;
        }
        var totalNGN = toNgn(amt) * qty;
        var costNGN = totalNGN * 0.7;
        for (var i = 0; i < state.inventory.length; i++) {
          if (note && state.inventory[i].name.toLowerCase() === note.toLowerCase()) {
            costNGN = state.inventory[i].costNGN * qty;
            if (kind === "sale") {
              state.inventory[i].qty = Math.max(0, state.inventory[i].qty - qty);
            }
            break;
          }
        }
        state.entries.unshift({
          id: "e_" + Date.now() + "_" + Math.floor(Math.random() * 9999),
          date: new Date().toISOString().slice(0, 10),
          type: kind,
          party: note || (kind === "sale" ? "Sale" : (kind === "expense" ? "Expense" : "Debt")),
          amountNGN: totalNGN,
          costNGN: costNGN,
          status: kind === "debt" ? "unpaid" : "paid"
        });
        document.getElementById("saleNote").value = "";
        document.getElementById("saleAmt").value = "";
        document.getElementById("saleQty").value = "1";
        save();
        openTab("dashboard");
      } catch (e) {
        alert("Error saving entry: " + e.message);
      }
    }

    function addToCart() {
      try {
        var note = document.getElementById("saleNote").value.trim();
        var qty = parseInt(document.getElementById("saleQty").value, 10) || 1;
        var amt = parseFloat(document.getElementById("saleAmt").value);
        if (!note || isNaN(amt) || amt <= 0) {
          alert("Enter item name and price.");
          return;
        }
        state.cart.push({
          name: note,
          qty: qty,
          priceNGN: toNgn(amt)
        });
        document.getElementById("saleNote").value = "";
        document.getElementById("saleAmt").value = "";
        document.getElementById("saleQty").value = "1";
        save();
      } catch (e) {
        alert("Error adding to cart: " + e.message);
      }
    }

    function delCart(idx) {
      state.cart.splice(idx, 1);
      save();
    }

    function completeCartSale() {
      if (!state.cart.length) return;
      var totalNGN = 0;
      var names = [];
      for (var i = 0; i < state.cart.length; i++) {
        var it = state.cart[i];
        totalNGN += it.priceNGN * it.qty;
        names.push(it.name + " x" + it.qty);
        for (var j = 0; j < state.inventory.length; j++) {
          if (state.inventory[j].name.toLowerCase() === it.name.toLowerCase()) {
            state.inventory[j].qty = Math.max(0, state.inventory[j].qty - it.qty);
          }
        }
      }
      state.entries.unshift({
        id: "e_" + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        type: "sale",
        party: names.join(", "),
        amountNGN: totalNGN,
        costNGN: totalNGN * 0.7,
        status: "paid"
      });
      state.cart = [];
      save();
      openTab("dashboard");
    }

    function saveStock() {
      try {
        var name = document.getElementById("invName").value.trim();
        var price = parseFloat(document.getElementById("invPrice").value);
        var cost = parseFloat(document.getElementById("invCost").value);
        var qty = parseInt(document.getElementById("invQty").value, 10);
        var low = parseInt(document.getElementById("invLow").value, 10);
        if (!name || isNaN(price) || price <= 0 || isNaN(qty) || qty < 0) {
          alert("Enter item name, price, and quantity.");
          return;
        }
        state.inventory.push({
          id: "i_" + Date.now() + "_" + Math.floor(Math.random() * 9999),
          name: name,
          priceNGN: toNgn(price),
          costNGN: isNaN(cost) ? toNgn(price) * 0.7 : toNgn(cost),
          qty: qty,
          low: isNaN(low) ? 3 : low
        });
        document.getElementById("invName").value = "";
        document.getElementById("invPrice").value = "";
        document.getElementById("invCost").value = "";
        document.getElementById("invQty").value = "10";
        save();
      } catch (e) {
        alert("Error saving stock: " + e.message);
      }
    }

    function bumpStock(id, delta) {
      for (var i = 0; i < state.inventory.length; i++) {
        if (state.inventory[i].id === id) {
          state.inventory[i].qty = Math.max(0, state.inventory[i].qty + delta);
        }
      }
      save();
    }

    function delStock(id) {
      state.inventory = state.inventory.filter(function(x) { return x.id !== id; });
      save();
    }

    function addDebtEntry() {
      try {
        var person = document.getElementById("debtName").value.trim();
        var amt = parseFloat(document.getElementById("debtAmt").value);
        var note = document.getElementById("debtNote").value.trim();
        if (!person || isNaN(amt) || amt <= 0) {
          alert("Enter person name and amount.");
          return;
        }
        state.entries.unshift({
          id: "d_" + Date.now(),
          date: new Date().toISOString().slice(0, 10),
          type: "debt",
          party: person + (note ? (" - " + note) : ""),
          amountNGN: toNgn(amt),
          costNGN: 0,
          status: "unpaid"
        });
        document.getElementById("debtName").value = "";
        document.getElementById("debtAmt").value = "";
        document.getElementById("debtNote").value = "";
        save();
      } catch (e) {
        alert("Error saving debt: " + e.message);
      }
    }

    function settleDebt(id) {
      for (var i = 0; i < state.entries.length; i++) {
        if (state.entries[i].id === id) {
          state.entries[i].status = "paid";
          state.entries[i].type = "sale";
        }
      }
      save();
    }

    function delEntry(id) {
      state.entries = state.entries.filter(function(e) { return e.id !== id; });
      save();
    }

    function exportData() {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "koboledger-backup.json";
      a.click();
      URL.revokeObjectURL(url);
    }

    function askAi() {
      var inp = document.getElementById("aiPrompt");
      var q = inp ? inp.value.trim() : "";
      if (!q) return;
      var box = document.getElementById("aiChatBox");
      var today = new Date().toISOString().slice(0, 10);
      var salesToday = 0;
      var profit = 0;
      var debt = 0;
      for (var i = 0; i < state.entries.length; i++) {
        var e = state.entries[i];
        if (e.type === "sale") {
          if (e.date === today) salesToday += e.amountNGN;
          profit += (e.amountNGN - (e.costNGN || 0));
        }
        if (e.type === "expense") {
          profit -= e.amountNGN;
        }
        if (e.type === "debt" && e.status !== "paid") {
          debt += e.amountNGN;
        }
      }
      var lowNames = [];
      for (var j = 0; j < state.inventory.length; j++) {
        if (state.inventory[j].qty <= state.inventory[j].low) {
          lowNames.push(state.inventory[j].name + " (" + state.inventory[j].qty + ")");
        }
      }
      var reply = "Today Sales: " + fmt(salesToday) +
        " | Est. Profit: " + fmt(profit) +
        " | Debt Owed: " + fmt(debt) +
        " | Low Stock: " + (lowNames.length ? lowNames.join(", ") : "None");

      if (box) {
        box.innerHTML += '<div class="chat-msg"><strong>You:</strong> ' + esc(q) + '</div>';
        box.innerHTML += '<div class="chat-msg"><strong>AI:</strong> ' + esc(reply) + '</div>';
        box.scrollTop = box.scrollHeight;
      }
      inp.value = "";
    }

    function render() {
      var ls = document.getElementById("langSelect");
      var cs = document.getElementById("curSelect");
      if (ls) ls.value = state.lang;
      if (cs) cs.value = state.currency;

      setTxt("t-overview", tr("overview"));
      setTxt("t-salesToday", tr("salesToday"));
      setTxt("t-estProfit", tr("estProfit"));
      setTxt("t-debtOwed", tr("debtOwed"));
      setTxt("t-lowCount", tr("lowCount"));
      setTxt("t-quickActions", tr("quickActions"));
      setTxt("btnQuickSale", tr("recSale"));
      setTxt("btnQuickStock", tr("manageStock"));
      setTxt("t-lowAlerts", tr("lowAlerts"));

      setTxt("tabBtn-dashboard", tr("tabDash"));
      setTxt("tabBtn-inventory", tr("tabInv"));
      setTxt("tabBtn-sale", tr("tabSale"));
      setTxt("tabBtn-debt", tr("tabDebt"));
      setTxt("tabBtn-ai", tr("tabAi"));

      var today = new Date().toISOString().slice(0, 10);
      var salesToday = 0;
      var profit = 0;
      var debtOwed = 0;

      for (var i = 0; i < state.entries.length; i++) {
        var en = state.entries[i];
        if (en.type === "sale") {
          if (en.date === today) salesToday += en.amountNGN;
          profit += (en.amountNGN - (en.costNGN || 0));
        } else if (en.type === "expense") {
          profit -= en.amountNGN;
        } else if (en.type === "debt" && en.status !== "paid") {
          debtOwed += en.amountNGN;
        }
      }

      var lowItems = [];
      for (var j = 0; j < state.inventory.length; j++) {
        if (state.inventory[j].qty <= state.inventory[j].low) {
          lowItems.push(state.inventory[j]);
        }
      }

      setTxt("valSalesToday", fmt(salesToday));
      setTxt("valProfit", fmt(profit));
      setTxt("valDebt", fmt(debtOwed));
      setTxt("valLowCount", String(lowItems.length));

      var alertsEl = document.getElementById("lowAlertsBox");
      if (alertsEl) {
        if (!lowItems.length) {
          alertsEl.textContent = tr("optimal");
        } else {
          alertsEl.innerHTML = lowItems.map(function(it) {
            return '<div style="margin-bottom:4px;color:#b91c1c;font-weight:600;">' +
              esc(it.name) + ": " + it.qty + " left</div>";
          }).join("");
        }
      }

      var txBody = document.getElementById("recentTxBody");
      if (txBody) {
        if (!state.entries.length) {
          txBody.innerHTML = '<tr><td colspan="5" class="muted">No entries recorded yet.</td></tr>';
        } else {
          txBody.innerHTML = state.entries.slice(0, 15).map(function(en) {
            return "<tr>" +
              "<td>" + esc(en.date) + "</td>" +
              "<td>" + esc(String(en.type || "").toUpperCase()) + "</td>" +
              "<td>" + esc(en.party) + "</td>" +
              "<td><strong>" + fmt(en.amountNGN) + "</strong></td>" +
              '<td><button type="button" class="btn-danger" onclick="delEntry(\'' + en.id + '\')">X</button></td>' +
              "</tr>";
          }).join("");
        }
      }

      var invPick = document.getElementById("saleInvPick");
      if (invPick) {
        invPick.innerHTML = '<option value="">-- Custom --</option>' +
          state.inventory.map(function(it) {
            return '<option value="' + it.id + '">' + esc(it.name) + ' (' + it.qty + ')</option>';
          }).join("");
      }

      var invBody = document.getElementById("invTableBody");
      if (invBody) {
        if (!state.inventory.length) {
          invBody.innerHTML = '<tr><td colspan="5" class="muted">No stock items added yet.</td></tr>';
        } else {
          invBody.innerHTML = state.inventory.map(function(it) {
            var isLow = it.qty <= it.low;
            return "<tr>" +
              "<td><strong>" + esc(it.name) + "</strong></td>" +
              "<td>" + fmt(it.priceNGN) + "</td>" +
              "<td>" + it.qty + "</td>" +
              '<td style="font-weight:700;color:' + (isLow ? "#dc2626" : "#0f8a4b") + '">' + (isLow ? "Low" : "OK") + "</td>" +
              '<td><button type="button" class="btn-outline" onclick="bumpStock(\'' + it.id + '\', 1)">+1</button> ' +
              '<button type="button" class="btn-danger" onclick="delStock(\'' + it.id + '\')">X</button></td>' +
              "</tr>";
          }).join("");
        }
      }

      var cartBody = document.getElementById("cartBody");
      var cartSum = 0;
      if (cartBody) {
        if (!state.cart.length) {
          cartBody.innerHTML = '<tr><td colspan="4" class="muted">Cart is empty.</td></tr>';
        } else {
          cartBody.innerHTML = state.cart.map(function(c, idx) {
            var sub = c.priceNGN * c.qty;
            cartSum += sub;
            return "<tr>" +
              "<td>" + esc(c.name) + "</td>" +
              "<td>" + c.qty + "</td>" +
              "<td>" + fmt(c.priceNGN) + "</td>" +
              '<td><button type="button" class="btn-danger" onclick="delCart(' + idx + ')">X</button></td>' +
              "</tr>";
          }).join("");
        }
      }
      setTxt("cartTotalVal", fmt(cartSum));

      var debtBody = document.getElementById("debtBody");
      if (debtBody) {
        var debts = state.entries.filter(function(e) { return e.type === "debt"; });
        if (!debts.length) {
          debtBody.innerHTML = '<tr><td colspan="5" class="muted">No debts recorded.</td></tr>';
        } else {
          debtBody.innerHTML = debts.map(function(d) {
            var unpaid = d.status !== "paid";
            return "<tr>" +
              "<td><strong>" + esc(d.party) + "</strong></td>" +
              "<td>" + esc(d.date) + "</td>" +
              "<td>" + fmt(d.amountNGN) + "</td>" +
              '<td style="font-weight:700;color:' + (unpaid ? "#dc2626" : "#0f8a4b") + '">' + (unpaid ? "Unpaid" : "Paid") + "</td>" +
              '<td>' + (unpaid ? '<button type="button" class="btn-outline" onclick="settleDebt(\'' + d.id + '\')">Mark Paid</button> ' : '') +
              '<button type="button" class="btn-danger" onclick="delEntry(\'' + d.id + '\')">X</button></td>' +
              "</tr>";
          }).join("");
        }
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
      return Response.json({ ok: true, app: "koboledger-ui" });
    }
    return new Response(INDEX_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
