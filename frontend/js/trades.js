const API_URL = "https://your-backend-url.com/api/trades"; // replace with your GitHub backend if hosted

// Fetch user trades
async function fetchTrades(userId) {
  try {
    const res = await fetch(`${API_URL}/${userId}`);
    const trades = await res.json();
    displayTrades(trades);
  } catch (err) {
    console.error(err);
  }
}

// Display trades in HTML
function displayTrades(trades) {
  const tradeList = document.getElementById("tradeList");
  tradeList.innerHTML = "";
  
  trades.forEach(trade => {
    const div = document.createElement("div");
    div.classList.add("trade-card");
    div.innerHTML = `
      <strong>${trade.symbol}</strong> - ${trade.tradeType} <br>
      Entry: ${trade.entryPrice} | Exit: ${trade.exitPrice} <br>
      Amount: ${trade.amount} | P/L: ${trade.profitLoss.toFixed(2)} <br>
      Notes: ${trade.notes} <br>
      Date: ${new Date(trade.date).toLocaleString()}
    `;
    tradeList.appendChild(div);
  });
}

// Add a new trade
async function addTrade() {
  const userId = localStorage.getItem("userId"); // store user id on login
  const symbol = document.getElementById("symbol").value;
  const tradeType = document.getElementById("tradeType").value;
  const entryPrice = parseFloat(document.getElementById("entryPrice").value);
  const exitPrice = parseFloat(document.getElementById("exitPrice").value);
  const amount = parseFloat(document.getElementById("amount").value);
  const notes = document.getElementById("notes").value;

  try {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, symbol, tradeType, entryPrice, exitPrice, amount, notes })
    });

    const data = await res.json();
    console.log(data.message);
    fetchTrades(userId); // refresh dashboard
  } catch (err) {
    console.error(err);
  }
}
