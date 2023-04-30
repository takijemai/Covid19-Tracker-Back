const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username : { type: String },
    email : { type: String },
    password: { type: String },
})

userSchema.statics.EncryptPassword = async function(password){
    const hash = bcrypt.hash(password,10)
    return hash
}
module.exports = mongoose.model('User',userSchema)