//projectID - 388451141be7493e90cfba97529d616e

const Web3 = require('web3')
const Distributor = require('../build/contracts/Distributor.json')

class distributorInteractor {
    web3;
    account;
    id;
    deployedNetwork;
    contract;


    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545'))
        this.account = account.toLowerCase();
    }

    async manipulateDistributor(weight, qty) {
        this.id = await this.web3.eth.net.getId();
        this.deployedNetwork = await Distributor.networks[this.id];
        this.contract = new this.web3.eth.Contract(
            Distributor.abi,
            this.deployedNetwork.address,
        )

        const addresses = await this.web3.eth.getAccounts();

        console.log(addresses)

        await this.contract.methods.update(addresses[1], weight, qty).send({
            from: addresses[0]
        });
    }

    async getDistributor() {
        const _weight = await this.contract.methods.getWeight().call() 
        const _quantity = await this.contract.methods.getQuantity().call()

        console.log({
            weight: _weight,
            quantity: _quantity,
        })
    }

}

module.exports = distributorInteractor;