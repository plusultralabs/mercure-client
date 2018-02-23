# mercure-client

a client for the mercure notifications system

Can be used from the browser or node, in the last case just pass the local provider to the getWeb3 function

``` js
// for browser
const web3 = await mercure.getWeb3()
// specific provider either http or ipc
const web3 = await mercure.getWeb3('http://localhost:8545')
```