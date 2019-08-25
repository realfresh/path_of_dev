const axios = require("axios");

exports.handler = function(event, context, callback) {

  const apiKey = process.env.MAILERLITE_API;
  const query = event.queryStringParameters;
  const email = query.email;
  if (!email) {
    callback(null, { statusCode: 401, body: "missing_email" })
  }
  else {
    const responseHeaders = {
      "Access-Control-Allow-Origin" : "*",
    };
    const data = {
      method: "post",
      url: "https://api.mailerlite.com/api/v2/subscribers",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": apiKey
      },
      data: { email }
    };
    axios(data)
      .then(() => callback(null, { statusCode: 200, body: "success", headers: responseHeaders }))
      .catch(() => callback(null, { statusCode: 500, body: "error", headers: responseHeaders }))
  }

}
