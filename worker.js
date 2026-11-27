const MANIFEST_JSON = {
  name: "KoboLedger — Business Pocket Assistant",
  short_name: "KoboLedger",
  description: "International multi-currency ledger, multi-item cart, expense & debt tracker, low-stock inventory, and AI assistant.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#0b1220",
  theme_color: "#0f766e",
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

const CURRENCIES = {
  NGN: { code: "NGN", symbol: "₦", name: "Nigerian Naira", rateFromNGN: 1 },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateFromNGN: 1 / 1600 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateFromNGN: 1 / 1730 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rateFromNGN: 1 / 2030 },
  XAF: { code: "XAF", symbol: "FCFA ", name: "Central African CFA Franc", rateFromNGN: 615 / 1730 },
  CLP: { code: "CLP", symbol: "$", name: "Chilean Peso", rateFromNGN: 960 / 1600 }
};

const SERVICE_WORKER_JS = `
const CACHE_NAME = "koboledger-v1";
const CORE_ASSETS = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
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
      return fetch(event.request).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => caches.match("/"));
    })
  );
});
`.trim();

function makeSvgIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#0b1220"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#bg)"/>
  <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.31}" fill="none" stroke="#5eead4" stroke-width="${Math.max(4, Math.round(size * 0.04))}"/>
  <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="${Math.round(size * 0.34)}">K</text>
