import * as cryptium from "cryptium";
import getWeb3 from './getWeb3'

interface MercureContract {
    getPrice():Number,
    sendNotification(email:string,content:string,iv:string,config:any):void
}

const mercureContract = require('../../contracts/Mercure.json') 

async function loadContract(_web3?:any){
    let web3:any;
    if(typeof _web3 == 'undefined'){
        web3 = await getWeb3();
    } else {
        web3 = _web3
    }
    
    // load contract
    var Contract : any= web3.eth.contract(mercureContract.abi)
    const contract = Contract.at(mercureContract.networks["5777"].address)
    console.log(mercureContract.networks["5777"].address)
    const price = contract.getPrice();
    console.log(price)
       
    function sendNotification(destination:string,content:string){
        var getData = contract.sendNotification.getData( destination,content);
        //finally paas this data parameter to send Transaction
        return web3.eth.sendTransaction({to:mercureContract.networks["5777"].address, from:web3.eth.accounts[0], value:price,data: getData});
        // return contract.sendNotification(destination,content,{from:web3.eth.accounts[0],value:price})
    }
    return {sendNotification}
}

export default loadContract
