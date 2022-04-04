const express = require('express');
require('dotenv').config();
const app = express();
const cors = require ("cors")
const rp = require("request-promise");
const bodyParser = require('body-parser');
const { rastrearEncomendas } = require('correios-brasil');


var PORT = process.env.PORT || 8080
app.listen(PORT);
console.log(PORT)
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/api', (req, res) => {
    console.log("oi")
    var query = req.body.codigo
    console.log(query)

    const codRastreio = [query]
    rastrearEncomendas(codRastreio).then((data) => {
        console.log(data)
        res.send(data)
        })
    
  });

