//projectID - 388451141be7493e90cfba97529d616e

const Web3 = require('web3')
const VendingMachine = require('./build/contracts/VendingMachine.json')

class solidityInteractor {
    web3;
    account;
    id;
    deployedNetwork;
    contract;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'))
        this.account = account.toLowerCase();
    }

    async assignData() {

        this.id = await this.web3.eth.net.getId();
        this.deployedNetwork = await VendingMachine.networks[this.id];
        this.contract = new this.web3.eth.Contract(
            VendingMachine.abi,
            this.deployedNetwork.address,
        )

        const addresses = await this.web3.eth.getAccounts();

        await this.contract.methods.setData(80).send({
            from: addresses[0]
        });

    }

    async getData() {
        this.id = await this.web3.eth.net.getId();
        this.deployedNetwork = await VendingMachine.networks[this.id];
        this.contract = new this.web3.eth.Contract(
            VendingMachine.abi,
            this.deployedNetwork.address,
        )
        
        const result = await this.contract.methods.getBalance().call()
        console.log(result)

    }
 
    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        // console.log(block)
        let number = block.number;
        console.log('Searching block ' + number);

            for (let t_hash of block.transactions) {
                let transaction = await this.web3.eth.getTransaction(t_hash);

                    console.log('transaction found on block')
                    // console.log(transaction)
                    console.log(
                        {address: transaction.from, 
                        value: this.web3.utils.fromWei(transaction.value, 'ether'), 
                        timestamp: new Date()}
                        )
                    
                }
    }

}

let t_checker = new solidityInteractor('86cf1ed0601d2a2c431e4b47617971aa18c9a03863565785ab40a4addd0dc563', '"0x4113E780A80D5fB67c8E1440755FeF3ad8ac50f8"')
t_checker.checkBlock()
t_checker.assignData()
t_checker.getData()