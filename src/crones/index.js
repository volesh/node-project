const removeOldActionTokensCron = require('./removeOldActionTokensCron')
const removeOldAccessTokensCron = require('./removeOldAccessTokensCron')
const cronRunner = () =>{
    removeOldActionTokensCron.start()
    removeOldAccessTokensCron.start()
}

module.exports = {
    cronRunner
}
