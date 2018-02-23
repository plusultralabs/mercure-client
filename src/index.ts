import loadContract from "./utils/notify"

const contract = loadContract().then( contract=>{
    contract.sendEncryptedEmail("fdsf@gfdgf.com","hello world")
})

