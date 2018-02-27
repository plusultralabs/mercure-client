//  format the message for an email
//  destinatary email(email@email.com)
//  content txt(blablablblablablabalblabla)
import Formater from './Formater'

function getFormatedTo(email:string){
        return `email(${email})`
}

function getFormatedContent(content:string){
        return `txt(${content})`
}
const emailFormater: Formater ={
    getFormatedContent,
    getFormatedTo
}
export default emailFormater