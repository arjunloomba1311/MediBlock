const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema

const userSchema = new Schema({
    // name: {
    //     type: String, 
    //     required: true, 
    //     trim: true,
    // },
    email: {
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('invalid password')
            }
        }  
    },
    userType: {
        type: String,
        required: false, 
        default: 'rawMaterial',
        minlength: 3, 
    }
})

const User = mongoose.model('User', userSchema)

//neccessary to define an export
module.exports = User