</svg>`;
}

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KoboLedger — Business Pocket Assistant</title>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0f766e" />
  <style>
    :root {
      --bg: #090f1c;
      --surface: #111b2e;
      --surface-2: #17253f;
      --border: #263859;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --accent: #14b8a6;
      --accent-dark: #0f766e;
      --good: #22c55e;
      --warn: #f59e0b;
      --bad: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 4rem;
    }
    header {
      background: linear-gradient(135deg, var(--accent-dark), #0b1220 75%);
      border-bottom: 1px solid var(--border);
      padding: 1rem 1.25rem;
      position: sticky;
      top: 0;
      z-index: 20;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }
    .brand h1 { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; }
    .brand p { font-size: 0.8rem; color: #cbd5e1; }
    .header-controls { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    select, input, textarea, button {
      font-family: inherit;
      font-size: 0.92rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      padding: 0.5rem 0.7rem;
    }
    button {
      cursor: pointer;
      font-weight: 600;
      transition: opacity 0.15s ease, background 0.15s ease;
    }
    button:hover { opacity: 0.92; }
    .btn-primary {
      background: var(--accent);
      color: #041014;
      border-color: transparent;
    }
    .btn-danger {
      background: rgba(239, 68, 68, 0.15);
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.4);
    }
    .btn-ghost { background: var(--surface-2); color: var(--text); }
    main { max-width: 1120px; margin: 1.25rem auto; padding: 0 1rem; }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 0.85rem;
      margin-bottom: 1.25rem;
    }
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 0.95rem 1rem;
    }
    .stat-label { font-size: 0.78rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
    .stat-value { font-size: 1.35rem; font-weight: 800; margin-top: 0.25rem; }
    .good { color: var(--good); }
    .warn { color: var(--warn); }
    .bad { color: var(--bad); }
    .tabs {
      display: flex;
      gap: 0.45rem;
      overflow-x: auto;
      padding-bottom: 0.4rem;
      margin-bottom: 1rem;
    }
    .tab-btn {
      background: var(--surface);
      color: var(--muted);
      border: 1px solid var(--border);
      padding: 0.55rem 0.9rem;
      white-space: nowrap;
    }
    .tab-btn.active {
      background: var(--accent);
      color: #041014;
      border-color: transparent;
    }
    .panel { display: none; }
    .panel.active { display: block; }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1rem;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .card h2 { font-size: 1.05rem; margin-bottom: 0.75rem; }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.65rem;
      margin-bottom: 0.75rem;
    }
    .form-grid .full { grid-column: 1 / -1; }
    label { display: block; font-size: 0.78rem; color: var(--muted); margin-bottom: 0.25rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th, td {
      text-align: left;
      padding: 0.55rem 0.45rem;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }
    th { color: var(--muted); font-size: 0.78rem; text-transform: uppercase; }
    .badge {
      display: inline-block;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .badge-sale { background: rgba(34, 197, 94, 0.16); color: #86efac; }
    .badge-expense { background: rgba(239, 68, 68, 0.16); color: #fca5a5; }
    .badge-debt { background: rgba(245, 158, 11, 0.16); color: #fcd34d; }
    .badge-low { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
    .badge-ok { background: rgba(34, 197, 94, 0.16); color: #86efac; }
    .chat-box {
      max-height: 360px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      padding: 0.5rem 0;
      margin-bottom: 0.75rem;
    }
    .msg {
      padding: 0.65rem 0.85rem;
      border-radius: 10px;
      max-width: 85%;
      white-space: pre-wrap;
      font-size: 0.9rem;
    }
    .msg-user { align-self: flex-end; background: var(--accent-dark); color: #fff; }
    .msg-ai { align-self: flex-start; background: var(--surface-2); border: 1px solid var(--border); }
    .receipt-box {
      background: var(--surface-2);
      border: 1px dashed var(--border);
      border-radius: 10px;
      padding: 0.85rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.82rem;
      white-space: pre-wrap;
      margin-top: 0.75rem;
    }
    .muted { color: var(--muted); font-size: 0.84rem; }
    .row-actions { display: flex; gap: 0.35rem; flex-wrap: wrap; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <h1>KoboLedger</h1>
      <p>Multi-currency ledger, cart, low-stock inventory &amp; AI pocket assistant</p>
    </div>
    <div class="header-controls">
      <label for="currencySelect" class="muted" style="margin:0;">Display Currency:</label>
      <select id="currencySelect">
        <option value="NGN">NGN (₦)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="XAF">XAF (FCFA)</option>
        <option value="CLP">CLP ($)</option>
      </select>
      <button id="exportBtn" class="btn-ghost" type="button">Export JSON</button>
    </div>
  </header>

  <main>
    <section class="stats" id="statsGrid"></section>

    <nav class="tabs" role="tablist">
      <button class="tab-btn active" data-tab="ledger" type="button">Ledger &amp; Debts</button>
      <button class="tab-btn" data-tab="cart" type="button">Multi-Item Cart</button>
      <button class="tab-btn" data-tab="inventory" type="button">Inventory &amp; Low Stock</button>
      <button class="tab-btn" data-tab="ai" type="button">AI Assistant</button>
    </nav>

    <!-- TAB 1: LEDGER & DEBTS -->
    <section class="panel active" id="panel-ledger">
      <div class="grid-2">
        <div class="card">
          <h2>Record Transaction / Debt</h2>
          <form id="txForm" class="form-grid">
            <div>
              <label for="txType">Type</label>
              <select id="txType">
                <option value="sale">Sale (+)</option>
                <option value="expense">Expense (-)</option>
                <option value="debt">Credit / Debt Owed</option>
              </select>
            </div>
            <div>
              <label for="txAmount">Amount (in selected currency)</label>
              <input id="txAmount" type="number" step="0.01" min="0.01" required placeholder="5000" />
            </div>
            <div>
              <label for="txParty">Customer / Vendor / Note</label>
              <input id="txParty" type="text" required placeholder="e.g. Musa — Rice & Oil" />
            </div>
            <div>
              <label for="txStatus">Settlement Status</label>
              <select id="txStatus">
                <option value="paid">Paid / Settled</option>
                <option value="unpaid">Unpaid / Pending</option>
              </select>
            </div>
            <div class="full">
              <button type="submit" class="btn-primary" style="width:100%;">Save Entry</button>
            </div>
          </form>
        </div>

        <div class="card">
          <h2>Quick Filter &amp; Summary</h2>
          <div class="form-grid">
            <div>
              <label for="filterType">Show Entries</label>
              <select id="filterType">
                <option value="all">All Entries</option>
                <option value="sale">Sales Only</option>
                <option value="expense">Expenses Only</option>
                <option value="debt">Debts Only</option>
              </select>
            </div>
            <div>
              <label for="filterSearch">Search</label>
              <input id="filterSearch" type="text" placeholder="Search name or note..." />
            </div>
          </div>
          <p class="muted" id="syncStatus">Storage: Ready</p>
        </div>
      </div>

      <div class="card">
        <h2>Ledger History</h2>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="txTableBody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- TAB 2: MULTI-ITEM CART -->
    <section class="panel" id="panel-cart">
      <div class="grid-2">
        <div class="card">
          <h2>Add Item to Cart</h2>
          <form id="cartAddForm" class="form-grid">
            <div>
              <label for="cartProductSelect">From Inventory (optional)</label>
              <select id="cartProductSelect">
                <option value="">-- Custom item --</option>
              </select>
            </div>
            <div>
              <label for="cartItemName">Item Name</label>
              <input id="cartItemName" type="text" required placeholder="Item name" />
            </div>
            <div>
              <label for="cartQty">Quantity</label>
              <input id="cartQty" type="number" min="1" value="1" required />
            </div>
            <div>
              <label for="cartUnitPrice">Unit Price (selected currency)</label>
              <input id="cartUnitPrice" type="number" step="0.01" min="0.01" required />
            </div>
            <div class="full">
              <button type="submit" class="btn-primary" style="width:100%;">Add to Cart</button>
            </div>
          </form>
        </div>

        <div class="card">
          <h2>Checkout &amp; Receipt</h2>
          <div class="form-grid">
            <div>
              <label for="cartCustomer">Customer Name</label>
              <input id="cartCustomer" type="text" placeholder="Walk-in Customer" />
            </div>
            <div>
              <label for="cartPaymentMode">Payment Mode</label>
              <select id="cartPaymentMode">
                <option value="paid">Cash / Transfer (Paid)</option>
                <option value="unpaid">On Credit (Add to Debt)</option>
              </select>
            </div>
          </div>
          <div style="overflow-x:auto;">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="cartTableBody"></tbody>
            </table>
          </div>
          <div style="margin-top:0.85rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <strong>Total: <span id="cartTotalDisplay">0.00</span></strong>
            <div class="row-actions">
              <button id="clearCartBtn" class="btn-danger" type="button">Clear</button>
              <button id="checkoutCartBtn" class="btn-primary" type="button">Complete Sale &amp; Record</button>
            </div>
          </div>
          <div class="receipt-box" id="receiptBox" style="display:none;"></div>
        </div>
      </div>
    </section>

    <!-- TAB 3: INVENTORY & LOW STOCK -->
    <section class="panel" id="panel-inventory">
      <div class="card">
        <h2>Add or Update Stock Item</h2>
        <form id="invForm" class="form-grid">
          <div>
            <label for="invName">Product Name</label>
            <input id="invName" type="text" required placeholder="e.g. Solar Lamp" />
          </div>
          <div>
            <label for="invPrice">Unit Price (selected currency)</label>
            <input id="invPrice" type="number" step="0.01" min="0.01" required placeholder="12000" />
          </div>
          <div>
            <label for="invStock">Current Stock Qty</label>
            <input id="invStock" type="number" min="0" value="10" required />
          </div>
          <div>
            <label for="invReorder">Low-Stock Alert At</label>
            <input id="invReorder" type="number" min="0" value="3" required />
          </div>
          <div class="full">
            <button type="submit" class="btn-primary" style="width:100%;">Save Inventory Item</button>
          </div>
        </form>
      </div>

      <div class="card">
        <h2>Stock Levels &amp; Low-Stock Alerts</h2>
        <div style="overflow-x:auto;">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>In Stock</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="invTableBody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- TAB 4: AI ASSISTANT -->
    <section class="panel" id="panel-ai">
      <div class="card">
        <h2>KoboLedger AI Assistant</h2>
        <p class="muted" style="margin-bottom:0.5rem;">Ask about profit, unpaid debts, low-stock items, or daily summaries.</p>
        <div class="chat-box" id="chatBox">
          <div class="msg msg-ai">Hello! Ask me to check your low-stock items, calculate net profit, list unpaid debts, or summarize your ledger.</div>
        </div>
        <form id="aiForm" style="display:flex; gap:0.5rem;">
          <input id="aiInput" type="text" placeholder="Ask about low stock, debts, or sales summary..." style="flex:1;" required />
          <button type="submit" class="btn-primary">Ask AI</button>
        </form>
      </div>
    </section>
  </main>

  <script>
    const CURRENCIES = ${JSON.stringify(CURRENCIES)};
    const STORAGE_KEY = "koboledger_state_v1";

    const defaultState = {
      currency: "NGN",
      transactions: [
        { id: "t1", date: new Date().toISOString().slice(0, 10), type: "sale", party: "Opening Cash Sale", amountNGN: 25000, status: "paid" },
        { id: "t2", date: new Date().toISOString().slice(0, 10), type: "expense", party: "Packaging & Delivery", amountNGN: 4500, status: "paid" },
        { id: "t3", date: new Date().toISOString().slice(0, 10), type: "debt", party: "Amina Store (Credit)", amountNGN: 12000, status: "unpaid" }
      ],
      inventory: [
        { id: "p1", name: "Standard Pack", priceNGN: 5000, stock: 12, reorderLevel: 4 },
        { id: "p2", name: "Premium Bundle", priceNGN: 15000, stock: 2, reorderLevel: 3 }
      ],
      cart: []
    };

    let state = loadLocalState();

    function loadLocalState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return structuredClone(defaultState);
        return { ...structuredClone(defaultState), ...JSON.parse(raw) };
      } catch {
        return structuredClone(defaultState);
      }
    }

    async function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
      try {
        const res = await fetch("/api/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state)
        });
        const data = await res.json();
        document.getElementById("syncStatus").textContent =
          data.persisted === "kv" ? "Storage: Synced with Cloudflare KV + Browser" : "Storage: Saved in Browser (bind LEDGER_KV for cloud sync)";
      } catch {
        document.getElementById("syncStatus").textContent = "Storage: Saved in Browser";
      }
      renderAll();
    }

    async function hydrateFromServer() {
      try {
        const res = await fetch("/api/state");
        const data = await res.json();
        if (data && data.state) {
          state = { ...structuredClone(defaultState), ...data.state };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAll();
        }
      } catch {}
    }

    function cur() {
      return CURRENCIES[state.currency] || CURRENCIES.NGN;
    }

    function fromNGN(amountNGN) {
      return Number(amountNGN || 0) * cur().rateFromNGN;
    }

    function toNGN(amountInSelected) {
      return Number(amountInSelected || 0) / cur().rateFromNGN;
    }

    function fmt(amountNGN) {
      const val = fromNGN(amountNGN);
      const decimals = state.currency === "NGN" || state.currency === "XAF" || state.currency === "CLP" ? 0 : 2;
      return cur().symbol + val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    function renderStats() {
      const sales = state.transactions.filter(t => t.type === "sale").reduce((s, t) => s + t.amountNGN, 0);
      const expenses = state.transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amountNGN, 0);
      const unpaidDebts = state.transactions
        .filter(t => t.type === "debt" && t.status !== "paid")
        .reduce((s, t) => s + t.amountNGN, 0);
      const lowStockCount = state.inventory.filter(i => i.stock <= i.reorderLevel).length;
      const net = sales - expenses;

      document.getElementById("statsGrid").innerHTML = `
        <div class="stat-card">
          <div class="stat-label">Total Sales</div>
          <div class="stat-value good">${fmt(sales)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Expenses</div>
          <div class="stat-value bad">${fmt(expenses)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Net Cashflow</div>
          <div class="stat-value ${net >= 0 ? "good" : "bad"}">${fmt(net)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Unpaid Debts</div>
          <div class="stat-value warn">${fmt(unpaidDebts)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Low-Stock Items</div>
          <div class="stat-value ${lowStockCount > 0 ? "bad" : "good"}">${lowStockCount}</div>
        </div>
      `;
    }

    function renderTransactions() {
      const typeFilter = document.getElementById("filterType").value;
      const search = document.getElementById("filterSearch").value.trim().toLowerCase();
      const rows = state.transactions.filter(t => {
        if (typeFilter !== "all" && t.type !== typeFilter) return false;
        if (search && !t.party.toLowerCase().includes(search)) return false;
        return true;
      });

      const tbody = document.getElementById("txTableBody");
      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="muted">No matching transactions.</td></tr>';
        return;
      }

      tbody.innerHTML = rows.map(t => {
        const badgeClass = t.type === "sale" ? "badge-sale" : t.type === "expense" ? "badge-expense" : "badge-debt";
        const sign = t.type === "expense" ? "-" : "+";
        return `
          <tr>
            <td>${t.date}</td>
            <td><span class="badge ${badgeClass}">${t.type.toUpperCase()}</span></td>
            <td>${escapeHtml(t.party)}</td>
            <td>${t.status === "paid" ? "Paid" : '<span class="warn">Unpaid</span>'}</td>
            <td><strong>${sign}${fmt(t.amountNGN)}</strong></td>
            <td class="row-actions">
              ${t.status !== "paid" ? `<button type="button" class="btn-ghost" onclick="markPaid('${t.id}')">Mark Paid</button>` : ""}
              <button type="button" class="btn-danger" onclick="deleteTx('${t.id}')">Delete</button>
            </td>
          </tr>
        `;
      }).join("");
    }

    function renderInventory() {
      const select = document.getElementById("cartProductSelect");
      select.innerHTML = '<option value="">-- Custom item --</option>' +
        state.inventory.map(p => `<option value="${p.id}">${escapeHtml(p.name)} (${fmt(p.priceNGN)}, ${p.stock} left)</option>`).join("");

      const tbody = document.getElementById("invTableBody");
      if (!state.inventory.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="muted">No inventory items yet.</td></tr>';
        return;
      }

      tbody.innerHTML = state.inventory.map(p => {
        const isLow = p.stock <= p.reorderLevel;
        return `
          <tr>
            <td><strong>${escapeHtml(p.name)}</strong></td>
            <td>${fmt(p.priceNGN)}</td>
            <td>${p.stock}</td>
            <td>${p.reorderLevel}</td>
            <td><span class="badge ${isLow ? "badge-low" : "badge-ok"}">${isLow ? "LOW STOCK" : "OK"}</span></td>
            <td class="row-actions">
              <button type="button" class="btn-ghost" onclick="adjustStock('${p.id}', 5)">+5 Stock</button>
              <button type="button" class="btn-ghost" onclick="adjustStock('${p.id}', -1)">-1</button>
              <button type="button" class="btn-danger" onclick="deleteInv('${p.id}')">Remove</button>
            </td>
          </tr>
        `;
      }).join("");
    }

    function renderCart() {
      const tbody = document.getElementById("cartTableBody");
      if (!state.cart.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="muted">Cart is empty.</td></tr>';
        document.getElementById("cartTotalDisplay").textContent = fmt(0);
        return;
      }

      let totalNGN = 0;
      tbody.innerHTML = state.cart.map((item, idx) => {
        const subNGN = item.priceNGN * item.qty;
        totalNGN += subNGN;
        return `
          <tr>
            <td>${escapeHtml(item.name)}</td>
            <td>${item.qty}</td>
            <td>${fmt(item.priceNGN)}</td>
            <td>${fmt(subNGN)}</td>
            <td><button type="button" class="btn-danger" onclick="removeCartItem(${idx})">x</button></td>
          </tr>
        `;
      }).join("");

      document.getElementById("cartTotalDisplay").textContent = fmt(totalNGN);
    }

    function renderAll() {
      document.getElementById("currencySelect").value = state.currency;
      renderStats();
      renderTransactions();
      renderInventory();
      renderCart();
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
    }

    window.markPaid = (id) => {
      const tx = state.transactions.find(t => t.id === id);
      if (tx) { tx.status = "paid"; saveState(); }
    };
    window.deleteTx = (id) => {
      state.transactions = state.transactions.filter(t => t.id !== id);
      saveState();
    };
    window.adjustStock = (id, delta) => {
      const item = state.inventory.find(i => i.id === id);
      if (item) { item.stock = Math.max(0, item.stock + delta); saveState(); }
    };
    window.deleteInv = (id) => {
      state.inventory = state.inventory.filter(i => i.id !== id);
      saveState();
    };
    window.removeCartItem = (idx) => {
      state.cart.splice(idx, 1);
      saveState();
    };

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
      });
    });

    document.getElementById("currencySelect").addEventListener("change", (e) => {
      state.currency = e.target.value;
      saveState();
    });

    document.getElementById("txForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const type = document.getElementById("txType").value;
      const amount = parseFloat(document.getElementById("txAmount").value);
      const party = document.getElementById("txParty").value.trim();
      const status = document.getElementById("txStatus").value;
      if (!party || isNaN(amount) || amount <= 0) return;

      state.transactions.unshift({
        id: "tx_" + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        type,
        party,
        amountNGN: toNGN(amount),
        status
      });
      e.target.reset();
      saveState();
    });

    document.getElementById("filterType").addEventListener("change", renderTransactions);
    document.getElementById("filterSearch").addEventListener("input", renderTransactions);

    document.getElementById("invForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("invName").value.trim();
      const priceNGN = toNGN(parseFloat(document.getElementById("invPrice").value));
      const stock = parseInt(document.getElementById("invStock").value, 10);
      const reorderLevel = parseInt(document.getElementById("invReorder").value, 10);
      if (!name || isNaN(priceNGN)) return;

      const existing = state.inventory.find(i => i.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        existing.priceNGN = priceNGN;
        existing.stock = stock;
        existing.reorderLevel = reorderLevel;
      } else {
        state.inventory.push({ id: "p_" + Date.now(), name, priceNGN, stock, reorderLevel });
      }
      e.target.reset();
      saveState();
    });

    document.getElementById("cartProductSelect").addEventListener("change", (e) => {
      const prod = state.inventory.find(i => i.id === e.target.value);
      if (prod) {
        document.getElementById("cartItemName").value = prod.name;
        document.getElementById("cartUnitPrice").value = Number(fromNGN(prod.priceNGN).toFixed(2));
      }
    });

    document.getElementById("cartAddForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const invId = document.getElementById("cartProductSelect").value || null;
      const name = document.getElementById("cartItemName").value.trim();
      const qty = parseInt(document.getElementById("cartQty").value, 10);
      const priceNGN = toNGN(parseFloat(document.getElementById("cartUnitPrice").value));
      if (!name || qty < 1 || isNaN(priceNGN)) return;

      state.cart.push({ invId, name, qty, priceNGN });
      e.target.reset();
      saveState();
    });

    document.getElementById("clearCartBtn").addEventListener("click", () => {
      state.cart = [];
      saveState();
    });

    document.getElementById("checkoutCartBtn").addEventListener("click", () => {
      if (!state.cart.length) return;
      const customer = document.getElementById("cartCustomer").value.trim() || "Walk-in Customer";
      const mode = document.getElementById("cartPaymentMode").value;
      const totalNGN = state.cart.reduce((s, item) => s + item.priceNGN * item.qty, 0);

      for (const item of state.cart) {
        const inv = item.invId
          ? state.inventory.find(i => i.id === item.invId)
          : state.inventory.find(i => i.name.toLowerCase() === item.name.toLowerCase());
        if (inv) {
          inv.stock = Math.max(0, inv.stock - item.qty);
        }
      }

      state.transactions.unshift({
        id: "tx_" + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        type: mode === "unpaid" ? "debt" : "sale",
        party: `${customer} (${state.cart.map(i => i.name + " x" + i.qty).join(", ")})`,
        amountNGN: totalNGN,
        status: mode
      });

      const receiptLines = [
        "=== KOBOLEDGER RECEIPT ===",
        "Date: " + new Date().toLocaleString(),
        "Customer: " + customer,
        "Status: " + (mode === "unpaid" ? "UNPAID DEBT" : "PAID"),
        "--------------------------",
        ...state.cart.map(i => `${i.name} x${i.qty} = ${fmt(i.priceNGN * i.qty)}`),
        "--------------------------",
        "TOTAL: " + fmt(totalNGN)
      ].join("\\n");

      const receiptBox = document.getElementById("receiptBox");
      receiptBox.textContent = receiptLines;
      receiptBox.style.display = "block";

      state.cart = [];
      document.getElementById("cartCustomer").value = "";
      saveState();
    });

    document.getElementById("exportBtn").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `koboledger-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById("aiForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("aiInput");
      const prompt = input.value.trim();
      if (!prompt) return;

      const chatBox = document.getElementById("chatBox");
      chatBox.innerHTML += `<div class="msg msg-user">${escapeHtml(prompt)}</div>`;
      input.value = "";
      chatBox.scrollTop = chatBox.scrollHeight;

      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, state, displayCurrency: state.currency })
        });
        const data = await res.json();
        chatBox.innerHTML += `<div class="msg msg-ai">${escapeHtml(data.reply || "No response")}</div>`;
      } catch {
        chatBox.innerHTML += `<div class="msg msg-ai">Unable to reach /api/ai right now.</div>`;
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    renderAll();
    hydrateFromServer();
  </script>
</body>
</html>`;

function buildLocalAssistantReply(prompt, state, displayCurrency) {
  const q = String(prompt || "").toLowerCase();
  const cur = CURRENCIES[displayCurrency] || CURRENCIES.NGN;
  const fmtLocal = (ngn) => cur.symbol + (Number(ngn || 0) * cur.rateFromNGN).toFixed(2);

  const sales = (state.transactions || []).filter(t => t.type === "sale").reduce((s, t) => s + Number(t.amountNGN || 0), 0);
  const expenses = (state.transactions || []).filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amountNGN || 0), 0);
  const unpaidDebts = (state.transactions || []).filter(t => t.type === "debt" && t.status !== "paid");
  const lowStock = (state.inventory || []).filter(i => Number(i.stock) <= Number(i.reorderLevel));

  if (q.includes("stock") || q.includes("low") || q.includes("inventory")) {
    if (!lowStock.length) return "All inventory items are currently above their low-stock reorder levels.";
    return "Low-stock items:\n" + lowStock.map(i => `- ${i.name}: ${i.stock} left (alert at ${i.reorderLevel})`).join("\n");
  }

  if (q.includes("debt") || q.includes("owe") || q.includes("unpaid")) {
    if (!unpaidDebts.length) return "You have no unpaid debts recorded right now.";
    const totalDebt = unpaidDebts.reduce((s, t) => s + Number(t.amountNGN || 0), 0);
    return `Unpaid debts total ${fmtLocal(totalDebt)}:\n` + unpaidDebts.map(d => `- ${d.party}: ${fmtLocal(d.amountNGN)}`).join("\n");
  }

  return [
    `KoboLedger Summary (${cur.code}):`,
    `- Sales: ${fmtLocal(sales)}`,
    `- Expenses: ${fmtLocal(expenses)}`,
    `- Net Cashflow: ${fmtLocal(sales - expenses)}`,
    `- Unpaid Debts: ${unpaidDebts.length} item(s)`,
    `- Low-Stock Alerts: ${lowStock.length} item(s)`
  ].join("\n");
}

async function handleAiRequest(request, env) {
  const body = await request.json().catch(() => ({}));
  const prompt = body.prompt || "";
  const state = body.state || {};
  const displayCurrency = body.displayCurrency || state.currency || "NGN";

  if (env && env.OPENAI_API_KEY) {
    try {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are KoboLedger's concise business assistant. Display currency: ${displayCurrency}. Ledger data: ${JSON.stringify(state).slice(0, 8000)}`
            },
            { role: "user", content: prompt }
          ]
        })
      });
      if (r.ok) {
        const j = await r.json();
        const reply = j.choices?.[0]?.message?.content;
        if (reply) return Response.json({ reply, source: "openai" });
      }
    } catch {}
  }

  if (env && env.GEMINI_API_KEY) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are KoboLedger's concise business assistant. Display currency: ${displayCurrency}. Ledger data: ${JSON.stringify(state).slice(0, 8000)}\n\nUser question: ${prompt}`
                  }
                ]
              }
            ]
          })
        }
      );
      if (r.ok) {
        const j = await r.json();
        const reply = j.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return Response.json({ reply, source: "gemini" });
      }
    } catch {}
  }

  return Response.json({
    reply: buildLocalAssistantReply(prompt, state, displayCurrency),
    source: "local"
  });
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
      return Response.json({ ok: true, service: "koboledger", hasKV: Boolean(env && env.LEDGER_KV) });
    }

    if (url.pathname === "/api/state") {
      if (request.method === "GET") {
        if (env && env.LEDGER_KV) {
          const saved = await env.LEDGER_KV.get("koboledger_state", { type: "json" });
          return Response.json({ state: saved, persisted: "kv" });
        }
        return Response.json({ state: null, persisted: "local" });
      }
      if (request.method === "POST") {
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== "object") {
          return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
        }
        if (env && env.LEDGER_KV) {
          await env.LEDGER_KV.put("koboledger_state", JSON.stringify(body));
          return Response.json({ ok: true, persisted: "kv" });
        }
        return Response.json({ ok: true, persisted: "local" });
      }
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (url.pathname === "/api/ai") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleAiRequest(request, env);
    }

    return new Response(INDEX_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
