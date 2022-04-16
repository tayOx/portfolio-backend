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
        url: "http://ip-api.com/json/"+query+"?fields=1209365",
        responseType: "json"

    }).then((data) => res.send(data.data));

});

app.post('/genqr', (req, res) => {

    var type = req.body.type;
    var value = req.body.value;
    console.log(type, value)

    const options = {

        method: "GET",
        url: "https://codzz-qr-cods.p.rapidapi.com/getQrcode",
        params: {type: type, value: value},
        headers: {

            'X-RapidAPI-Host': 'codzz-qr-cods.p.rapidapi.com',
            'X-RapidAPI-Key': 'a578b8ba3emsh56315883d4ff6bap13fca3jsn1ad3c1c28488'

        }
    };

    axios.request(options).then((data) => res.send(data.data));

});
