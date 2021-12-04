const express = require('express')
const config = require('config')
const https = require('https')
const fs = require('fs')
const path = require('path')
const db = require("./models")

const app = express()
const port = config.get('PORT')||8080

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"))
})
app.get("/profile",(req,res)=>{
  res.sendFile(path.join(__dirname, "views/page2.html"))
})
app.get("/order",(req,res)=>{
  res.sendFile(path.join(__dirname, "views/page3.html"))
})

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/request', require('./routes/request.routes'))




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


