const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  region: 'eu-central-1'
});

exports.handler = function(event, context, callback) {
  const accountId = context.invokedFunctionArn.split(":")[4];

  console.log('accountId', accountId);

  const queueUrl = 'https://sqs.eu-central-1.amazonaws.com/081578102896/MyQueue';

  // response and status of HTTP endpoint
  const responseBody = {
    message: 'SUCCESS'
  };
  const responseCode = 200;

  // SQS message parameters
  const params = {
    MessageBody: event.Records[0].body,
    QueueUrl: queueUrl
  };

  console.log('Params', params);

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('error:', "failed to send message" + err);
      const responseCode = 500;
    } else {
      console.log('data:', data.MessageId);
      responseBody.message = 'Sent to ' + queueUrl;
      responseBody.messageId = data.MessageId;
    }
    const response = {
      statusCode: responseCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseBody)
    };

    callback(null, response);
  });
}
