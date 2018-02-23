import getWeb3 from '../utils/getWeb3'
it('gets a web3 instance',async ()=>{
    const web3 = await getWeb3();
    let web3Type = typeof web3;
    expect(web3Type).toEqual('object')
})