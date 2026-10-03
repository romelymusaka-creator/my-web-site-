// ==============================
// SALONPRO
// Application de gestion salon
// ==============================


// DONNÉES
const clients = [

  {
    name: "Alice Mukamana",
    phone: "078 245 6812",
    visits: 12,
    spent: 186000,
    points: 420
  },

  {
    name: "Claudine Uwase",
    phone: "072 814 9035",
    visits: 8,
    spent: 124500,
    points: 280
  },

  {
    name: "Diane Ingabire",
    phone: "079 338 2170",
    visits: 15,
    spent: 278000,
    points: 650
  },

  {
    name: "Jeanne Mutoni",
    phone: "073 102 4451",
    visits: 5,
    spent: 73500,
    points: 150
  }

];


const services = [

  {
    name: "Coupe femme",
    price: 12000,
    duration: "45 min",
    icon: "✂"
  },

  {
    name: "Brushing",
    price: 10000,
    duration: "40 min",
    icon: "✦"
  },

  {
    name: "Coloration",
    price: 30000,
    duration: "90 min",
    icon: "◉"
  },

  {
    name: "Tresses",
    price: 25000,
    duration: "120 min",
    icon: "≋"
  },

  {
    name: "Coupe homme",
    price: 8000,
    duration: "30 min",
    icon: "✂"
  },

  {
    name: "Soin profond",
    price: 15000,
    duration: "50 min",
    icon: "◇"
  }

];


const products = [

  {
    name: "Shampooing Réparateur",
    price: 12500,
    stock: 3,
    icon: "◒"
  },

  {
    name: "Masque Hydratant",
    price: 15000,
    stock: 2,
    icon: "◓"
  },

  {
    name: "Huile Capillaire",
    price: 8500,
    stock: 8,
    icon: "◐"
  },

  {
    name: "Spray Thermoprotecteur",
    price: 11000,
    stock: 14,
    icon: "◑"
  },

  {
    name: "Gel Coiffant Pro",
    price: 7500,
    stock: 20,
    icon: "◒"
  }

];


const workers = [

  {
    name: "Aline Uwimana",
    role: "Coiffeuse senior",
    services: 31,
    revenue: 468000
  },

  {
    name: "Grace Mukamwezi",
    role: "Coiffeuse",
    services: 24,
    revenue: 355000
  },

  {
    name: "Eric Niyonzima",
    role: "Barbier",
    services: 18,
    revenue: 282000
  }

];


let cart = [];


// FORMAT MONÉTAIRE

function money(value) {

  return "₣ " +
    Number(value).toLocaleString("fr-FR");

}


// ==============================
// NAVIGATION
// ==============================

const links =
  document.querySelectorAll(".nav-link");


links.forEach(link => {

  link.addEventListener("click", () => {

    const page =
      link.dataset.page;

    showPage(page);

  });

});


function showPage(page) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(p => {

    p.classList.remove("active-page");

  });


  const selected =
    document.getElementById(
      "page-" + page
    );


  if (selected) {

    selected.classList.add(
      "active-page"
    );

  }


  links.forEach(link => {

    link.classList.remove("active");

    if (
      link.dataset.page === page
    ) {

      link.classList.add("active");

    }

  });


  document.getElementById(
    "pageName"
  ).textContent =
    pageName(page);

}


function pageName(page) {

  const names = {

    dashboard: "Dashboard",
    clients: "Clients",
    appointments: "Rendez-vous",
    pos: "Caisse",
    shop: "Boutique",
    staff: "Travailleurs",
    commissions: "Commissions",
    stock: "Stock",
    reports: "Rapports",
    settings: "Paramètres"

  };

  return names[page];

}


// ==============================
// CLIENTS
// ==============================

