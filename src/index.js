require('dotenv').config()
const { response } = require('express')
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const request = require('request')
const nodemailer = require('nodemailer')


require('./db/mongoose')
const User = require('./models/user')
const Medicine = require('./models/medicine')
const LedgerItem = require('./models/ledger')
const { findByIdAndDelete } = require('./models/user')

//get blockchain data from solidity Interactor.js
const rmInteractor = require('../interactors/RawMaterialInteractor')
const mfInteractor = require('../interactors/ManufacturerInteractor')
const distInteractor = require('../interactors/DistributorInteractor')
const pharmaInteractor = require('../interactors/PharmacistInteractor')

const geocode = require('./utils/geocode.js')
const unitsChecker = require('./utils/unitsChecker')
const weightChecker = require('./utils/weightChecker')
const { callbackify } = require('util')
const { type } = require('express/lib/response')

const solidity_rawMaterial = async (weight, qty) => {
    let checker = new rmInteractor('0x2Fe76F831b275140710382453A05c6A9e2C74C2D')
    await checker.manipulateRaw(weight, qty)
    return await checker.getRaw()
}

const solidity_Manufacturer = async (weight, qty) => {
    let checker = new mfInteractor('0x2Fe76F831b275140710382453A05c6A9e2C74C2D')
    await checker.manipulateManufacturer(weight, qty)
    return await checker.getManufacturer()
}

const solidity_Distributor = async (weight, qty) => {
    let checker = new distInteractor('0x2Fe76F831b275140710382453A05c6A9e2C74C2D')
    await checker.manipulateDistributor(weight, qty)
    return await checker.getDistributor(weight, qty)
}

const solidity_Pharmacist = async (weight, qty) => {
    let checker = new pharmaInteractor('0x2Fe76F831b275140710382453A05c6A9e2C74C2D')
    await checker.manipulatePharmacist(weight, qty)
    return await checker.getPharmacist(weight, qty)
    // let checker = new 
}


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

const smtpTransport = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

async function run(name) {
    let sendResult = await smtpTransport.sendMail({
        from: "aloomba@jpischool.com",
        to: "arjunrajloomba@gmail.com",
        subject: "Alert - Your Ledger for " + name + " has been corrupted!",
        text: "Hello from Medichain!, your shipment has been detected as counterfeit, and therefore your smart contract is now invalid on our blockchain network."
    })

    console.log(sendResult)
}


const currentUserId = -1;

app.get('/', async (req, res) => {
    _flag = false;
    if (currentUserId != -1) {
        _flag = true;
    }

    // console.log(currentUserId)
    res.render('landingPage', {flag: _flag})
})

app.get('/login', async (req, res) => {
    const currentUserId = -1;
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
    const {email, password} = req.body;
    const user = new User({email, password})
    await user.save()
    const currentUserId = user._id;
    console.log(currentUserId)
    res.redirect('/medicines')
})

//Medicine Routes: 

app.get('/medicines', async (req, res) => {

        const medicines = await Medicine.find({})
        res.render('medicines', {medicines: medicines})

})

app.get('/medicines/new', (req, res) => {
    res.render('newMedicine', {number: JSON.stringify(5)})
})

//get specific medicine: 

