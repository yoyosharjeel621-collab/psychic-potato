async function swapTokens(){
  const from = document.getElementById("fromToken").value.toUpperCase();
  const to = document.getElementById("toToken").value.toUpperCase();
  const amount = parseFloat(document.getElementById("swapAmount").value);

  if(!amount || !from || !to) return alert("Fill all fields");

  alert(`Fetching swap quote for ${amount} ${from} → ${to}...`);

  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${from.toLowerCase()},${to.toLowerCase()}&vs_currencies=usd`);
  const data = await res.json();

  const fromUSD = data[from.toLowerCase()]?.usd || 0;
  const toUSD = data[to.toLowerCase()]?.usd || 0;
  const estimatedTo = (amount * fromUSD) / toUSD;

  document.getElementById("swapUI").innerHTML = `
    <p>Estimated Receive: ${estimatedTo.toFixed(4)} ${to}</p>
    <button onclick="executeSwap()">Execute Swap</button>
  `;
}

function executeSwap(){
  alert("Swap executed! (Demo placeholder, real DEX integration coming in Phase 3)");
}
