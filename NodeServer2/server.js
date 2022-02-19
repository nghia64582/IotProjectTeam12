const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 2000
require('./Manager');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

let routes = require('./api/routes')
routes(app)

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})
app.listen(port)

require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    console.log('addr: ' + add);
})
console.log('RESTful API server started on: ' + port)

var mgr = require('./Manager');
console.log(JSON.stringify(mgr));

setInterval(() => {
    mgr.update(1000);
}, 1000);