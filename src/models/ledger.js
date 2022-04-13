const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

//each medicine has a ledger
//users can create new ledgers based on medicine

const LedgerSchema = new Schema({
    Medicine: {
        type: Schema.Types.ObjectId, 
        ref: 'Medicine'
    },
    description: {
        type: String,
        trim: true,
        default: "Default Medicine Description"
    },
    date: {
        type: Date, 
        required: true,
        // type: Date,
        // default: () => {
        //     Date.now() + 7*24*60*60*1000
        // },
    },
    weight: {
        type: Number, 
        required: true,
    }, 
    units: {
        type: Number, 
        default: 2200,
    }
})

const LedgerItem = mongoose.model('ledgerItem', LedgerSchema)

module.exports = LedgerItem;


// const LedgerItem = mongoose.model('Ledger', {
//     associatedMedicine: {type: Schema.}

//     associateMedicineID: {
//        type: String,
//        required: true,
//     }
// })