function renderClients(list = clients) {

  const table =
    document.getElementById(
      "clientsTable"
    );

  table.innerHTML = "";


  list.forEach(client => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <div class="client-cell">

          <div class="avatar">
            ${client.name
              .split(" ")
              .map(x => x[0])
              .join("")
              .substring(0, 2)}
          </div>

          <b>
            ${client.name}
          </b>

        </div>
      </td>

      <td>
        ${client.phone}
      </td>

      <td>
        Aujourd'hui
      </td>

      <td>
        ${client.visits}
      </td>

      <td>
        ${money(client.spent)}
      </td>

      <td>
        ⭐ ${client.points} pts
      </td>

    `;


    table.appendChild(row);

  });

}


const clientSearch =
  document.getElementById(
    "clientSearch"
  );


clientSearch.addEventListener(
  "input",
  function () {

    const value =
      this.value.toLowerCase();


    const result =
      clients.filter(client =>

        client.name
          .toLowerCase()
          .includes(value)

        ||

        client.phone
          .includes(value)

      );


    renderClients(result);

  }
);


// ==============================
// AJOUT CLIENT
// ==============================

function addClient() {

  const name =
    prompt("Nom complet du client :");


  if (!name) return;


  const phone =
    prompt("Numéro de téléphone :");


  if (!phone) return;


  clients.push({

    name,
    phone,
    visits: 0,
    spent: 0,
    points: 0

  });


  renderClients();


  alert(
    "Client créé avec succès."
  );

}


// ==============================
// CAISSE
// ==============================

function showServices() {

  renderPOS(services);

}


function showProducts() {

  renderPOS(products);

}


function renderPOS(items) {

  const container =
    document.getElementById(
      "posItems"
    );


  container.innerHTML = "";


  items.forEach((item, index) => {

    const card =
      document.createElement("div");


    card.className =
      "pos-card";


    card.innerHTML = `

      <div class="prod-icon">
        ${item.icon}
      </div>

      <b>
        ${item.name}
      </b>

      <small>
        ${
          item.duration ||
          "Stock : " + item.stock
        }
      </small>

      <strong>
        ${money(item.price)}
      </strong>

    `;


    card.addEventListener(
      "click",
      () => {

        addToCart(item);

      }
    );


    container.appendChild(card);

  });

}


// ==============================
// PANIER
// ==============================

function addToCart(item) {

  const existing =
    cart.find(
      product =>
        product.name === item.name
    );


  if (existing) {

    existing.quantity++;

  }

  else {

    cart.push({

      name: item.name,

      price: item.price,

      quantity: 1

    });

  }


  renderCart();

}


function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );


  container.innerHTML = "";


  if (cart.length === 0) {

    container.innerHTML =
      `<div class="empty">
        Votre panier est vide
      </div>`;

    updateTotal();

    return;

  }


  cart.forEach((item, index) => {

    const row =
      document.createElement("div");


    row.className =
      "cart-row";


    row.innerHTML = `

      <div class="cart-name">

        <b>
          ${item.name}
        </b>

        <small>
          Quantité : ${item.quantity}
        </small>

      </div>

      <strong>
        ${money(
          item.price *
          item.quantity
        )}
      </strong>

      <button
        onclick="removeCart(${index})">
        ×
      </button>

    `;


    container.appendChild(row);

  });


  updateTotal();

}


function removeCart(index) {

  cart.splice(index, 1);

  renderCart();

}


function updateTotal() {

  const total =
    cart.reduce(

      (sum, item) =>

        sum +
        item.price *
        item.quantity,

      0

    );


  document.getElementById(
    "subtotal"
  ).textContent =
    money(total);


  document.getElementById(
    "grandTotal"
  ).textContent =
    money(total);


  document.getElementById(
    "cartTotal"
  ).textContent =
    money(total);

}


// ==============================
// PAIEMENT
// ==============================

function pay() {

  if (cart.length === 0) {

    alert(
      "Le panier est vide."
    );

    return;

  }


  const total =
    cart.reduce(

      (sum, item) =>

        sum +
        item.price *
        item.quantity,

      0

    );


  /*
    IMPORTANT :

    La commission est uniquement
    appliquée aux prestations.

    Produits = 0% commission.
  */


  const workerCommission =
    total * 0.40;


  const ownerShare =
    total * 0.60;


  alert(

    "Paiement enregistré !\n\n" +

    "Total : " +
    money(total) +

    "\n\nCommission travailleur : " +
    money(workerCommission) +

    "\n\nPart patronne : " +
    money(ownerShare)

  );


  cart = [];


  renderCart();

}


// ==============================
// BOUTIQUE
// ==============================

function renderShop() {

  const container =
    document.getElementById(
      "shopGrid"
    );


  container.innerHTML = "";


  products.forEach(product => {

    const card =
      document.createElement("div");


    card.className =
      "product-card";


    card.innerHTML = `

      <div class="product-image">

        ${product.icon}

      </div>

      <div class="product-body">

        <small>
          PRODUIT
        </small>

        <b>
          ${product.name}
        </b>

        <div class="product-foot">

          <strong>
            ${money(product.price)}
          </strong>

          <span>
            ${product.stock} en stock
          </span>

        </div>

      </div>

    `;


    container.appendChild(card);

  });

}


// ==============================
// TRAVAILLEURS
// ==============================

function renderWorkers() {

  const container =
    document.getElementById(
      "staffGrid"
    );


  container.innerHTML = "";


  workers.forEach(worker => {

    const commission =
      worker.revenue * 0.40;


    const card =
      document.createElement("div");


    card.className =
      "staff-card";


    card.innerHTML = `

      <div class="staff-head">

        <div class="avatar">
          ${worker.name
            .split(" ")
            .map(x => x[0])
            .join("")
            .substring(0, 2)}
        </div>

        <div>

          <h3>
            ${worker.name}
          </h3>

          <small>
            ${worker.role}
          </small>

        </div>

      </div>


      <div class="staff-meta">

        <div>

          <span>
            Prestations
          </span>

          <b>
            ${worker.services}
          </b>

        </div>


        <div>

          <span>
            CA prestations
          </span>

          <b>
            ${money(worker.revenue)}
          </b>

        </div>


        <div>

          <span>
            Commission
          </span>

          <b>
            ${money(commission)}
          </b>

        </div>


        <div>

          <span>
            Part patronne
          </span>

          <b>
            ${money(
              worker.revenue * 0.60
            )}
          </b>

        </div>

      </div>

    `;


    container.appendChild(card);

  });

}


// ==============================
// COMMISSIONS
// ==============================

function renderCommissions() {

  const table =
    document.getElementById(
      "commissionTable"
    );


  table.innerHTML = "";


  workers.forEach(worker => {

    const commission =
      worker.revenue * 0.40;


    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <b>
          ${worker.name}
        </b>
      </td>

      <td>
        ${worker.services}
      </td>

      <td>
        ${money(worker.revenue)}
      </td>

      <td>
        40%
      </td>

      <td>
        ${money(commission)}
      </td>

      <td>
        ${money(
          commission * 0.30
        )}
      </td>

    `;


    table.appendChild(row);

  });

}


