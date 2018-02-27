# mercure-client

a client for the mercure notifications system


you can prepare a notification to use it in your contract

``` js
import mercure from 
const options = {encrypt:true}
const emailNotification = mercure.prepareEmailNotification(email,content,options)
console.log(emailNotification.destination)
console.log(emailNotification.content)
```

or just send it directly

``` js
contract = await mercure.loadContract()
contract.sendEncryptedEmail("fdsf@gfdgf.com","hello world")

const web3 = mercure.getWeb3()
const options = {encrypt:true}
mercure.sendEmailNotification(email,content,web3,options)
mercure.sendSmsNotification(sms,content,web3,options)
```

## get the web3 instance

Can be used from the browser or node, in the last case just pass the local provider to the getWeb3 function

``` js
// for browser
const web3 = await mercure.getWeb3()
// specific provider either http
const web3 = await mercure.getWeb3('http://localhost:8545')
```