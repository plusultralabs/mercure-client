import {prepareEmailNotification,prepareSmsNotification} from '../index'

const BASE64 =/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
const BASE64WITHIV =/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?\.(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

it('Prepares an email without encryption',async ()=>{
    const email = 'test@foo.com'
    const content = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    const options = {encrypt : false}
    const payload = await prepareEmailNotification(email,content,options);
    const expected_email = `email(${email})`
    const expected_content = `txt(${content})`
    expect(payload.content).toEqual(expected_content)
    expect(payload.destination).toEqual(expected_email)
})
it('Prepares an email with encryption',async ()=>{
    const email = 'test@foo.com'
    const content = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    const options = {encrypt : true}
    const payload = await prepareEmailNotification(email,content,options);
    const expected_email = `email(${email})`
    const expected_content = `txt(${content})`
    expect(BASE64WITHIV.test(payload.content)).toBeTruthy()
    expect(BASE64.test(payload.destination)).toBeTruthy()
})
it('Prepares an sms without encryption',async ()=>{
    const phone = '+1 855 424-7262'
    const content = 'hi, come to my place'
    const options = {encrypt : false}
    const payload = await prepareSmsNotification(phone,content,options);
    const expected_sms = `sms(${phone})`
    const expected_content = `txt(${content})`
    expect(payload.content).toEqual(expected_content)
    expect(payload.destination).toEqual(expected_sms)
})
it('Prepares an sms with encryption',async ()=>{
    const phone = '+1 855 424-7262'
    const content = 'hi, come to my place'
    const options = {encrypt : true}
    const payload = await prepareSmsNotification(phone,content,options);
    const expected_sms = `sms(${phone})`
    const expected_content = `txt(${content})`
    expect(BASE64WITHIV.test(payload.content)).toBeTruthy()
    expect(BASE64.test(payload.destination)).toBeTruthy()
})
it('Throws for large sms',async ()=>{
    const phone = '+1 855 424-7262'
    const content = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    const options = {encrypt : true}
    expect.assertions(1);
    try {
      await await prepareSmsNotification(phone,content,options);;
    } catch (e) {
      expect(e).toBeDefined()
    }
})
