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
    location: {
        type: String,
        require: false,
        default: "Los Angeles"
    },
    weight: {
        type: Number, 
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Weight can't be negative!")
            }
        }
    }, 
    units: {
        type: Number, 
        default: 2200,
        validate(value) {
            if (value < 0) {
                throw new Error("Units can't be negative!")
            }
        }
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
