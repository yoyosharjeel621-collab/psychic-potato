// portfolio.js

async function connectEVM() {
  if(window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("walletInfo").innerText = "Connected (EVM): " + address;
    fetchEVMPortfolio(provider, address);
  } else alert("MetaMask not detected");
}

async function fetchEVMPortfolio(provider, address) {
  const balance = await provider.getBalance(address);
  const ethBalance = ethers.utils.formatEther(balance);
  const tokens = [
    {symbol:'USDT', contract:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {symbol:'DAI', contract:'0x6B175474E89094C44Da98b954EedeAC495271d0F'}
  ];
  const portfolioList = document.getElementById('portfolioList');
  portfolioList.innerHTML = `<div>ETH: ${ethBalance}</div>`;
  for(let token of tokens){
    const erc20 = new ethers.Contract(token.contract, [
      "function balanceOf(address) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ], provider);
    const balance = await erc20.balanceOf(address);
    const decimals = await erc20.decimals();
    portfolioList.innerHTML += `<div>${token.symbol}: ${balance/(10**decimals)}</div>`;
  }
}

async function connectSolana() {
  const { solana } = window;
  if(solana && solana.isPhantom){
    const response = await solana.connect();
    const publicKey = response.publicKey.toString();
    document.getElementById("walletInfo").innerText = "Connected (Solana): " + publicKey;
    fetchSolanaPortfolio(publicKey);
  } else alert("Phantom not detected");
}

async function fetchSolanaPortfolio(pubKey) {
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
  const pubkey = new solanaWeb3.PublicKey(pubKey);
  const balance = await connection.getBalance(pubkey);
  document.getElementById('portfolioList').innerHTML = `<div>SOL: ${balance/1e9}</div>`;
}
