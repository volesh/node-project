const { CronJob } = require('cron');
const AuthDb = require("../dataBases/Auth");
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

module.exports = new CronJob(
    '* 0 * * * *',
    async function() {
        try{
            const monthAgo = dayjs().utc().subtract(1, 'month')
            await AuthDb.deleteMany({createdAt: {$lte: monthAgo}})
        }catch (e) {
            console.log(e.message)
        }
    }
);
