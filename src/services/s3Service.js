const s3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1
const path = require('node:path');
const { envsConfig } = require("../configs");

const s3Bucket = new s3({
    region: envsConfig.S3_BUCKET_REGION,
    accessKeyId: envsConfig.S3_ACCESS_KEY,
    secretAccessKey: envsConfig.S3_SECRET_KEY
})

async function uploadPublicFile (fileToUpload, folderName, userId) {
    return s3Bucket.upload({
        ContentType: fileToUpload.mimetype,
        ACL: 'public-read',
        Body: fileToUpload.data,
        Bucket: envsConfig.S3_BUCKET_NAME,
        Key: fileNameGenerator(fileToUpload.name, folderName, userId)
    }).promise()
}

function fileNameGenerator (fileName, folderName, userId) {
    const extName = path.extname(fileName)

    return `${folderName}/${userId}/${uuid()}${extName}`

}

module.exports = {
    uploadPublicFile
}
