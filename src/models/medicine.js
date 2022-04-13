const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema

const medicineSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
    },
    InitialSupplier: {
        type: String,
        default: 'not-defined',
    }, 
    finalDestination: {
        type: String,
        default: 'Los Angeles, CA, USA',
    },
    ledgerItems: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'ledgerItem',
        }
    ]
})

const Medicine = mongoose.model('Medicine', medicineSchema)

module.exports = Medicine;