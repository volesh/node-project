const UserDb = require("../dataBases/User");
module.exports = {
    getAll: async () => {
        return UserDb.find()
    },

    getById: async (id) => {
        return UserDb.findById(id)
    },

    getByParam: async (dbField, fieldToSearch) => {
        return UserDb.findOne({[dbField]:fieldToSearch})
    },

    createUser: async (userInfo) => {
        return UserDb.create(userInfo)
    },

    updateUser: async (userId, userInfo) => {
        return UserDb.findByIdAndUpdate(userId, userInfo, {new: true})
    },

    deleteUser: async (userId) => {
        return UserDb.findByIdAndDelete(userId)
    },

    // addAvatar: async (userId,avatar) => {
    //     return UserDb.
    // }
}
