exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SQS event processed.',
      input: event,
    }),
  };

  console.log('event: ', JSON.stringify(event));

  const body = event.Records[0].body;

  callback(null, response);
};
