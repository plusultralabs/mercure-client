import * as Web3 from 'web3';
import * as cryptium from "cryptium";
import getWeb3 from './getWeb3'
import { Contract } from 'web3/types';

interface MercureContract extends Contract{
    getPrice():Number,
    sendNotification(email:string,content:string,iv:string,config:any):void
}

import mercure from '../../contracts/Mercure.json'
import key from '../../config/pub.json'
const pub_key = key.pub_keys[key.latest]
async function loadContract(){
    const web3 = await getWeb3();
    // load contract
    var contract : any= new web3.eth.Contract(mercure.abi,mercure.networks["5777"].address)
    const price = contract.getPrice();
       
    function sendEncryptedEmail(email:string,content:string){
       return  cryptium.encryptNotification(email,content,pub_key).then((encrypt:any)=>{
            return contract.sendNotification(encrypt.email,encrypt.content,encrypt.iv,{from:web3.eth.accounts[0],value:web3.utils.toWei('0.001', 'ether')})
            .then(function(receipt:Object){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                return receipt
            });
        })
    }
    return {sendEncryptedEmail}
}
export default loadContract
