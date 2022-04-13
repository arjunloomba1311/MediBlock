const { response } = require('express')
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')

require('./db/mongoose')
const User = require('./models/user')
const Medicine = require('./models/medicine')
const LedgerItem = require('./models/ledger')
const { findByIdAndDelete } = require('./models/user')

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
        res.render('medicines', {medicines})

})

app.get('/medicines/new', (req, res) => {
    res.render('newMedicine')
})

//get specific medicine: 
app.get('/medicines/:id', async (req, res) => {
    const medicine = await Medicine.findById(req.params.id).populate('ledgerItems')
    res.render('showMedicines', {medicine})
})

app.post('/medicines', async (req, res) => {
    const medicine = new Medicine(req.body)
    await medicine.save()
    res.redirect('/medicines')
})

//Ledger Routes:

//this route will only give json output since it's only for testing purposes
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
    
        const _id = req.params.id;
        const tempMedicine = await Medicine.findById(_id);
        const {description, date, weight, units} = req.body;
        const ledgerItem = new LedgerItem({description, date, weight, units})
        tempMedicine.ledgerItems.push(ledgerItem)
        ledgerItem.Medicine = tempMedicine;
        await tempMedicine.save();
        await ledgerItem.save();

        const medicines = await Medicine.find({})
        res.render('medicines', {medicines})
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