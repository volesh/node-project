const { CronJob } = require('cron');
const AuthDb = require("../dataBases/Auth");
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

module.exports = new CronJob(
    '0 * * * * *',
    async function() {
        try{
            const weekAgo = dayjs().utc().subtract(1, 'week')
            await AuthDb.deleteMany({createdAt: {$lte: weekAgo}})
            console.log('access deleted')
        }catch (e) {
            console.log(e.message)
        }
    }
);
