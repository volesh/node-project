const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { envsConfig, tokensTypeConfig } = require("../configs");
const { apiError } = require("../errors");
const AuthDb = require('../dataBases/Auth');
const TokenDb = require('../dataBases/Token');

module.exports = {
    hashPassword: async (pass) => bcrypt.hash(pass, 10),

    comparePasswords: async (pass, hashedPass) => {
        const isSame = await bcrypt.compare(pass, hashedPass)

        if (!isSame) {
            throw new apiError('Wrong email or password', 400)
        }
    },

    deleteActionToke: async (token) => {
      return TokenDb.findOneAndDelete({token})
    },

    createTokensPair: async (tokenPair) => {
        return AuthDb.create(tokenPair)
    },

    generateAccessTokenPair: (data) => {
        const accessToken = jwt.sign(data, envsConfig.ACCESS_KEY_WORD, {expiresIn: '1d'})
        const refreshToken = jwt.sign(data, envsConfig.REFRESH_KEY_WORD, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    },

    generateActionToken: (data, secretWord) => {
        return  jwt.sign(data, secretWord, {expiresIn: '1d'})
    },

    createToken: async (data) => {
        return TokenDb.create(data)
    },

    checkToken: (token, tokenType = tokensTypeConfig.ACCESS_TOKEN) => {
        let secretWord = ''
        switch (tokenType){
            case tokensTypeConfig.ACCESS_TOKEN:
                secretWord = envsConfig.ACCESS_KEY_WORD
                break
            case tokensTypeConfig.REFRESH_TOKEN:
                secretWord = envsConfig.REFRESH_KEY_WORD
                break
            case tokensTypeConfig.FORGOT_PASS_TOKEN:
                secretWord = envsConfig.FORGOT_PASS_KEY_WORD
                break
        }

        return jwt.verify(token, secretWord)
    }
}
