const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, require:true},
    token: {type: String},
    tokenType: {type: String}
},
    {timestamps: true}
)

module.exports = model('Token', tokenSchema)
