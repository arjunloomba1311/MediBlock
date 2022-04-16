const { response } = require('express')
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')

require('./db/mongoose')
const User = require('./models/user')
const Medicine = require('./models/medicine')
const LedgerItem = require('./models/ledger')
const { findByIdAndDelete } = require('./models/user')

//get blockchain data from solidity Interactor.js
const solidityInteractor = require('../interactors/rawMaterialInteractor')
const manufacturerInteractor = require('../interactors/manufacturerInteractor')
const distributorInteractor = require('../interactors/distributorInteractor')
const pharmacistInteractor = require('../interactors/pharmacistInteractor')

const solidity_rawMaterial = async (weight, qty) => {
    let checker = new solidityInteractor('86cf1ed0601d2a2c431e4b47617971aa18c9a03863565785ab40a4addd0dc563', '"0x4113E780A80D5fB67c8E1440755FeF3ad8ac50f8"')
    await checker.manipulateRaw(weight, qty)
    await checker.getRaw()
}

const solidity_Manufacturer = async (weight, qty) => {
    let checker = new manufacturerInteractor('86cf1ed0601d2a2c431e4b47617971aa18c9a03863565785ab40a4addd0dc563', '"0x544370e4a408029AdAb8Be7bF3BCF93ef4902E45"')
    await checker.manipulateManufacturer(weight, qty)
    await checker.getManufacturer()
}

const solidity_Distributor = async (weight, qty) => {
    let checker = new distributorInteractor('86cf1ed0601d2a2c431e4b47617971aa18c9a03863565785ab40a4addd0dc563', '"0x544370e4a408029AdAb8Be7bF3BCF93ef4902E45"')
    await checker.manipulateDistributor(weight, qty)
    await checker.getDistributor(weight, qty)
}

const solidity_Pharmacist = async (weight, qty) => {
    let checker = new pharmacistInteractor('86cf1ed0601d2a2c431e4b47617971aa18c9a03863565785ab40a4addd0dc563', '"0x544370e4a408029AdAb8Be7bF3BCF93ef4902E45"')
    await checker.manipulatePharmacist(weight, qty)
    await checker.getPharmacist(weight, qty)
    // let checker = new 
}

solidity_Pharmacist(60, 30)

// let t_checker = new solidityInteractor('86cf1ed0601d2a2c431e4b47617971aa18c9a03863565785ab40a4addd0dc563', '"0x4113E780A80D5fB67c8E1440755FeF3ad8ac50f8"')
//End of solidity part

const app = express()
app.use(express.json())
const port = process.env.PORT || 3001

const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates/views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(publicDirectoryPath))



//landing page route: 

app.get('/', async (req, res) => {
    res.render('landingPage')
})

app.get('/login', async (req, res) => {
    res.render('login')
})


//User Routes: 

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.render('home', {users})
    } catch (e) {
        res.status(404).send()
    }

})

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
        
    } catch (e) {
        res.status(404).send()
    }
})

//Medicine Routes: 

app.get('/medicines', async (req, res) => {

        const medicines = await Medicine.find({})
        res.render('medicines', {medicines: medicines})

})

app.get('/medicines/new', (req, res) => {
    res.render('newMedicine')
})

//get specific medicine: 

app.get('/medicines/:id', async (req, res) => {
    const medicine = await Medicine.findById(req.params.id).populate('ledgerItems')
    res.render('showMedicines', {medicine})
})

// app.post('/medicines', async (req, res) => {
//     const medicine = new Medicine(req.body)
//     await medicine.save()
//     res.redirect('/medicines')
// })

//Ledger Routes:

app.get('/ledgerItems', async (req, res) => {
    try {
        const ledgerItems = await LedgerItem.find({})
        res.send(ledgerItems)
    } catch(e) {
        res.status(404).send()
    }
})

app.get('/medicines/:id/ledgerItems/new', async (req, res) => {
    const _id = req.params.id;
    const medicine = await Medicine.findById(_id)
    res.render('ledger/newEntry', {medicine})
})

app.post('/medicines/:id/ledgerItems', async (req, res) => {

        console.log('here')
    
        const _id = req.params.id;
        const tempMedicine = await Medicine.findById(_id);
        const {description, date, weight, units} = req.body;
        const ledgerItem = new LedgerItem({description, date, weight, units})
        tempMedicine.ledgerItems.push(ledgerItem)
        ledgerItem.Medicine = tempMedicine;
        await tempMedicine.save();
        await ledgerItem.save();

        const medicines = await Medicine.find({})


        const _weight = req.body.weight;
        const _units = req.body.units;
        // console.log({
        //     weight: weight, 
        //     units: units,
        // })

        solidity_rawMaterial(_weight, _units)
    
        res.redirect('/medicines')
})

app.delete('/ledgerItems/:id', async (req, res) => {
    const _id = req.params.id;
    await LedgerItem.findByIdAndDelete(_id);
    const allledgerItems = await LedgerItem.find({})
    res.send(allledgerItems);
})

app.listen(port, () => {
    console.log('server is up on port ', port)
})