const { CronJob } = require('cron');
const {TokenDb} = require("../dataBases");
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

module.exports = new CronJob(
    '0 * * * * *',
    async function() {
        try{
            const dayAgo = dayjs().utc().subtract(1, 'day')
            await TokenDb.deleteMany({createdAt: {$lte: dayAgo}})
            console.log('action deleted')
        }catch (e) {
            console.log(e.message)
        }
    }
);