app.get('/medicines/:id', async (req, res) => {
    const medicine = await Medicine.findById(req.params.id).populate('ledgerItems')
    const latitude = 34.0522;
    const longitude = -118.2437;
    let locations = []
    let coordinates = []


    for (let i = 0; i < medicine.ledgerItems.length; i++) {
        loc = medicine.ledgerItems[i].location

        let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent("Boston") + '.json?access_token=pk.eyJ1IjoiYXJqdW5yYWpsb29tYmEiLCJhIjoiY2t4azkybTNxMTA2ZzJ5cGVlbXQ3NWo4ciJ9.ehGWWdrrAL7awM49RpY2cQ&limit=1';

        var lat = 0;
        var long = 0;

        //DOESN'T WORK-
        // request.get(url).on('response', (response) => {

        //     const respJSON = JSON.stringify(book)
        //     // Covert JSON string into object
        //     const objJSON = JSON.parse(bookJSON)
        //     JSON.parse(response)
        //     JSON.stringify(response)
        //     lat =  response.body.features[0].center[1];
        //     long = response.body.features[0].center[0];
        // })

        request({url, json: true}, (error, response) => {


            lat =  response.body.features[0].center[1];
            long = response.body.features[0].center[0];

                obj = {
                    latitude, 
                    longitude,
                }


                callback(undefined, {
                    lat,
                    long
                })

        })

        // console.log(lat)




        
    
            // console.log({
            //     latitude: latitude, 
            //     longitude: longitude,
            // })

            

            // return obj;

            coordinates.push(
                obj
            )
    


}


    // console.log(coordinates.length)

    for (let i = 0; i < coordinates.length; i++) {
        console.log(coordinates[i])
    }

    // console.log(medicine.ledgerItems[0].description)
    res.render('showMedicines', {medicine, locations, latitude: JSON.stringify(latitude), longitude: JSON.stringify(longitude)})
})

app.post('/medicines', async (req, res) => {

    let {name, InitialSupplier, finalDestination} = req.body;

    const medicine = new Medicine({name, InitialSupplier, finalDestination})

    await medicine.save()
    res.redirect('/medicines')
})

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
    // console.log(_id)
    const medicine = await Medicine.findById(_id)
    res.render('newEntry', {medicine: medicine, error: false, success: false})
})

app.post('/medicines/:id/ledgerItems', async (req, res) => {

    try {
        const _id = req.params.id;
        const tempMedicine = await Medicine.findById(_id);
        let {description, date, weight, units} = req.body;


        numLedgerItems = tempMedicine.ledgerItems.length
        console.log('number of items: ', numLedgerItems)

        if (numLedgerItems > 0) {

            // console.log('number of items in ledger before the new one: ', numLedgerItems)

            lastItemID = tempMedicine.ledgerItems[numLedgerItems - 1]._id
            lastItem = await LedgerItem.findById(lastItemID)
            lastItemWeight = lastItem.weight;
            const isValidWeight = await weightChecker(lastItemWeight, weight);

            if (isValidWeight) {
                console.log('Its valid!')
            } else {
                console.log("It's not valid")
            }

            if (!(isValidWeight)) {
                run(tempMedicine.name).catch((e) => {
                    console.log(e)
                })                
                return res.render('newEntry', {medicine: tempMedicine, error: true, success: false})
            }

            lastItemUnits = lastItmem.units;
            console.log(lastItemUnits)
            const isValidUnits = await unitsChecker(lastItemUnits, units)

            if (isValidUnits) {
                console.log('valid units')
            } else {
                console.log('Invalid')
            }

            // console.log(isValidWeight)
        }

        // solidity_Pharmacist(60, 30)



        const ledgerItem = new LedgerItem({description, date, weight, units})
        tempMedicine.ledgerItems.push(ledgerItem)
        ledgerItem.Medicine = tempMedicine;
        await tempMedicine.save();
        await ledgerItem.save();

        const medicines = await Medicine.find({})

        const _weight = req.body.weight;
        const _units = req.body.units;

        console.log({
            weight: weight, 
            units: units,
        })

        if (currentUserId != -1) {

            const user = await User.findById(currentUserId);

            if (user.userType == 'rawMaterial') {
                solidity_rawMaterial(_weight, _units)
            }

            if (user.userType == 'manufacturer') {
                solidity_Manufacturer(_weight, _units)
            }

            if (user.userType == 'distributor') {
                solidity_Distributor(_weight, _units)
            }

            if (user.userType == 'pharmacist') {
                solidity_Pharmacist(_weight, _units)
            }

        }

        res.render('newEntry', {medicine: tempMedicine, error: false, success: true})

    } catch (e) {
        
        if (req.body.weight < 0) {
            res.send('ERROR NEGATIVE WEIGHT')
            console.log("ERROR WEIGHT CAN'T BE NEGATIVE")
        } 

        else if (req.body.units < 0) {
            res.send('ERROR NEGATIVE UNITS')
            console.log("ERROR NUM UNITS CAN'T BE NEGATIVE")
        }

        res.redirect('/medicines')
    } 
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