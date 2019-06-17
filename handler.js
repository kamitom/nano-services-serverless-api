'use strict';

const s3Service = require('./service/s3Service');
const dynamoDbService = require("./service/dynamoDbService");

module.exports.upload = async (event, _ctx) => {
  console.log("async event:", JSON.stringify(event, null, 2));
  console.log("context info: ", _ctx);


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