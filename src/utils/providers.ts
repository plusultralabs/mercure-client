import email from './email'
import sms from './sms'
import Formater from './Formater'
import * as cryptium from "cryptium"
import { getPubKey } from './keyProvider';

export enum Action{
    EMAIL = 'EMAIL',
    SMS = 'SMS',
    URLTYPE = 'URL'
}
export interface GetPayload{
    async (to:string, content:string):{
    content : string,
    destination : string
}}

function getBaseProvider(kind:Action){
    switch (kind){
        case Action.EMAIL:
            return email
        case Action.SMS:
            return sms
        case Action.URLTYPE:
        default:
            throw new Error('undefined function')
    }
}

async function encryption(fn:Formater){
    return async function(_to:string, _content:string){
        const content = fn.getFormatedContent(_content)
        const to = fn.getFormatedTo(_to)
        const encrypted = await cryptium.encryptNotification(to,content,getPubKey())
        return {content:`${encrypted.content}.${encrypted.iv}`, destination:encrypted.destination}
    }
}

async function nominal(fn:Formater){
    return async function(_to:string, _content:string){
        const content = fn.getFormatedContent(_content)
        const to = fn.getFormatedTo(_to)
        return {content,destination:to}
    }  
}


export function getProvider(kind:Action, encrypted:boolean = true){
    const baseProvider = getBaseProvider(kind);
    if (encrypted) return encryption(baseProvider)
    return nominal(baseProvider)
}
