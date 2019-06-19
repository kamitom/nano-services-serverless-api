'use strict';

const uuidv4 = require('uuid/v4');

const s3Service = require('./service/s3Service');
const dynamoDbService = require("./service/dynamoDbService");



module.exports.upload = async (event, _ctx) => {
  console.log("async event: " + uuidv4(), JSON.stringify(event, null, 2));
  console.log("context info2: ", _ctx);
  console.log("event.body2: ", event.body);

  try {
    const item = await s3Service.upload(event.body);
    await dynamoDbService.put(item);

    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };

  } catch (e) {
    console.log("Error is: ", e.stack);
    return {
      statusCode: 400,
      msg: "Error: " + e.message,
    };
  }

};