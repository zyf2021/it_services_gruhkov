const express = require('express')
//const config = require('config')
const https = require('https')
const fs = require('fs')
const path = require('path')

const app = express()
const directoryToServe = 'client' //???



const host = '127.0.0.1';
const port = 7000;

//app.use('/', express.static(path.join(__dirname, '..', directoryToServe)))

app.get('/', (req,res)=>{
    res.send('Hell HTTPS!')
})

const httpsOptions = {
    cert: fs.readFileSync('server.cert'),
    key: fs.readFileSync('server.key')
}


https
  .createServer(httpsOptions, app)
  .listen(port, function () {
    console.log(`Server listens ${directoryToServe}/ directory at https://localhost:${port}`)
  })
