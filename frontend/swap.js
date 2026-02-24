// swap.js — Real DEX Integration
async function swapTokens() {
  const from = document.getElementById("fromToken").value.toUpperCase();
  const to = document.getElementById("toToken").value.toUpperCase();
  const amount = parseFloat(document.getElementById("swapAmount").value);

  if(!from || !to || !amount) return alert("Fill all fields");

  if(!window.ethereum) return alert("MetaMask required for swaps");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Example: Using 1inch API for swap quotes on EVM chains
  try {
    const fromToken = from === "ETH" ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : from;
    const toToken = to === "ETH" ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : to;

    const amountWei = ethers.utils.parseEther(amount.toString());

    const quoteUrl = `https://api.1inch.io/v5.0/1/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amountWei}`;
    const res = await fetch(quoteUrl);
    const data = await res.json();

    const estimatedTo = ethers.utils.formatEther(data.toTokenAmount || "0");

    document.getElementById("swapUI").innerHTML = `
      <p>Estimated Receive: ${estimatedTo} ${to}</p>
      <button onclick="executeSwap('${fromToken}','${toToken}','${amountWei}')">Execute Swap</button>
    `;
  } catch(err) {
    console.log(err);
    alert("Error fetching quote. Make sure tokens are supported.");
  }
}

// Execute swap via 1inch (EVM chains)
async function executeSwap(fromToken, toToken, amountWei) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  try {
    const txUrl = `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amountWei}&fromAddress=${await signer.getAddress()}&slippage=1`;

    const res = await fetch(txUrl);
    const txData = await res.json();

    const tx = await signer.sendTransaction({
      to: txData.tx.to,
      data: txData.tx.data,
      value: txData.tx.value ? ethers.BigNumber.from(txData.tx.value) : undefined,
      gasPrice: txData.tx.gasPrice ? ethers.BigNumber.from(txData.tx.gasPrice) : undefined,
      gasLimit: txData.tx.gas ? ethers.BigNumber.from(txData.tx.gas) : undefined
    });

    alert("Swap executed! Tx Hash: " + tx.hash);
  } catch(err) {
    console.log(err);
    alert("Swap failed: " + err.message);
  }
}
