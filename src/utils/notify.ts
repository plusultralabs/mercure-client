import * as cryptium from "cryptium";
import getWeb3 from './getWeb3'

interface MercureContract {
    getPrice():Number,
    sendNotification(email:string,content:string,iv:string,config:any):void
}

import mercureContract from '../../contracts/Mercure.json'

async function loadContract(_web3?:any){
    let web3:any;
    if(typeof _web3 != 'undefined'){
        web3 = await getWeb3();
    } else {
        web3 = _web3
    }
    
    // load contract
    var contract : any= new web3.eth.Contract(mercureContract.abi,mercureContract.networks["5777"].address)
    const price = contract.getPrice();
       
    function sendNotification(content:string,destination:string){
        return contract.sendNotification(destination,content,{from:web3.eth.accounts[0],value:price})
    }
    return {sendNotification}
}

export default loadContract
