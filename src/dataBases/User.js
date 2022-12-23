const { Schema, model } = require('mongoose')
const { regexConfig } = require("../configs");
const { hashPassword } = require("../services/authService");

const userSchema = new Schema({
    name: {type:String, minLength:2, maxLength:50, require:true},
    age: {type:Number, min:16, max: 120, require:true},
    avatar: String,
    email: {type:String, regex: regexConfig.EMAIL, require: true, unique: true},
    password: {type:String, require: true}
},
    {timestamps: true})

userSchema.statics = {
    async createWithHashPass(userInfo) {
        const hashPass = await hashPassword(userInfo.password)
        return this.create({...userInfo, password: hashPass})
    }
}

module.exports = model('User', userSchema)
