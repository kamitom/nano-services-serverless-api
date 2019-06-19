'use strict';

const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const base64png = require('../resources/module.base64');


// AWS.config.update({
//     region: 'us-east-1'
// });

const s3 = new AWS.S3();

const BUCKET = 'tom-photos';

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = new Buffer(file, 'binary');
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


const upload = (body) => {
    console.log("upload body: ", JSON.stringify(body));
    const id = uuidv4();

    const base64d2_realUpload = base64_encode(body);
    console.log("base64d2_realUpload look: ", base64d2_realUpload);

    const base64flag = base64png.base64britishRound;

    console.log("base64flag look: ", base64flag);

    return new Promise((resolve, reject) => {

        // Ensure that you POST a base64 data to your server.
        // Let's assume the variable "base64" is one.
        const base64Data = new Buffer(base64flag.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        // Getting the file type, ie: jpeg, png or gif
        // const type = base64d.split(';')[0].split('/')[1];

        // Generally we'd have a userId associated with the image
        // For this example, we'll simulate one
        // const userId = uuidv4();

        // With this setup, each time your user uploads an image, will be overwritten.
        // To prevent this, use a unique Key each time.
        // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
        const params2 = {
            Bucket: BUCKET,
            Key: `${id}.png`, // type is not required
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64', // required
            ContentType: `image/png` // required. Notice the back ticks
        }

        // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
        // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
        s3.upload(params2, (err, data) => {
            if (err) {
                console.log("err: ", err);
                return reject(err);
            }
            console.log('Image successfully uploaded.');
            return resolve({
                bucket: BUCKET,
                key: id
            });
            // Continue if no error
            // Save data.Location in your database
        });

        // upload txt file demo:
        // s3.putObject({
        //     Bucket: BUCKET,
        //     Key: id + '.csv',
        //     //  Body: new Buffer(body.replace(/^data:image\/w+;base64,/, ""), 'base64'),
        //     Body: new Buffer(body, 'binary'),
        //     ContentEncoding: 'binary',
        //     ContentType: 'text/csv',
        //     //  ContentEncoding: 'base64',
        //     //  ContentType: 'image/jpeg',
        // }, (err, data) => {
        //     if (err) {
        //         return reject(err)
        //     }
        //     console.log('text/csv file successfully uploaded.');
        //     return resolve({
        //         bucket: BUCKET,
        //         key: id
        //     });
        // });

    });

};


module.exports = {
    upload
};