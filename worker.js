const MANIFEST_JSON = {
  name: "KoboLedger — Business Pocket Assistant",
  short_name: "KoboLedger",
  description: "International multi-currency ledger, multi-item cart, expense & debt tracker, and AI assistant.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#F3F4F6",
  theme_color: "#059669",
  orientation: "portrait-primary",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

const SERVICE_WORKER_JS = `
const CACHE_NAME = "koboledger-pwa-v1";
const STATIC_ASSETS = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && url.origin === self.location.origin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/"));
    })
  );
});
`;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>KoboLedger — Business Pocket Assistant</title>
  <meta name="theme-color" content="#059669" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="KoboLedger" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
  <link rel="apple-touch-icon" href="/icon-192.png" />
  <style>
    :root {
      --primary-color: #059669;
      --secondary-color: #10B981;
      --accent-color: #F59E0B;
      --text-dark: #1F2937;
      --text-muted: #6B7280;
      --bg-light: #F3F4F6;
      --border-color: #D1D5DB;
      --danger: #EF4444;
      --info: #2563EB;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: var(--bg-light);
      color: var(--text-dark);
    }

    #app-container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
    }

    header {
      background-color: var(--primary-color);
      color: #FFFFFF;
      padding: 0.9rem 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    header h1 {
      margin: 0;
      font-size: 1.35rem;
      line-height: 1.2;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .header-btn {
      background: rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 6px;
      padding: 0.35rem 0.6rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }

    .header-btn.install-cta {
      background: var(--accent-color);
      border-color: var(--accent-color);
      color: #FFFFFF;
      display: none;
    }

    nav {
      display: flex;
      background-color: #E5E7EB;
      overflow-x: auto;
      position: sticky;
      top: 54px;
      z-index: 99;
      scrollbar-width: none;
    }

    nav::-webkit-scrollbar {
      display: none;
    }

    nav button {
      flex: 1 0 auto;
      padding: 0.85rem 0.75rem;
      border: none;
      background: none;
      font-weight: 600;
      font-size: 0.88rem;
      color: var(--text-dark);
      cursor: pointer;
      white-space: nowrap;
    }

    nav button.active {
      background-color: #FFFFFF;
      border-bottom: 3px solid var(--primary-color);
      color: var(--primary-color);
    }

    main {
      padding: 1rem;
      flex: 1;
      padding-bottom: 88px;
    }

    section {
      display: none;
    }

    section.active {
      display: block;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 0.9rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    .stat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.85rem;
      margin-bottom: 1rem;
    }

    .stat-card {
      background: var(--bg-light);
      padding: 0.9rem;
      border-radius: 8px;
      text-align: center;
    }

    .stat-card h3 {
      margin: 0 0 0.4rem 0;
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .stat-value {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--primary-color);
    }

    .stat-value.negative {
      color: var(--danger);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    label {
      font-weight: 600;
      font-size: 0.85rem;
    }

    input, select, textarea {
      padding: 0.7rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 0.98rem;
      width: 100%;
      background: #FFFFFF;
      color: var(--text-dark);
    }

    button.btn-primary {
      background-color: var(--primary-color);
      color: #FFFFFF;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.98rem;
      cursor: pointer;
    }

    button.btn-secondary {
      background-color: var(--secondary-color);
      color: #FFFFFF;
      border: none;
      padding: 0.55rem 0.9rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
    }

    button.btn-outline {
      background: #FFFFFF;
      color: var(--text-dark);
      border: 1px solid var(--border-color);
      padding: 0.55rem 0.85rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
    }

    .low-stock {
      border-left: 4px solid var(--danger);
    }

    .badge-low {
      background-color: #FEE2E2;
      color: var(--danger);
      padding: 0.2rem 0.55rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .cart-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 0;
      border-bottom: 1px solid #E5E7EB;
    }

    .cart-row:last-child {
      border-bottom: none;
    }

    .fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--accent-color);
      color: #FFFFFF;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
      cursor: pointer;
      text-decoration: none;
      z-index: 90;
    }

    #receipt-preview {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      white-space: pre-wrap;
      background: #F9FAFB;
      padding: 0.9rem;
      border: 1px dashed var(--border-color);
      border-radius: 6px;
      margin-bottom: 1rem;
      font-size: 0.84rem;
    }

    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .modal.open {
      display: flex;
    }

    .modal-content {
      background: #FFFFFF;
      padding: 1.35rem;
      border-radius: 10px;
      width: 100%;
      max-width: 480px;
      max-height: 85vh;
      overflow-y: auto;
    }

    .ios-tip {
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #065F46;
      padding: 0.7rem 0.85rem;
      border-radius: 8px;
      font-size: 0.84rem;
      margin-bottom: 0.9rem;
      display: none;
    }

    .creator-footer {
      text-align: center;
      padding: 0.9rem 1rem 1.4rem;
      font-size: 0.8rem;
      color: var(--text-muted);
      border-top: 1px solid #E5E7EB;
    }

    .muted {
      color: var(--text-muted);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
<div id="app-container">
  <header>
    <h1 id="brand-title">KoboLedger</h1>
    <div class="header-actions">
      <button type="button" id="install-app-btn" class="header-btn install-cta" onclick="triggerInstall()">Install</button>
      <button type="button" class="header-btn" onclick="openLanguageModal(true)">🌐 <span id="header-lang-label">EN</span></button>
    </div>
  </header>

  <nav id="main-nav">
    <button type="button" class="nav-btn active" data-tab="dashboard" onclick="switchTab('dashboard')" data-i18n="nav_dashboard">Dashboard</button>
    <button type="button" class="nav-btn" data-tab="inventory" onclick="switchTab('inventory')" data-i18n="nav_inventory">Inventory</button>
    <button type="button" class="nav-btn" data-tab="sales" onclick="switchTab('sales')" data-i18n="nav_sales">New Sale</button>
    <button type="button" class="nav-btn" data-tab="expenses" onclick="switchTab('expenses')" data-i18n="nav_expenses">Expenses</button>
    <button type="button" class="nav-btn" data-tab="debt" onclick="switchTab('debt')" data-i18n="nav_debt">Debt Tracker</button>
    <button type="button" class="nav-btn" data-tab="ai-assistant" onclick="switchTab('ai-assistant')" data-i18n="nav_ai">AI Assistant</button>
    <button type="button" class="nav-btn" data-tab="settings" onclick="switchTab('settings')" data-i18n="nav_settings">Settings</button>
  </nav>

  <main>
    <div id="ios-install-tip" class="ios-tip">
      <strong>iPhone / iPad:</strong> Tap <strong>Share</strong> (square with arrow) then <strong>Add to Home Screen</strong> to install KoboLedger as an app.
    </div>

    <!-- DASHBOARD -->
    <section id="dashboard" class="active">
      <h2 data-i18n="dashboard_title">Business Overview</h2>
      <div class="stat-grid">
        <div class="stat-card">
          <h3 data-i18n="stat_sales_today">Total Sales (Today)</h3>
          <div id="stat-today-sales" class="stat-value">₦0</div>
        </div>
        <div class="stat-card">
          <h3 data-i18n="stat_net_profit">Net Profit (Today)</h3>
          <div id="stat-today-profit" class="stat-value">₦0</div>
        </div>
        <div class="stat-card">
          <h3 data-i18n="stat_expenses_today">Expenses (Today)</h3>
          <div id="stat-today-expenses" class="stat-value negative">₦0</div>
        </div>
        <div class="stat-card">
          <h3 data-i18n="stat_total_debt">Total Debt Owed</h3>
          <div id="stat-total-debt" class="stat-value">₦0</div>
        </div>
      </div>

      <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong data-i18n="stat_low_stock">Low Stock Items</strong>
          <div id="stat-low-stock-sub" class="muted">0 products at or below threshold</div>
        </div>
        <span id="stat-low-stock" class="badge-low">0</span>
      </div>

      <h3 data-i18n="quick_actions">Quick Actions</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1.25rem;">
        <button type="button" class="btn-primary" onclick="switchTab('sales')" data-i18n="btn_record_sale">+ Record Sale</button>
        <button type="button" class="btn-secondary" onclick="switchTab('expenses')" data-i18n="btn_add_expense">+ Log Expense</button>
      </div>

      <h3 data-i18n="low_stock_alerts">Low Stock Alerts</h3>
      <div id="dashboard-low-stock-list"></div>
    </section>

    <!-- INVENTORY -->
    <section id="inventory">
      <h2 data-i18n="inventory_title">Inventory Management</h2>
      <button type="button" class="btn-primary" onclick="openAddProductModal()" style="width:100%; margin-bottom:1rem;" data-i18n="btn_add_product">+ Add New Product</button>
      <div id="inventory-list"></div>
    </section>

    <!-- MULTI-ITEM NEW SALE -->
    <section id="sales">
      <h2 data-i18n="sales_title">Record New Sale (Multi-Item Cart)</h2>
      <div class="card">
        <h3 style="margin-top:0;" data-i18n="add_to_cart">Add Item to Cart</h3>
        <form id="cart-add-form" onsubmit="addItemToCart(event)">
          <label data-i18n="select_product">Select Product</label>
          <select id="sale-product-select" required onchange="updateSalePrice()"></select>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.7rem;">
            <div>
              <label data-i18n="quantity">Quantity</label>
              <input type="number" id="sale-quantity" min="1" value="1" required />
            </div>
            <div>
              <label data-i18n="unit_price">Unit Selling Price</label>
              <input type="number" id="sale-selling-price" step="any" min="0" required />
            </div>
          </div>

          <button type="submit" class="btn-secondary" data-i18n="btn_add_cart">+ Add Item to Cart</button>
        </form>
      </div>

      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h3 style="margin:0;" data-i18n="current_cart">Current Cart</h3>
          <button type="button" class="btn-outline" onclick="clearCart()" data-i18n="btn_clear_cart">Clear</button>
        </div>
        <div id="cart-items-list"><p class="muted">Cart is empty. Add products above.</p></div>
        <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.05rem; margin-top:0.75rem; padding-top:0.65rem; border-top:1px solid #E5E7EB;">
          <span data-i18n="cart_total">Cart Total:</span>
          <span id="cart-total-display">₦0</span>
        </div>
      </div>

      <form id="checkout-form" onsubmit="processCartSale(event)" class="card">
        <label data-i18n="customer_name">Customer Name</label>
        <input type="text" id="sale-customer-name" required placeholder="e.g., Walk-in Customer or Amaka" />

        <label data-i18n="payment_method">Payment Method</label>
        <select id="sale-payment-method">
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Card / POS">Card / POS</option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Credit">Credit (Pay Later)</option>
        </select>

        <button type="submit" class="btn-primary" data-i18n="btn_complete_sale">Complete Sale & Generate Receipt</button>
      </form>
    </section>

    <!-- EXPENSES -->
    <section id="expenses">
      <h2 data-i18n="expenses_title">Daily Business Expenses</h2>
      <form id="expense-form" onsubmit="addExpense(event)" class="card">
        <label data-i18n="expense_title_label">Expense Description</label>
        <input type="text" id="expense-desc" required placeholder="e.g., Delivery, Packaging, Electricity, Rent" />

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.7rem;">
          <div>
            <label data-i18n="expense_amount_label">Amount</label>
            <input type="number" id="expense-amount" step="any" min="0.01" required />
          </div>
          <div>
            <label data-i18n="payment_method">Payment Method</label>
            <select id="expense-method">
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card / POS">Card / POS</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-primary" data-i18n="btn_save_expense">Save Expense</button>
      </form>

      <div id="expenses-list"></div>
    </section>

    <!-- DEBT TRACKER -->
    <section id="debt">
      <h2 data-i18n="debt_title">Customer Debt Tracker</h2>
      <div id="debt-list"></div>
    </section>

    <!-- AI ASSISTANT -->
    <section id="ai-assistant">
      <h2 data-i18n="ai_title">AI Business Assistant</h2>
      <p class="muted" data-i18n="ai_subtitle">Powered securely through KoboLedger backend — no personal API key required.</p>
      <form onsubmit="askAI(event)">
        <label data-i18n="ai_prompt_label">What do you need help with?</label>
        <select id="ai-prompt-type">
          <option value="status">Write Social / WhatsApp Promo Ad for Inventory</option>
          <option value="reply">Draft Polite Payment Reminder for Debtor</option>
          <option value="biz-advice">Business Growth, Pricing & Stocking Advice</option>
        </select>

        <input type="text" id="ai-context-input" placeholder="Enter product name, customer name, or question..." required />
        <button type="submit" class="btn-primary" style="background-color: var(--accent-color);" data-i18n="btn_generate_ai">Generate with AI</button>
      </form>

      <div class="card" style="margin-top:1rem;">
        <h3 style="margin-top:0;" data-i18n="ai_response_title">AI Response</h3>
        <div id="ai-response-output" style="min-height:90px; white-space:pre-wrap;">Ready whenever you are.</div>
      </div>
    </section>

    <!-- SETTINGS -->
    <section id="settings">
      <h2 data-i18n="settings_title">Shop & Global Settings</h2>
      <form id="settings-form" onsubmit="saveSettings(event)" class="card">
        <label data-i18n="shop_name_label">Shop / Business Name</label>
        <input type="text" id="setting-shop-name" required />

        <label data-i18n="whatsapp_label">Business WhatsApp / Contact (optional, with country code)</label>
        <input type="text" id="setting-whatsapp" placeholder="e.g., 2348012345678" />

        <label data-i18n="bank_label">Payment / Bank / Wallet Details (for receipts)</label>
        <input type="text" id="setting-bank-details" placeholder="e.g., GTBank 0123456789 / PayPal @shop" />

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.7rem;">
          <div>
            <label data-i18n="language_label">Language</label>
            <select id="setting-language">
              <option value="en">English (Default)</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="ar">العربية</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yorùbá</option>
              <option value="ig">Igbo</option>
            </select>
          </div>
          <div>
            <label data-i18n="country_currency_label">Country / Currency</label>
            <select id="setting-region" onchange="applyRegionPreset()">
              <option value="NG|NGN|₦">Nigeria (NGN ₦)</option>
              <option value="US|USD|$">United States (USD $)</option>
              <option value="GB|GBP|£">United Kingdom (GBP £)</option>
              <option value="EU|EUR|€">Europe / Eurozone (EUR €)</option>
              <option value="GH|GHS|GH₵">Ghana (GHS GH₵)</option>
              <option value="KE|KES|KSh">Kenya (KES KSh)</option>
              <option value="ZA|ZAR|R">South Africa (ZAR R)</option>
              <option value="GLOBAL|USD|$">Other / Global (USD $)</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-primary" data-i18n="btn_save_settings">Save Settings</button>
      </form>

      <h3 data-i18n="backup_title">Backup, Import & Cloud Readiness</h3>
      <div class="card">
        <div style="display:flex; flex-wrap:wrap; gap:0.65rem;">
          <button type="button" class="btn-secondary" style="background-color:#2563EB; flex:1;" onclick="exportData()" data-i18n="btn_export">Export JSON</button>
          <button type="button" class="btn-outline" style="flex:1;" onclick="document.getElementById('import-file-input').click()" data-i18n="btn_import">Import JSON</button>
          <button type="button" class="btn-secondary" style="background-color:var(--danger); flex:1;" onclick="resetAppData()" data-i18n="btn_reset">Reset Data</button>
        </div>
        <input type="file" id="import-file-input" accept=".json,application/json" style="display:none;" onchange="importData(event)" />
        <p class="muted" style="margin-bottom:0; margin-top:0.75rem;">
          All records are saved locally on your device in <code>kobo_ledger_state</code> and structured cleanly for optional Cloudflare D1 sync.
        </p>
      </div>
    </section>
  </main>

  <footer class="creator-footer">
    KoboLedger • Built by <strong>verified</strong>
  </footer>

  <a href="#" class="fab" onclick="switchTab('sales'); return false;" aria-label="New Sale">+</a>
</div>

<!-- FIRST-VISIT LANGUAGE MODAL -->
<div id="language-modal" class="modal">
  <div class="modal-content">
    <h2 style="margin-top:0;">Choose Language / Langue / Idioma</h2>
    <p class="muted">English is selected by default. Your choice is saved automatically and can be changed anytime in Settings.</p>
    <form onsubmit="confirmLanguageModal(event)">
      <label for="modal-language-select">Select Language</label>
      <select id="modal-language-select">
        <option value="en" selected>English (Default)</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="pt">Português</option>
        <option value="ar">العربية</option>
        <option value="ha">Hausa</option>
        <option value="yo">Yorùbá</option>
        <option value="ig">Igbo</option>
      </select>

      <label for="modal-region-select">Country / Currency (Optional — No GPS needed)</label>
      <select id="modal-region-select">
        <option value="NG|NGN|₦">Nigeria (NGN ₦)</option>
        <option value="US|USD|$">United States (USD $)</option>
        <option value="GB|GBP|£">United Kingdom (GBP £)</option>
        <option value="EU|EUR|€">Europe / Eurozone (EUR €)</option>
        <option value="GH|GHS|GH₵">Ghana (GHS GH₵)</option>
        <option value="KE|KES|KSh">Kenya (KES KSh)</option>
        <option value="ZA|ZAR|R">South Africa (ZAR R)</option>
        <option value="GLOBAL|USD|$">Global / Other (USD $)</option>
      </select>

      <button type="submit" class="btn-primary" style="margin-top:0.5rem;">Continue with Selected Language</button>
    </form>
  </div>
</div>

<!-- RECEIPT MODAL -->
<div id="receipt-modal" class="modal">
  <div class="modal-content">
    <h2 style="margin-top:0;">Generated Receipt</h2>
    <div id="receipt-preview"></div>
    <div style="display:flex; gap:0.75rem;">
      <button type="button" class="btn-primary" style="flex:1;" onclick="sendWhatsAppReceipt()">Share on WhatsApp</button>
      <button type="button" class="btn-outline" onclick="closeReceiptModal()">Close</button>
    </div>
  </div>
</div>

<!-- ADD / EDIT PRODUCT MODAL -->
<div id="product-modal" class="modal">
  <div class="modal-content">
    <h2 id="product-modal-title" style="margin-top:0;">Add Product</h2>
    <form id="product-form" onsubmit="saveProduct(event)">
      <input type="hidden" id="product-index" />
      <label>Product Name</label>
      <input type="text" id="product-name" required />

      <label>Cost Price (per unit)</label>
      <input type="number" id="product-cost" step="any" min="0" required />

      <label>Selling Price (per unit)</label>
      <input type="number" id="product-selling" step="any" min="0" required />

      <label>Current Stock Quantity</label>
      <input type="number" id="product-stock" min="0" required />

      <label>Low Stock Alert Threshold</label>
      <input type="number" id="product-threshold" min="0" value="5" required />

      <button type="submit" class="btn-primary">Save Product</button>
      <button type="button" class="btn-outline" style="width:100%; margin-top:0.4rem;" onclick="closeProductModal()">Cancel</button>
    </form>
  </div>
</div>

<script>
  const TRANSLATIONS = {
    en: {
      nav_dashboard: "Dashboard",
      nav_inventory: "Inventory",
      nav_sales: "New Sale",
      nav_expenses: "Expenses",
      nav_debt: "Debt Tracker",
      nav_ai: "AI Assistant",
      nav_settings: "Settings",
      dashboard_title: "Business Overview",
      stat_sales_today: "Total Sales (Today)",
      stat_net_profit: "Net Profit (Today)",
      stat_expenses_today: "Expenses (Today)",
      stat_total_debt: "Total Debt Owed",
      stat_low_stock: "Low Stock Items",
      quick_actions: "Quick Actions",
      btn_record_sale: "+ Record Sale",
      btn_add_expense: "+ Log Expense",
      low_stock_alerts: "Low Stock Alerts",
      inventory_title: "Inventory Management",
      btn_add_product: "+ Add New Product",
      sales_title: "Record New Sale (Multi-Item Cart)",
      add_to_cart: "Add Item to Cart",
      select_product: "Select Product",
      quantity: "Quantity",
      unit_price: "Unit Selling Price",
      btn_add_cart: "+ Add Item to Cart",
      current_cart: "Current Cart",
      btn_clear_cart: "Clear",
      cart_total: "Cart Total:",
      customer_name: "Customer Name",
      payment_method: "Payment Method",
      btn_complete_sale: "Complete Sale & Generate Receipt",
      expenses_title: "Daily Business Expenses",
      expense_title_label: "Expense Description",
      expense_amount_label: "Amount",
      btn_save_expense: "Save Expense",
      debt_title: "Customer Debt Tracker",
      ai_title: "AI Business Assistant",
      ai_subtitle: "Powered securely through KoboLedger backend — no personal API key required.",
      ai_prompt_label: "What do you need help with?",
      btn_generate_ai: "Generate with AI",
      ai_response_title: "AI Response",
      settings_title: "Shop & Global Settings",
      shop_name_label: "Shop / Business Name",
      whatsapp_label: "Business WhatsApp / Contact (optional, with country code)",
      bank_label: "Payment / Bank / Wallet Details (for receipts)",
      language_label: "Language",
      country_currency_label: "Country / Currency",
      btn_save_settings: "Save Settings",
      backup_title: "Backup, Import & Cloud Readiness",
      btn_export: "Export JSON",
      btn_import: "Import JSON",
      btn_reset: "Reset Data"
    },
    fr: {
      nav_dashboard: "Tableau",
      nav_inventory: "Stock",
      nav_sales: "Vente",
      nav_expenses: "Dépenses",
      nav_debt: "Dettes",
      nav_ai: "Assistant IA",
      nav_settings: "Paramètres",
      dashboard_title: "Aperçu de l'activité",
      stat_sales_today: "Ventes du jour",
      stat_net_profit: "Bénéfice net (jour)",
      stat_expenses_today: "Dépenses (jour)",
      stat_total_debt: "Dettes totales",
      stat_low_stock: "Stock faible",
      quick_actions: "Actions rapides",
      btn_record_sale: "+ Nouvelle vente",
      btn_add_expense: "+ Ajouter dépense",
      low_stock_alerts: "Alertes de stock faible",
      inventory_title: "Gestion du stock",
      btn_add_product: "+ Ajouter un produit",
      sales_title: "Nouvelle vente (Panier multi-articles)",
      add_to_cart: "Ajouter au panier",
      select_product: "Choisir un produit",
      quantity: "Quantité",
      unit_price: "Prix unitaire",
      btn_add_cart: "+ Ajouter au panier",
      current_cart: "Panier actuel",
      btn_clear_cart: "Vider",
      cart_total: "Total panier :",
      customer_name: "Nom du client",
      payment_method: "Mode de paiement",
      btn_complete_sale: "Valider la vente et créer le reçu",
      expenses_title: "Dépenses quotidiennes",
      expense_title_label: "Description de la dépense",
      expense_amount_label: "Montant",
      btn_save_expense: "Enregistrer la dépense",
      debt_title: "Suivi des dettes clients",
      ai_title: "Assistant IA professionnel",
      ai_subtitle: "Sécurisé via le backend KoboLedger — aucune clé API personnelle requise.",
      ai_prompt_label: "Comment puis-je vous aider ?",
      btn_generate_ai: "Générer avec l'IA",
      ai_response_title: "Réponse de l'IA",
      settings_title: "Paramètres de la boutique",
      shop_name_label: "Nom de la boutique",
      whatsapp_label: "WhatsApp / Contact (optionnel, avec indicatif)",
      bank_label: "Détails de paiement / banque / portefeuille",
      language_label: "Langue",
      country_currency_label: "Pays / Devise",
      btn_save_settings: "Enregistrer les paramètres",
      backup_title: "Sauvegarde et importation",
      btn_export: "Exporter JSON",
      btn_import: "Importer JSON",
      btn_reset: "Réinitialiser"
    },
    es: {
      nav_dashboard: "Panel",
      nav_inventory: "Inventario",
      nav_sales: "Venta",
      nav_expenses: "Gastos",
      nav_debt: "Deudas",
      nav_ai: "Asistente IA",
      nav_settings: "Ajustes",
      dashboard_title: "Resumen del negocio",
      stat_sales_today: "Ventas de hoy",
      stat_net_profit: "Ganancia neta (hoy)",
      stat_expenses_today: "Gastos (hoy)",
      stat_total_debt: "Deuda total",
      stat_low_stock: "Stock bajo",
      quick_actions: "Acciones rápidas",
      btn_record_sale: "+ Registrar venta",
      btn_add_expense: "+ Registrar gasto",
      low_stock_alerts: "Alertas de stock bajo",
      inventory_title: "Gestión de inventario",
      btn_add_product: "+ Agregar producto",
      sales_title: "Nueva venta (Carrito multi-artículo)",
      add_to_cart: "Agregar al carrito",
      select_product: "Seleccionar producto",
      quantity: "Cantidad",
      unit_price: "Precio unitario",
      btn_add_cart: "+ Agregar al carrito",
      current_cart: "Carrito actual",
      btn_clear_cart: "Vaciar",
      cart_total: "Total carrito:",
      customer_name: "Nombre del cliente",
      payment_method: "Método de pago",
      btn_complete_sale: "Completar venta y generar recibo",
      expenses_title: "Gastos diarios del negocio",
      expense_title_label: "Descripción del gasto",
      expense_amount_label: "Monto",
      btn_save_expense: "Guardar gasto",
      debt_title: "Control de deudas de clientes",
      ai_title: "Asistente IA de negocios",
      ai_subtitle: "Conectado mediante el backend de KoboLedger — sin clave API propia.",
      ai_prompt_label: "¿En qué necesitas ayuda?",
      btn_generate_ai: "Generar con IA",
      ai_response_title: "Respuesta de la IA",
      settings_title: "Ajustes de tienda y región",
      shop_name_label: "Nombre del negocio",
      whatsapp_label: "WhatsApp / Contacto (opcional, con código de país)",
      bank_label: "Datos de pago / banco / billetera",
      language_label: "Idioma",
      country_currency_label: "País / Moneda",
      btn_save_settings: "Guardar ajustes",
      backup_title: "Respaldo e importación",
      btn_export: "Exportar JSON",
      btn_import: "Importar JSON",
      btn_reset: "Restablecer"
    },
    pt: {
      nav_dashboard: "Painel",
      nav_inventory: "Estoque",
      nav_sales: "Nova Venda",
      nav_expenses: "Despesas",
      nav_debt: "Fiado",
      nav_ai: "Assistente IA",
      nav_settings: "Configurações",
      dashboard_title: "Resumo do negócio",
      stat_sales_today: "Vendas (Hoje)",
      stat_net_profit: "Lucro líquido (Hoje)",
      stat_expenses_today: "Despesas (Hoje)",
      stat_total_debt: "Total a receber",
      stat_low_stock: "Estoque baixo",
      quick_actions: "Ações rápidas",
      btn_record_sale: "+ Registrar venda",
      btn_add_expense: "+ Registrar despesa",
      low_stock_alerts: "Alertas de estoque baixo",
      inventory_title: "Gestão de estoque",
      btn_add_product: "+ Adicionar produto",
      sales_title: "Nova venda (Carrinho com vários itens)",
      add_to_cart: "Adicionar ao carrinho",
      select_product: "Selecionar produto",
      quantity: "Quantidade",
      unit_price: "Preço unitário",
      btn_add_cart: "+ Adicionar ao carrinho",
      current_cart: "Carrinho atual",
      btn_clear_cart: "Limpar",
      cart_total: "Total do carrinho:",
      customer_name: "Nome do cliente",
      payment_method: "Forma de pagamento",
      btn_complete_sale: "Concluir venda e gerar recibo",
      expenses_title: "Despesas diárias",
      expense_title_label: "Descrição da despesa",
      expense_amount_label: "Valor",
      btn_save_expense: "Salvar despesa",
      debt_title: "Controle de fiado",
      ai_title: "Assistente IA de negócios",
      ai_subtitle: "Roteado pelo backend do KoboLedger — sem necessidade de chave própria.",
      ai_prompt_label: "Como posso ajudar?",
      btn_generate_ai: "Gerar com IA",
      ai_response_title: "Resposta da IA",
      settings_title: "Configurações da loja",
      shop_name_label: "Nome da loja",
      whatsapp_label: "WhatsApp / Contato (opcional, com DDI)",
      bank_label: "Dados de pagamento / banco / carteira",
      language_label: "Idioma",
      country_currency_label: "País / Moeda",
      btn_save_settings: "Salvar configurações",
      backup_title: "Backup e importação",
      btn_export: "Exportar JSON",
      btn_import: "Importar JSON",
      btn_reset: "Resetar dados"
    },
    ar: {
      nav_dashboard: "الرئيسية",
      nav_inventory: "المخزون",
      nav_sales: "بيع جديد",
      nav_expenses: "المصاريف",
      nav_debt: "الديون",
      nav_ai: "مساعد الذكاء",
      nav_settings: "الإعدادات",
      dashboard_title: "نظرة عامة على النشاط",
      stat_sales_today: "مبيعات اليوم",
      stat_net_profit: "صافي الربح (اليوم)",
      stat_expenses_today: "مصاريف اليوم",
      stat_total_debt: "إجمالي الديون",
      stat_low_stock: "نقص المخزون",
      quick_actions: "إجراءات سريعة",
      btn_record_sale: "+ تسجيل بيع",
      btn_add_expense: "+ تسجيل مصروف",
      low_stock_alerts: "تنبيهات انخفاض المخزون",
      inventory_title: "إدارة المخزون",
      btn_add_product: "+ إضافة منتج",
      sales_title: "تسجيل بيع جديد (سلة متعددة)",
      add_to_cart: "إضافة عنصر للسلة",
      select_product: "اختر منتجاً",
      quantity: "الكمية",
      unit_price: "سعر الوحدة",
      btn_add_cart: "+ أضف إلى السلة",
      current_cart: "السلة الحالية",
      btn_clear_cart: "مسح",
      cart_total: "إجمالي السلة:",
      customer_name: "اسم العميل",
      payment_method: "طريقة الدفع",
      btn_complete_sale: "إتمام البيع وإصدار الإيصال",
      expenses_title: "المصاريف اليومية",
      expense_title_label: "وصف المصروف",
      expense_amount_label: "المبلغ",
      btn_save_expense: "حفظ المصروف",
      debt_title: "متابعة ديون العملاء",
      ai_title: "مساعد الأعمال بالذكاء الاصطناعي",
      ai_subtitle: "يعمل عبر خادم KoboLedger دون الحاجة لمفتاح API شخصي.",
      ai_prompt_label: "بماذا تحتاج مساعدة؟",
      btn_generate_ai: "توليد بالذكاء الاصطناعي",
      ai_response_title: "رد الذكاء الاصطناعي",
      settings_title: "إعدادات المتجر والمنطقة",
      shop_name_label: "اسم المتجر",
      whatsapp_label: "رقم واتساب (اختياري مع رمز الدولة)",
      bank_label: "بيانات الدفع / البنك / المحفظة",
      language_label: "اللغة",
      country_currency_label: "الدولة / العملة",
      btn_save_settings: "حفظ الإعدادات",
      backup_title: "النسخ الاحتياطي والاستيراد",
      btn_export: "تصدير JSON",
      btn_import: "استيراد JSON",
      btn_reset: "إعادة ضبط"
    },
    ha: {
      nav_dashboard: "Dashboard",
      nav_inventory: "Kaya",
      nav_sales: "Sabon Saye",
      nav_expenses: "Kashe-kashe",
      nav_debt: "Bashi",
      nav_ai: "Mataimakin AI",
      nav_settings: "Saiti",
      dashboard_title: "Bayanin Kasuwanci",
      stat_sales_today: "Jimillar Saye (Yau)",
      stat_net_profit: "Riba Tsantsa (Yau)",
      stat_expenses_today: "Kashe-kashe (Yau)",
      stat_total_debt: "Jimillar Bashi",
      stat_low_stock: "Kaya Sun Kusa Karewa",
      quick_actions: "Ayyuka Cikin Sauki",
      btn_record_sale: "+ Rubuta Saye",
      btn_add_expense: "+ Rubuta Kashewa",
      low_stock_alerts: "Gargaɗin Kaya Sun Yi Ƙasa",
      inventory_title: "Kula da Kaya",
      btn_add_product: "+ Ƙara Sabon Kaya",
      sales_title: "Sabon Saye (Kaya Da Yawa)",
      add_to_cart: "Saka Kaya a Kwando",
      select_product: "Zaɓi Kaya",
      quantity: "Yawa",
      unit_price: "Farashin Ɗaya",
      btn_add_cart: "+ Saka a Kwando",
      current_cart: "Kaya a Kwando",
      btn_clear_cart: "Share",
      cart_total: "Jimillar Kwando:",
      customer_name: "Sunan Abokin Ciniki",
      payment_method: "Hanyar Biya",
      btn_complete_sale: "Kammala Saye & Fitar da Rasit",
      expenses_title: "Kashe-kashen Yau da Kullum",
      expense_title_label: "Bayani Kan Kashewar",
      expense_amount_label: "Adadi",
      btn_save_expense: "Ajiye Kashewa",
      debt_title: "Bibiyar Bashin Abokan Ciniki",
      ai_title: "Mataimakin Kasuwanci na AI",
      ai_subtitle: "Ana gudanarwa ta KoboLedger — babu buƙatar maɓallin API na kanka.",
      ai_prompt_label: "Me kake buƙatar taimako a kai?",
      btn_generate_ai: "Fitar da AI",
      ai_response_title: "Amsar AI",
      settings_title: "Saitin Shago da Ƙasa",
      shop_name_label: "Sunan Shago",
      whatsapp_label: "Lambar WhatsApp (na zaɓi, tare da lambar ƙasa)",
      bank_label: "Bayanin Biya / Banki",
      language_label: "Harshe",
      country_currency_label: "Ƙasa / Kuɗi",
      btn_save_settings: "Ajiye Saiti",
      backup_title: "Ajiyar Bayanai",
      btn_export: "Fitar da JSON",
      btn_import: "Shigo da JSON",
      btn_reset: "Sake Saitawa"
    },
    yo: {
      nav_dashboard: "Dasibọọdu",
      nav_inventory: "Ọja",
      nav_sales: "Tita Tuntun",
      nav_expenses: "Inawo",
      nav_debt: "Gbese",
      nav_ai: "Oluranlọwọ AI",
      nav_settings: "Eto",
      dashboard_title: "Akopọ Iṣowo",
      stat_sales_today: "Lapapọ Tita (Oni)",
      stat_net_profit: "Ere Gidi (Oni)",
      stat_expenses_today: "Inawo (Oni)",
      stat_total_debt: "Lapapọ Gbese",
      stat_low_stock: "Ọja Ti N Tan",
      quick_actions: "Iṣe Kiakia",
      btn_record_sale: "+ Kọ Tita Silẹ",
      btn_add_expense: "+ Kọ Inawo Silẹ",
      low_stock_alerts: "Ikilọ Ọja Ti N Tan",
      inventory_title: "Iṣakoso Ọja",
      btn_add_product: "+ Fi Ọja Tuntun Kun",
      sales_title: "Tita Tuntun (Ọpọlọpọ Ọja)",
      add_to_cart: "Fi Ọja Sinu Apẹrẹ",
      select_product: "Yan Ọja",
      quantity: "Iye",
      unit_price: "Iye Ọja Kọọkan",
      btn_add_cart: "+ Fi Sinu Apẹrẹ",
      current_cart: "Apẹrẹ Tita",
      btn_clear_cart: "Ko Kuro",
      cart_total: "Lapapọ Apẹrẹ:",
      customer_name: "Orukọ Onibara",
      payment_method: "Ọna Isanwo",
      btn_complete_sale: "Parẹ Tita & Gbe Iwe-ẹri Jade",
      expenses_title: "Inawo Ojoojumọ",
      expense_title_label: "Apejuwe Inawo",
      expense_amount_label: "Iye",
      btn_save_expense: "Fi Inawo Pamọ",
      debt_title: "Atẹle Gbese Onibara",
      ai_title: "Oluranlọwọ Iṣowo AI",
      ai_subtitle: "Nṣiṣẹ nipasẹ olupin KoboLedger — ko nilo bọtini API tirẹ.",
      ai_prompt_label: "Kini o nilo iranlọwọ lori rẹ?",
      btn_generate_ai: "Ṣẹda Pẹlu AI",
      ai_response_title: "Idahun AI",
      settings_title: "Eto Ile-iṣẹ ati Owo",
      shop_name_label: "Orukọ Ile-iṣẹ / Shop",
      whatsapp_label: "WhatsApp (aṣayan, pẹlu koodu orilẹ-ede)",
      bank_label: "Alaye Banki / Isanwo",
      language_label: "Ede",
      country_currency_label: "Orilẹ-ede / Owo",
      btn_save_settings: "Fi Eto Pamọ",
      backup_title: "Ifẹhinti ati Gbigbe Wọle",
      btn_export: "Gbe JSON Jade",
      btn_import: "Mu JSON Wọle",
      btn_reset: "Tun Data Bẹrẹ"
    },
    ig: {
      nav_dashboard: "Dashboard",
      nav_inventory: "Ngwa Ahịa",
      nav_sales: "Ọrụ Ọhụrụ",
      nav_expenses: "Mmefu",
      nav_debt: "Ụgwọ",
      nav_ai: "Onye Enyemaka AI",
      nav_settings: "Ntọala",
      dashboard_title: "Nchịkọta Azụmahịa",
      stat_sales_today: "Ngụkọta Ahịa (Taa)",
      stat_net_profit: "Uru Dị Ọcha (Taa)",
      stat_expenses_today: "Mmefu (Taa)",
      stat_total_debt: "Ngụkọta Ụgwọ",
      stat_low_stock: "Ngwa Na-agwụ Agwụ",
      quick_actions: "Ngwa Ngwa",
      btn_record_sale: "+ Dekọọ Ahịa",
      btn_add_expense: "+ Dekọọ Mmefu",
      low_stock_alerts: "Ịdọ Aka Ná Ntị Ngwa",
      inventory_title: "Njikwa Ngwa Ahịa",
      btn_add_product: "+ Tinye Ngwa Ọhụrụ",
      sales_title: "Dekọọ Ahịa Ọhụrụ (Ọtụtụ Ngwa)",
      add_to_cart: "Tinye Ngwa na Nkata",
      select_product: "Họrọ Ngwa",
      quantity: "Ọnụọgụ",
      unit_price: "Ọnụahịa Otu",
      btn_add_cart: "+ Tinye na Nkata",
      current_cart: "Nkata Ugbu A",
      btn_clear_cart: "Hichaa",
      cart_total: "Ngụkọta Nkata:",
      customer_name: "Aha Onye Zụrụ Ahịa",
      payment_method: "Ụzọ Ịkwụ Ụgwọ",
      btn_complete_sale: "Mechie Ahịa & Mepụta Nnata",
      expenses_title: "Mmefu Kwa Ụbọchị",
      expense_title_label: "Nkọwa Mmefu",
      expense_amount_label: "Ego",
      btn_save_expense: "Chekwaa Mmefu",
      debt_title: "Nlekota Ụgwọ Ndị Ahịa",
      ai_title: "Onye Enyemaka Azụmahịa AI",
      ai_subtitle: "Site na sava KoboLedger — ọ dịghị mkpa igodo API nke gị.",
      ai_prompt_label: "Kedu ihe ịchọrọ enyemaka na ya?",
      btn_generate_ai: "Mepụta site na AI",
      ai_response_title: "Nzaghachi AI",
      settings_title: "Ntọala Ụlọ Ahịa na Ego",
      shop_name_label: "Aha Ụlọ Ahịa",
      whatsapp_label: "WhatsApp (nhọrọ, tinyere koodu obodo)",
      bank_label: "Nkọwa Ụlọ Akụ / Ịkwụ Ụgwọ",
      language_label: "Asụsụ",
      country_currency_label: "Obodo / Ego",
      btn_save_settings: "Chekwaa Ntọala",
      backup_title: "Nchekwa na Mbubata",
      btn_export: "Bupụ JSON",
      btn_import: "Bubata JSON",
      btn_reset: "Tọgharịa Data"
    }
  };

  let appState = {
    languageChosen: false,
    settings: {
      shopName: "KoboLedger",
      whatsapp: "",
      bankDetails: "",
      language: "en",
      country: "NG",
      currencyCode: "NGN",
      currencySymbol: "₦"
    },
    products: [],
    sales: [],
    expenses: [],
    debts: []
  };

  let currentCart = [];
  let latestReceiptText = "";
  let deferredInstallPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btn = document.getElementById("install-app-btn");
    if (btn) btn.style.display = "inline-block";
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    const btn = document.getElementById("install-app-btn");
    if (btn) btn.style.display = "none";
  });

  function triggerInstall() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.finally(() => {
        deferredInstallPrompt = null;
        document.getElementById("install-app-btn").style.display = "none";
      });
    } else {
      alert("Use your browser menu to Add to Home Screen / Install KoboLedger.");
    }
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("SW registration skipped:", err);
      });
    }
  }

  function detectIosBanner() {
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (isIos && !isStandalone) {
      document.getElementById("ios-install-tip").style.display = "block";
    }
  }

  window.onload = function () {
    loadAppData();
    applyTranslations();
    renderAll();
    registerServiceWorker();
    detectIosBanner();

    if (!appState.languageChosen) {
      openLanguageModal(false);
    }
  };

  function loadAppData() {
    const saved = localStorage.getItem("kobo_ledger_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        appState = {
          languageChosen: Boolean(parsed.languageChosen),
          settings: {
            shopName: parsed.settings?.shopName || "KoboLedger",
            whatsapp: parsed.settings?.whatsapp || "",
            bankDetails: parsed.settings?.bankDetails || "",
            language: parsed.settings?.language || "en",
            country: parsed.settings?.country || "NG",
            currencyCode: parsed.settings?.currencyCode || "NGN",
            currencySymbol: parsed.settings?.currencySymbol || "₦"
          },
          products: Array.isArray(parsed.products) ? parsed.products : [],
          sales: Array.isArray(parsed.sales) ? parsed.sales : [],
          expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
          debts: Array.isArray(parsed.debts) ? parsed.debts : []
        };
      } catch (err) {
        console.error("Error loading kobo_ledger_state:", err);
      }
    }
    syncSettingsInputs();
  }

  function saveAppData() {
    localStorage.setItem("kobo_ledger_state", JSON.stringify(appState));
  }

  function formatMoney(amount) {
    const num = Number(amount) || 0;
    const sym = appState.settings.currencySymbol || "₦";
    return sym + num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  function openLanguageModal(manualOpen) {
    const langSelect = document.getElementById("modal-language-select");
    const regionSelect = document.getElementById("modal-region-select");
    langSelect.value = manualOpen ? (appState.settings.language || "en") : "en";
    regionSelect.value = (appState.settings.country || "NG") + "|" + (appState.settings.currencyCode || "NGN") + "|" + (appState.settings.currencySymbol || "₦");
    document.getElementById("language-modal").classList.add("open");
  }

  function confirmLanguageModal(e) {
    e.preventDefault();
    const chosenLang = document.getElementById("modal-language-select").value || "en";
    const [country, currencyCode, currencySymbol] = document.getElementById("modal-region-select").value.split("|");

    appState.settings.language = chosenLang;
    appState.settings.country = country || "GLOBAL";
    appState.settings.currencyCode = currencyCode || "USD";
    appState.settings.currencySymbol = currencySymbol || "$";
    appState.languageChosen = true;

    saveAppData();
    syncSettingsInputs();
    applyTranslations();
    renderAll();
    document.getElementById("language-modal").classList.remove("open");
  }

  function applyTranslations() {
    const lang = appState.settings.language || "en";
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.getElementById("header-lang-label").innerText = lang.toUpperCase();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.innerText = dict[key];
      }
    });
  }

  function switchTab(tabId) {
    const tabs = ["dashboard", "inventory", "sales", "expenses", "debt", "ai-assistant", "settings"];
    document.querySelectorAll("section").forEach((sec) => sec.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"));

    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");

    const idx = tabs.indexOf(tabId);
    const navButtons = document.querySelectorAll(".nav-btn");
    if (idx >= 0 && navButtons[idx]) {
      navButtons[idx].classList.add("active");
    }
  }

  function renderAll() {
    document.getElementById("brand-title").innerText = appState.settings.shopName || "KoboLedger";
    renderDashboard();
    renderInventory();
    renderSalesDropdown();
    renderCart();
    renderExpenses();
    renderDebt();
  }

  function renderDashboard() {
    const todayStr = new Date().toISOString().split("T")[0];
    let todaySales = 0;
    let todayGrossProfit = 0;
    let todayExpenses = 0;
    let totalDebt = 0;
    let lowStockCount = 0;
    let lowStockHtml = "";

    appState.sales.forEach((sale) => {
      if (sale.date && sale.date.startsWith(todayStr)) {
        todaySales += Number(sale.total) || 0;
        todayGrossProfit += Number(sale.profit) || 0;
      }
    });

    appState.expenses.forEach((exp) => {
      if (exp.date && exp.date.startsWith(todayStr)) {
        todayExpenses += Number(exp.amount) || 0;
      }
    });

    const netProfitToday = todayGrossProfit - todayExpenses;

    appState.debts.forEach((debt) => {
      if (debt.status === "Unpaid") {
        totalDebt += Number(debt.amount) || 0;
      }
    });

    appState.products.forEach((p) => {
      if (Number(p.stock) <= Number(p.threshold)) {
        lowStockCount++;
        lowStockHtml += '<div class="card low-stock"><div style="display:flex; justify-content:space-between; align-items:center;"><strong>' + escapeHtml(p.name) + '</strong><span class="badge-low">Stock: ' + p.stock + '</span></div></div>';
      }
    });

    document.getElementById("stat-today-sales").innerText = formatMoney(todaySales);
    const profitEl = document.getElementById("stat-today-profit");
    profitEl.innerText = formatMoney(netProfitToday);
    profitEl.classList.toggle("negative", netProfitToday < 0);

    document.getElementById("stat-today-expenses").innerText = formatMoney(todayExpenses);
    document.getElementById("stat-total-debt").innerText = formatMoney(totalDebt);
    document.getElementById("stat-low-stock").innerText = lowStockCount;
    document.getElementById("stat-low-stock-sub").innerText = `;{lowStockCount} product(s) ; or ; threshold`;
    document.getElementById("dashboard-low-stock-list").innerHTML = lowStockHtml || '<p class="muted">All stock levels are healthy.</p>';
  }

  function renderInventory() {
    if (!appState.products.length) {
      document.getElementById("inventory-list").innerHTML = '<p class="muted">No products added yet. Tap "+ Add New Product" above.</p>';
      return;
    }

    let html = "";
    appState.products.forEach((p, idx) => {
      const isLow = Number(p.stock) <= Number(p.threshold);
      html += `
        <div class="card ${isLow ? "low-stock" : ""}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.75rem;">
            <div>
              <h3 style="margin:0 0 0.35rem 0;">${escapeHtml(p.name)}</h3>
              <p style="margin:0;" class="muted">Cost: ${formatMoney(p.costPrice)} • Sell: ${formatMoney(p.sellingPrice)}</p>
              <p style="margin:0.35rem 0 0 0; font-weight:700;">Stock: <span style="color:${isLow ? "var(--danger)" : "inherit"}">${p.stock}</span> units</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.35rem;">
              <button type="button" class="btn-secondary" style="background-color:var(--accent-color); padding:0.3rem 0.65rem;" onclick="openEditProductModal(${idx})">Edit</button>
              <button type="button" class="btn-secondary" style="background-color:var(--danger); padding:0.3rem 0.65rem;" onclick="deleteProduct(${idx})">Delete</button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("inventory-list").innerHTML = html;
  }

  function openAddProductModal() {
    document.getElementById("product-modal-title").innerText = "Add Product";
    document.getElementById("product-form").reset();
    document.getElementById("product-index").value = "";
    document.getElementById("product-threshold").value = "5";
    document.getElementById("product-modal").classList.add("open");
  }

  function openEditProductModal(idx) {
    const p = appState.products[idx];
    document.getElementById("product-modal-title").innerText = "Edit Product";
    document.getElementById("product-index").value = idx;
    document.getElementById("product-name").value = p.name;
    document.getElementById("product-cost").value = p.costPrice;
    document.getElementById("product-selling").value = p.sellingPrice;
    document.getElementById("product-stock").value = p.stock;
    document.getElementById("product-threshold").value = p.threshold;
    document.getElementById("product-modal").classList.add("open");
  }

  function closeProductModal() {
    document.getElementById("product-modal").classList.remove("open");
  }

  function saveProduct(e) {
    e.preventDefault();
    const idx = document.getElementById("product-index").value;
    const item = {
      name: document.getElementById("product-name").value.trim(),
      costPrice: parseFloat(document.getElementById("product-cost").value),
      sellingPrice: parseFloat(document.getElementById("product-selling").value),
      stock: parseInt(document.getElementById("product-stock").value, 10),
      threshold: parseInt(document.getElementById("product-threshold").value, 10)
    };

    if (idx === "") {
      appState.products.push(item);
    } else {
      appState.products[parseInt(idx, 10)] = item;
    }

    saveAppData();
    closeProductModal();
    renderAll();
  }

  function deleteProduct(idx) {
    if (confirm("Delete this product from inventory?")) {
      appState.products.splice(idx, 1);
      saveAppData();
      renderAll();
    }
  }

  function renderSalesDropdown() {
    let options = '<option value="">-- Select a Product --</option>';
    appState.products.forEach((p, i) => {
      options += `<option value="${i}">${escapeHtml(p.name)} (Stock: ${p.stock} • ${formatMoney(p.sellingPrice)})</option>`;
    });
    document.getElementById("sale-product-select").innerHTML = options;
  }

  function updateSalePrice() {
    const idx = document.getElementById("sale-product-select").value;
    if (idx !== "" && appState.products[idx]) {
      document.getElementById("sale-selling-price").value = appState.products[idx].sellingPrice;
    }
  }

  function addItemToCart(e) {
    e.preventDefault();
    const idxVal = document.getElementById("sale-product-select").value;
    if (idxVal === "") return;

    const productIndex = parseInt(idxVal, 10);
    const product = appState.products[productIndex];
    const qty = parseInt(document.getElementById("sale-quantity").value, 10);
    const unitPrice = parseFloat(document.getElementById("sale-selling-price").value);

    const existingCartItem = currentCart.find((c) => c.productIndex === productIndex);
    const alreadyInCartQty = existingCartItem ? existingCartItem.quantity : 0;

    if (qty + alreadyInCartQty > Number(product.stock)) {
      alert(`Only ${product.stock} unit(s) of ${product.name} available in stock.`);
      return;
    }

    if (existingCartItem) {
      existingCartItem.quantity += qty;
      existingCartItem.unitPrice = unitPrice;
    } else {
      currentCart.push({
        productIndex,
        name: product.name,
        costPrice: Number(product.costPrice) || 0,
        quantity: qty,
        unitPrice
      });
    }

    document.getElementById("sale-quantity").value = "1";
    renderCart();
  }

  function removeCartItem(cartIdx) {
    currentCart.splice(cartIdx, 1);
    renderCart();
  }

  function clearCart() {
    currentCart = [];
    renderCart();
  }

  function renderCart() {
    const listEl = document.getElementById("cart-items-list");
    if (!currentCart.length) {
      listEl.innerHTML = '<p class="muted">Cart is empty. Add products above.</p>';
      document.getElementById("cart-total-display").innerText = formatMoney(0);
      return;
    }

    let total = 0;
    let html = "";
    currentCart.forEach((item, i) => {
      const lineTotal = item.quantity * item.unitPrice;
      total += lineTotal;
      html += `
        <div class="cart-row">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <div class="muted">${item.quantity} × ${formatMoney(item.unitPrice)} = <strong>${formatMoney(lineTotal)}</strong></div>
          </div>
          <button type="button" class="btn-outline" onclick="removeCartItem(${i})">✕</button>
        </div>
      `;
    });

    listEl.innerHTML = html;
    document.getElementById("cart-total-display").innerText = formatMoney(total);
  }

  function processCartSale(e) {
    e.preventDefault();
    if (!currentCart.length) {
      alert("Please add at least one item to the cart before completing the sale.");
      return;
    }

    for (const item of currentCart) {
      const prod = appState.products[item.productIndex];
      if (!prod || Number(prod.stock) < item.quantity) {
        alert(`Insufficient stock for ${item.name}.`);
        return;
      }
    }

    let grandTotal = 0;
    let totalProfit = 0;
    const itemLines = [];

    currentCart.forEach((item) => {
      const prod = appState.products[item.productIndex];
      prod.stock = Number(prod.stock) - item.quantity;
      const lineTotal = item.quantity * item.unitPrice;
      const lineCost = item.quantity * (Number(prod.costPrice) || 0);
      grandTotal += lineTotal;
      totalProfit += (lineTotal - lineCost);
      itemLines.push(`${item.name} (${item.quantity} x ${formatMoney(item.unitPrice)}) = ${formatMoney(lineTotal)}`);
    });

    const customerName = document.getElementById("sale-customer-name").value.trim();
    const paymentMethod = document.getElementById("sale-payment-method").value;
    const nowIso = new Date().toISOString();
    const reference = "TXN-" + Math.floor(100000 + Math.random() * 900000);

    appState.sales.push({
      date: nowIso,
      items: currentCart.map((c) => ({ name: c.name, quantity: c.quantity, unitPrice: c.unitPrice })),
      total: grandTotal,
      profit: totalProfit,
      customerName,
      paymentMethod,
      reference,
      currencyCode: appState.settings.currencyCode
    });

    if (paymentMethod === "Credit") {
      appState.debts.push({
        date: nowIso.split("T")[0],
        customerName,
        amount: grandTotal,
        reference,
        status: "Unpaid"
      });
    }

    saveAppData();

    const bankLine = appState.settings.bankDetails
      ? `
Payment Details:
${appState.settings.bankDetails}`
      : "";

    latestReceiptText =
`====================================
${(appState.settings.shopName || "KoboLedger").toUpperCase()}
====================================
Date: ${new Date().toLocaleString()}
Ref: ${reference}
Customer: ${customerName}
------------------------------------
${itemLines.join("
")}
------------------------------------
TOTAL: ${formatMoney(grandTotal)}
Payment: ${paymentMethod}${bankLine}

Thank you for your patronage!`;

    document.getElementById("receipt-preview").innerText = latestReceiptText;
    document.getElementById("receipt-modal").classList.add("open");

    currentCart = [];
    document.getElementById("checkout-form").reset();
    renderAll();
  }

  function closeReceiptModal() {
    document.getElementById("receipt-modal").classList.remove("open");
  }

  function sendWhatsAppReceipt() {
    const encoded = encodeURIComponent(latestReceiptText);
    const phone = (appState.settings.whatsapp || "").replace(/\D/g, "");
    const url = phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(url, "_blank");
  }

  function addExpense(e) {
    e.preventDefault();
    const desc = document.getElementById("expense-desc").value.trim();
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const method = document.getElementById("expense-method").value;

    appState.expenses.unshift({
      date: new Date().toISOString(),
      description: desc,
      amount,
      method
    });

    saveAppData();
    document.getElementById("expense-form").reset();
    renderAll();
  }

  function deleteExpense(idx) {
    if (confirm("Remove this expense entry?")) {
      appState.expenses.splice(idx, 1);
      saveAppData();
      renderAll();
    }
  }

  function renderExpenses() {
    if (!appState.expenses.length) {
      document.getElementById("expenses-list").innerHTML = '<p class="muted">No expenses logged yet.</p>';
      return;
    }

    let html = "";
    appState.expenses.forEach((exp, idx) => {
      html += `
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
            <div>
              <strong>${escapeHtml(exp.description)}</strong>
              <div class="muted">${(exp.date || "").split("T")[0]} • ${escapeHtml(exp.method || "Cash")}</div>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <strong style="color:var(--danger);">${formatMoney(exp.amount)}</strong>
              <button type="button" class="btn-outline" onclick="deleteExpense(${idx})">✕</button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("expenses-list").innerHTML = html;
  }

  function renderDebt() {
    if (!appState.debts.length) {
      document.getElementById("debt-list").innerHTML = '<p class="muted">No customer debts recorded.</p>';
      return;
    }

    let html = "";
    appState.debts.forEach((debt, idx) => {
      html += `
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
            <div>
              <h3 style="margin:0;">${escapeHtml(debt.customerName)}</h3>
              <p style="margin:0.25rem 0; font-weight:700; color:var(--danger);">Owes: ${formatMoney(debt.amount)}</p>
              <p style="margin:0;" class="muted">Date: ${escapeHtml(debt.date)} • Ref: ${escapeHtml(debt.reference)}</p>
            </div>
            <div>
              ${debt.status === "Unpaid"
                ? `<button type="button" class="btn-primary" onclick="markDebtPaid(${idx})">Mark Paid</button>`
                : `<span style="color:var(--primary-color); font-weight:700;">✓ Paid</span>`
              }
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("debt-list").innerHTML = html;
  }

  function markDebtPaid(idx) {
    if (confirm("Mark this customer debt as paid?")) {
      appState.debts[idx].status = "Paid";
      saveAppData();
      renderAll();
    }
  }

  async function askAI(e) {
    e.preventDefault();
    const promptType = document.getElementById("ai-prompt-type").value;
    const contextInput = document.getElementById("ai-context-input").value.trim();
    const outputEl = document.getElementById("ai-response-output");

    if (!contextInput) return;

    outputEl.innerText = "Generating response...";

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptType,
          context: contextInput,
          language: appState.settings.language || "en",
          currencyCode: appState.settings.currencyCode || "NGN",
          shopName: appState.settings.shopName || "KoboLedger"
        })
      });

      const data = await res.json();
      if (!res.ok) {
        outputEl.innerText = data.error || "Unable to generate response right now.";
        return;
      }
      outputEl.innerText = data.reply || "No text returned.";
    } catch (err) {
      console.error("AI error:", err);
      outputEl.innerText = "Network error while contacting AI assistant.";
    }
  }

  function syncSettingsInputs() {
    document.getElementById("setting-shop-name").value = appState.settings.shopName || "KoboLedger";
    document.getElementById("setting-whatsapp").value = appState.settings.whatsapp || "";
    document.getElementById("setting-bank-details").value = appState.settings.bankDetails || "";
    document.getElementById("setting-language").value = appState.settings.language || "en";
    document.getElementById("setting-region").value =
      `${appState.settings.country || "NG"}|${appState.settings.currencyCode || "NGN"}|${appState.settings.currencySymbol || "₦"}`;
  }

  function applyRegionPreset() {
    const [country, currencyCode, currencySymbol] = document.getElementById("setting-region").value.split("|");
    appState.settings.country = country || "GLOBAL";
    appState.settings.currencyCode = currencyCode || "USD";
    appState.settings.currencySymbol = currencySymbol || "$";
  }

  function saveSettings(e) {
    e.preventDefault();
    appState.settings.shopName = document.getElementById("setting-shop-name").value.trim() || "KoboLedger";
    appState.settings.whatsapp = document.getElementById("setting-whatsapp").value.trim();
    appState.settings.bankDetails = document.getElementById("setting-bank-details").value.trim();
    appState.settings.language = document.getElementById("setting-language").value || "en";
    appState.languageChosen = true;
    applyRegionPreset();

    saveAppData();
    applyTranslations();
    renderAll();
    alert("Settings saved.");
  }

  function exportData() {
    const payload = JSON.stringify(appState, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `koboledger_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importData(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const imported = JSON.parse(evt.target.result);
        if (!imported || typeof imported !== "object") {
          alert("Invalid backup JSON file.");
          return;
        }
        appState = {
          languageChosen: true,
          settings: {
            shopName: imported.settings?.shopName || "KoboLedger",
            whatsapp: imported.settings?.whatsapp || "",
            bankDetails: imported.settings?.bankDetails || "",
            language: imported.settings?.language || "en",
            country: imported.settings?.country || "NG",
            currencyCode: imported.settings?.currencyCode || "NGN",
            currencySymbol: imported.settings?.currencySymbol || "₦"
          },
          products: Array.isArray(imported.products) ? imported.products : [],
          sales: Array.isArray(imported.sales) ? imported.sales : [],
          expenses: Array.isArray(imported.expenses) ? imported.expenses : [],
          debts: Array.isArray(imported.debts) ? imported.debts : []
        };
        saveAppData();
        syncSettingsInputs();
        applyTranslations();
        renderAll();
        alert("Backup restored successfully.");
      } catch (err) {
        alert("Could not parse JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function resetAppData() {
    if (confirm("This will clear all local products, sales, expenses, and debts on this device. Continue?")) {
      localStorage.removeItem("kobo_ledger_state");
      location.reload();
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
</script>
</body>
</html>
`;

// Minimal valid 1x1 PNG icon placeholder for PWA manifest so /icon-192.png & /icon-512.png never 404
const TINY_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/manifest.json") {
      return new Response(JSON.stringify(MANIFEST_JSON, null, 2), {
        headers: { "Content-Type": "application/manifest+json; charset=utf-8" }
      });
    }

    if (url.pathname === "/sw.js") {
      return new Response(SERVICE_WORKER_JS, {
        headers: {
          "Content-Type": "application/javascript; charset=utf-8",
          "Service-Worker-Allowed": "/"
        }
      });
    }

    if (url.pathname === "/icon-192.png" || url.pathname === "/icon-512.png") {
      return new Response(base64ToBytes(TINY_PNG_BASE64), {
        headers: { "Content-Type": "image/png" }
      });
    }

    if (url.pathname === "/api/ai") {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" }
        });
      }

      const apiKey = env.GROQ_API_KEY;
      if (!apiKey) {
        return new Response(
          JSON.stringify({
            error: "GROQ_API_KEY is not configured yet in Cloudflare Worker Secrets."
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      try {
        const body = await request.json();
        const promptType = body.promptType || "biz-advice";
        const context = String(body.context || "").trim();
        const language = body.language || "en";
        const currencyCode = body.currencyCode || "USD";
        const shopName = body.shopName || "KoboLedger";

        let taskInstruction = "";
        if (promptType === "status") {
          taskInstruction = `Write a catchy short promotional post for "${context}" sold by "${shopName}" (currency: ${currencyCode}).`;
        } else if (promptType === "reply") {
          taskInstruction = `Draft a polite, clear payment reminder message regarding "${context}" for "${shopName}" (currency: ${currencyCode}).`;
        } else {
          taskInstruction = `Give practical business, pricing, and stock advice for "${context}" at "${shopName}" (currency: ${currencyCode}).`;
        }

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `You are a helpful retail and small-business assistant. Reply in language code "${language}". Keep responses practical, clear, and concise.`
              },
              {
                role: "user",
                content: taskInstruction
              }
            ],
            temperature: 0.7
          })
        });

        const groqData = await groqRes.json();
        const replyText = groqData?.choices?.[0]?.message?.content;

        if (!groqRes.ok || !replyText) {
          return new Response(
            JSON.stringify({ error: groqData?.error?.message || "AI service error" }),
            { status: 502, headers: { "Content-Type": "application/json" } }
          );
        }

        return new Response(JSON.stringify({ reply: replyText }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid request or server error" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return new Response(INDEX_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
