const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const multer=require("multer")
const app = express()
const fs = require('fs');
const {readdirSync} = require('fs');
const bodyParser=require("body-parser")
const port=5000
require("./mongoconnect")
const path = require("path")
const uploadDir = path.join(__dirname, 'public', 'images');

app.use('/public/images', express.static(uploadDir));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
readdirSync("./youtube").map((route)=>app.use('/api',require("./youtube/post"))) 
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

app.use(cors(corsOptions))
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser())
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


  app.use("/ecom",require("./ecom/post"))
  app.use("/auth",require("./ecom/auth"))
  app.listen(port,()=> console.log(`Connecting to port ${port}`))