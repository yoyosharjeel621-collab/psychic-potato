async function loadPortfolio(address){
  const portfolioList = document.getElementById("portfolioList");
  portfolioList.innerHTML = "Loading portfolio...";

  try {
    let html = "";

    // ETH Balance
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const eth = ethers.utils.formatEther(balance);
      html += `<p>ETH Balance: ${parseFloat(eth).toFixed(4)} ETH</p>`;

      // ETH USD Price
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await res.json();
      html += `<p>ETH USD Value: $${(eth*data.ethereum.usd).toFixed(2)}</p>`;
    }

    portfolioList.innerHTML = html;
  } catch(err){
    console.log(err);
    portfolioList.innerHTML = "Error loading portfolio";
  }
}
