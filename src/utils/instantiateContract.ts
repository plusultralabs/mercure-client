// import contract = require('truffle-contract')

// function instantiateContract(web3) {
//     // the imported json
//     const simpleStorage = contract(SimpleStorageContract)
//     simpleStorage.setProvider(web3.currentProvider)

//     // Declaring this for later so we can chain functions on SimpleStorage.
//     var simpleStorageInstance

//     // Get accounts.
//     web3.eth.getAccounts((error, accounts) => {
//       simpleStorage.deployed().then((instance) => {
//         simpleStorageInstance = instance

//         // Stores a given value, 5 by default.
//         return simpleStorageInstance.set(5, {from: accounts[0]})
//       }).then((result) => {
//         // Get the value from the contract to prove it worked.
//         return simpleStorageInstance.get.call(accounts[0])
//       }).then((result) => {
//         // Update state with the result.
//         return this.setState({ storageValue: result.c[0] })
//       })
//     })
//   }