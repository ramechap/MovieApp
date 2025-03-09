const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")

const bcrypt =require("bcryptjs");
const fs = require('fs');
const Auth=require("./middleware")
const router = express.Router();
const {  uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const { info } = require("console")
const ecomAuth = require("./accountscehma")

app.use(bodyParser.urlencoded({
    extended: true
}))
const uuid= require('uuid').v4;
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(bodyParser.json())
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend origin
    credentials: true, // Allow cookies and credentials
}));
router.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend origin
    credentials: true, // Allow cookies and credentials
}));
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

const uploadDir = path.join(__dirname, 'public', 'photo');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // recursive option for nested directories
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const id = uuid();
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, id + fileName)
    }
});



// Create the multer instance
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/signup",   async(req, res) =>{
   
       
      
        try {
            let password=req.body.password;
            let cpassword=req.body.cpassword;
            let email=req.body.email;
         
            const existinguser = await ecomAuth.findOne({ email });
            if (existinguser) {
                return res.status(400).json("Email already exists");
            }
            if (password ==cpassword) {
                const auth = new ecomAuth({
                    email: email,
                    password: password,
                   cpassword:cpassword
                    
                })
                console.log(req.body)
        
                await auth.save()
                res.status(200).send({ auth })
               
            }
            return res.status(400).json("Password Mismatch");
            
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    

})


    router.post("/login",  async(req, res) =>{
        let password=req.body.password;
        let email=req.body.email;
        try {
            const existinguser = await ecomAuth.findOne({ email });
            if (!existinguser) {
                return res.status(400).json("Email doesn't exists");
            }
    
            const hashpass=await bcrypt.compare(password,existinguser.password)
            if (!hashpass) {
                return res.status(400).json("Password doesn't match");
            }
            
            const token = await existinguser.generateAuthToken();
            console.log(token)
            res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true })
                .status(200)
                .send({ info: existinguser });
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
 
    router.get("/logout",  async(req, res) =>{
        
        try {
            res.clearCookie("token").status(200).send("logout sucess")
         
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    router.get("/getall", async (req, res) => {


        try {
        
            const youtubePost = await ecomAuth.find({ role: { $ne: 'admin' } })
            
            
            res.status(200).send({ youtube: youtubePost });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });
    
   // Corrected profile route
  
   router.get("/profile", Auth,async (req, res) => {
    try {
      const token = req.cookies.token;  // Get the token from the cookies
      
      if (!token) {
        return res.status(400).send("Token is missing");
      }
  
      // Verify the token
      jwt.verify(token, "astrowebwebsitetoken", async (err, data) => {
        if (err) {
          return res.status(400).send("Invalid token");  // Invalid token
        }
  
        // If the token is valid, find the user
        const user = await ecomAuth.findById(data._id);
        if (!user) {
          return res.status(404).send("User not found");
        }
     
        // Send user details back
        res.status(200).send({
          id: user._id,
          email: user.email,
         
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });




module.exports=router;