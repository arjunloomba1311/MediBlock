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

//delete all associated ledger entries if a shipment is removed
// this function still requires testing - 
medicineSchema.post('findOneAndDelete', async function (medicine) {
    if (medicine.ledgerItems.length) {
        const res = await ledgerItem.deleteMany({ _id: { $in: medicine.ledgerItems } })
        console.log(res);
    }
})


module.exports = Medicine;