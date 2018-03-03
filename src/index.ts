import loadContract from "./utils/notify"
import getWeb3 from './utils/getWeb3'
import { getProvider , Action} from "./utils/providers";

const PHONENUMBER = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/

loadContract().then( contract=>{
    contract.sendNotification("fdsf@gfdgf.com","hello world")
})

export interface Options{
    encrypt:boolean
}

export async function prepareEmailNotification(email:string,content:string,options:Options){
    const provider = await getProvider(Action.EMAIL, options.encrypt)
    return provider(email,content)
}

export async function prepareSmsNotification(phoneNumber:string,content:string,options:Options){
    validateSms(phoneNumber)
    const provider = await getProvider(Action.SMS, options.encrypt)
    return provider(phoneNumber,content)
}

export async function sendEmailNotification(email:string,content:string,options:Options){
    const payload = await prepareEmailNotification(email,content,options)
    const contract = await loadContract();
    contract.sendNotification(payload.destination,payload.content)
}

export async function sendSmsNotification(phoneNumber:string,content:string,options:Options){
    const payload = await prepareSmsNotification(phoneNumber,content,options)
    const contract = await loadContract();
    contract.sendNotification(payload.destination,payload.content)
}

function validateSms(sms:string){
    if(!PHONENUMBER.test(sms)) throw new Error('invalid phone number')
}

export default {loadContract}
//