// ==============================
// STOCK
// ==============================

function renderStock() {

  const table =
    document.getElementById(
      "stockTable"
    );


  table.innerHTML = "";


  products.forEach(product => {

    const row =
      document.createElement("tr");


    const low =
      product.stock <= 5;


    row.innerHTML = `

      <td>
        <b>
          ${product.name}
        </b>
      </td>

      <td>
        PROD-${product.stock}
      </td>

      <td>
        ${product.stock}
      </td>

      <td>
        5
      </td>

      <td>
        ${money(product.price)}
      </td>

      <td>

        <span class="pill ${
          low ? "wait" : "done"
        }">

          ${
            low
              ? "Stock faible"
              : "Disponible"
          }

        </span>

      </td>

    `;


    table.appendChild(row);

  });

}


// ==============================
// PARAMÈTRES
// ==============================

const range =
  document.getElementById(
    "commissionRange"
  );


range.addEventListener(
  "input",
  function () {

    const worker =
      Number(this.value);


    const owner =
      100 - worker;


    document.getElementById(
      "workerPct"
    ).textContent =
      worker + "%";


    document.getElementById(
      "ownerPct"
    ).textContent =
      owner + "%";

  }
);


function saveSettings() {

  alert(
    "Paramètres enregistrés."
  );

}


// ==============================
// INITIALISATION
// ==============================

renderClients();

renderPOS(services);

renderShop();

renderWorkers();

renderCommissions();

renderStock();


// ==============================
// MOBILE
// ==============================

const menuBtn =
  document.getElementById(
    "menuBtn"
  );


menuBtn.addEventListener(
  "click",
  () => {

    document
      .querySelector(".sidebar")
      .style.transform =
      "translateX(0)";

  }
);