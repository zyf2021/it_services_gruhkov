const express = require('express')
const config = require('config')
const https = require('https')
const fs = require('fs')
const path = require('path')
const db = require("./models")

const app = express()
const port = config.get('PORT')||8080

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes.js'))
//app.use('/api/user', require('./routes/user.routes'))
/*app.use('/api/request', require('./routes/request.routes'))*/

//app.use('/', express.static(path.join(__dirname, '..', directoryToServe)))

app.get('/', (req,res)=>{
    res.send('HTTPS!!!!')
})

const httpsOptions = {
    cert: fs.readFileSync('server.cert'),
    key: fs.readFileSync('server.key')
}
db.sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err))

//{force: true}

https
  .createServer(httpsOptions, app)
  .listen(port, function () {
    console.log(`Server listens at https://localhost:${port}`)
  })


