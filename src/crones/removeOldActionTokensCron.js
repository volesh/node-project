const { CronJob } = require('cron');
const TokenDb = require("../dataBases/Token");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc)

module.exports = new CronJob(
    '* 0 * * * *',
    async function() {
        try{
            const dayAgo = dayjs().utc().subtract(1, 'day')
            await TokenDb.deleteMany({createdAt: {$lte: dayAgo}})
        }catch (e) {
            console.log(e.message)
        }
    }
);
