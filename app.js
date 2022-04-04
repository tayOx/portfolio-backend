const express = require('express');
require('dotenv').config();
const app = express();
const cors = require ("cors")
const rp = require("request-promise");
const bodyParser = require('body-parser');
const { rastrearEncomendas } = require('correios-brasil');

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ["Content-Type"]
  }

app.listen(process.env.PORT || 3000);
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/api', (req, res) => {

    var query = req.body.codigo
    console.log(query)

    const codRastreio = [query]
    rastrearEncomendas(codRastreio).then((data) => {
        console.log(data)
        res.send(data)
        })
    
  });

