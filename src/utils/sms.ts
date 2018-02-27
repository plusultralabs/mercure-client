//  format the message for an email
//  destinatary email(email@email.com)
//  content txt(blablablblablablabalblabla)
import Formater from './Formater'

function getFormatedTo(email:string){
    return `sms(${email})`
}

function getFormatedContent(content:string){
        if (content.length > 150)  throw new Error("Sms content excess the limit of 150 characters");
        return `txt(${content})` 
}

const smsFormater : Formater= {
    getFormatedContent,
    getFormatedTo
}

export default smsFormater