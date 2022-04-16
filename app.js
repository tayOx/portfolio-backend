const express = require('express');
require('dotenv').config();
const app = express();
const cors = require ("cors")
const rp = require("request-promise");
const bodyParser = require('body-parser');
const { rastrearEncomendas } = require('correios-brasil');
const { default: axios } = require('axios');

var PORT = process.env.PORT || 8080
app.listen(PORT);
console.log(PORT)
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/correios', (req, res) => {

    var query = req.body.codigo;
    const codRastreio = [query];

    rastrearEncomendas(codRastreio).then((data) => {
        console.log(data)
        res.send(data)
        });
    
  });

app.all('/ip', (req, res) => {

    var query = req.body.ip
    axios({

        method: "get",
        url: "http://ip-api.com/json/"+query+"?fields=17982485",
        responseType: "json"

    }).then((data) => res.send(data.data));

});

