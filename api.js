const axios = require('axios');

const api = axios.create({

    baseURL: "http://api.jonesybot.xyz:8080/"

});

module.exports = api;