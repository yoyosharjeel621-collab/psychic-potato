// swap.js
async function swapTokens() {
  const fromToken = document.getElementById("fromToken").value.trim().toUpperCase();
  const toToken = document.getElementById("toToken").value.trim().toUpperCase();
  const amount = parseFloat(document.getElementById("fromAmount").value);

  if(!fromToken || !toToken || !amount) {
    alert("Please fill all fields");
    return;
  }

  if(!window.ethereum) return alert("MetaMask not detected");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Simple demo swap (Uniswap V2)
  const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; 
  const routerAbi = [
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] memory path) view returns (uint[] memory amounts)"
  ];
  const router = new ethers.Contract(uniswapRouterAddress, routerAbi, signer);

  // Demo: assume swap from ETH → USDT
  const tokenAddresses = {
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  };

  if(!tokenAddresses[fromToken] || !tokenAddresses[toToken]){
    alert("Token not supported in demo");
    return;
  }

  const path = [tokenAddresses[fromToken], tokenAddresses[toToken]];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 min

  try {
    const tx = await router.swapExactETHForTokens(
      0,
      path,
      address,
      deadline,
      { value: ethers.utils.parseEther(amount.toString()) }
    );
    document.getElementById("swapResult").innerText = "Swap TX sent: " + tx.hash;
    await tx.wait();
    document.getElementById("swapResult").innerText = "Swap Completed: " + tx.hash;
  } catch(err) {
    console.error(err);
    document.getElementById("swapResult").innerText = "Swap failed: " + err.message;
  }
}
