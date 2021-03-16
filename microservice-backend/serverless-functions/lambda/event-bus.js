const axios = require("axios");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);

  axios.post("http://localhost:5000/events", body);
  axios.post("http://localhost:5001/events", body);
  axios.post("http://localhost:5002/events", body);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Event Bus triggered" }),
  };
};
