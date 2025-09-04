let balance = 400000000;
let transactions = [
  {to: "Alice", amount: 5000000, status: "Success"},
  {to: "Global Holdings", amount: 25000000, status: "Pending"}
];

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "noel" && pass === "1234") {
    document.getElementById("login-page").classList.remove("active");
    document.getElementById("dashboard-page").classList.add("active");
    renderTransactions();
    updateBalance();
  } else {
    document.getElementById("login-error").textContent = "Invalid username or password.";
  }
}

function logout() {
  document.getElementById("dashboard-page").classList.remove("active");
  document.getElementById("login-page").classList.add("active");
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Balance & Transactions
function updateBalance() {
  document.getElementById("balance").textContent = "$" + balance.toLocaleString();
}

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";
  transactions.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${t.to}</span><span>$${t.amount.toLocaleString()}</span><span>${t.status}</span>`;
    list.appendChild(li);
  });
}

// Send Money
function showSend() {
  document.getElementById("send-modal").style.display = "block";
}

function sendMoney() {
  const to = document.getElementById("send-to").value;
  const amt = parseFloat(document.getElementById("send-amount").value);
  if (to && amt > 0 && amt <= balance) {
    balance -= amt;
    let status = (transactions.length % 2 === 0) ? "Success" : "Pending";
    transactions.push({to, amount: amt, status});
    updateBalance();
    renderTransactions();
    closeModal("send-modal");
    if (status === "Pending") {
      alert("Dear Customer, we are reviewing the transaction made, and we will get back to you.");
    }
  }
}

// Receive Money
function showReceive() {
  document.getElementById("receive-modal").style.display = "block";
}

function receiveMoney() {
  const amt = parseFloat(document.getElementById("receive-amount").value);
  if (amt > 0) {
    balance += amt;
    transactions.push({to: "Deposit", amount: amt, status: "Success"});
    updateBalance();
    renderTransactions();
    closeModal("receive-modal");
  }
}

// Transactions
function showTransactions() {
  document.getElementById("transactions-section").scrollIntoView({behavior: "smooth"});
}

// Close modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
