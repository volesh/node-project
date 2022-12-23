const {Schema, model} = require('mongoose')

const authSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref:'User', require:true},
    accessToken: {type:String, require: true},
    refreshToken: {type:String, require: true}
},
    {timestamps:true}
)

module.exports = model('Auth', authSchema)
