const AWS = require('aws-sdk');

// AWS.config.update({
//     region: 'us-east-1'
// });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'tom-images-test';

const put = (item) => {
    return new Promise((resolve, reject) => {
        dynamoDb.put({
            TableName: TABLE,
            Item: {
                id: item.key,
                bucket: item.bucket,
            }
        }, (err, data) => {
            if (err)
                return reject(err);

            return resolve(data);
        })
    });
};

module.exports = {
    put
};