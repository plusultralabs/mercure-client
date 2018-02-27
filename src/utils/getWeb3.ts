
import * as Web3 from 'web3'
declare global {
  interface Window { web3: Web3 | undefined; }
}


let getWeb3 = (localUrl = 'http://127.0.0.1:7545' )=>(new Promise<any>(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (typeof process === 'undefined'){
    // browser
    window.addEventListener('load', function() {
      let web3 = window.web3;
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use injected provider.
        web3 = new Web3(web3.currentProvider)
      } else {
        // use Garnache, Geth or local provider  as fallback
        const provider = new Web3.providers.HttpProvider(localUrl)
        web3 = new Web3(provider)
      }
      resolve(web3)
    })
  }else{
    // node.js
    const provider = new Web3.providers.HttpProvider(localUrl)
    const web3 = new Web3(provider)
    resolve(web3)
  } 

}))

export default getWeb3
