let trades = [];

function addTrade(){
  const symbol = document.getElementById("symbol").value.toUpperCase();
  const type = document.getElementById("tradeType").value;
  const entry = parseFloat(document.getElementById("entryPrice").value);
  const exit = parseFloat(document.getElementById("exitPrice").value);
  const amount = parseFloat(document.getElementById("amount").value);
  const notes = document.getElementById("notes").value;

  if(!symbol || !entry || !exit || !amount) return alert("Please fill all required fields");

  const trade = { symbol, type, entry, exit, amount, notes, date: new Date().toLocaleString() };
  trades.push(trade);
  renderTrades();
}

function renderTrades(){
  const list = document.getElementById("tradeList");
  list.innerHTML = "";
  trades.forEach((t,i)=>{
    list.innerHTML += `
      <div style="border:1px solid #ff7a00; padding:10px; margin:5px; border-radius:8px;">
        <p>${t.date} | ${t.symbol} | ${t.type} | Entry: ${t.entry} | Exit: ${t.exit} | Amount: ${t.amount}</p>
        <p>Notes: ${t.notes}</p>
      </div>
    `;
  });
}
