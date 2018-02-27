import {getPubKey} from '../utils/keyProvider'

it('provides the default key', ()=>{
    const pubKEy = getPubKey()
    expect(typeof pubKEy).toEqual('string')
})