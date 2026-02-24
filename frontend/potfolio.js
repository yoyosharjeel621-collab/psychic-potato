async function loadPortfolio(address){
  const portfolioList = document.getElementById("portfolioList");
  portfolioList.innerHTML = "Loading portfolio...";

  try{
    let html = "";

    // ETH
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const eth = ethers.utils.formatEther(balance);
      html += `<p>ETH Balance: ${eth}</p>`;

      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await res.json();
      html += `<p>ETH USD Value: $${(eth*data.ethereum.usd).toFixed(2)}</p>`;
    }

    // SOL
    if(window.solana && window.solana.isPhantom){
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      const pubKey = new solanaWeb3.PublicKey(address);
      const solBalance = await connection.getBalance(pubKey)/1e9;
      html += `<p>SOL Balance: ${solBalance}</p>`;

      const resSOL = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const dataSOL = await resSOL.json();
      html += `<p>SOL USD Value: $${(solBalance*dataSOL.solana.usd).toFixed(2)}</p>`;
    }

    portfolioList.innerHTML = html;
  }catch(err){ console.log(err); portfolioList.innerHTML="Error loading portfolio"; }
}
