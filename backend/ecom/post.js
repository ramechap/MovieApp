const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const Auth=require("./middleware")
const YoutubeAuth=require("./accountscehma")

const router = express.Router();
const uuid= require('uuid').v4;
const fs = require('fs');
const ecom = require("./postschema")
const review = require("./reviewschema")
// const dir = './uploads';
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(bodyParser.json())
router.use(cookieParser())
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

const uploadDir = path.join(__dirname, 'public', 'images');

app.use('/public/images', express.static(uploadDir));
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
        cb(null, id +  path.extname(fileName))
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


router.post("/create", uploads.single('image'), async (req, res) => {
    console.log('Body:', req.body); // Log body to see what is being sent
    console.log('File:', req.file);   // Log file to check if it's being processed
 
    if (!req.file) {
        return res.status(400).send({ error: 'No phpto file uploaded.' });
    }
   
    // const categories = Array.isArray(req.body.category) ? req.body.category : [req.body.category];
    // const specifications = Array.isArray(req.body.specification) ? req.body.specification : [req.body.specification];
    const category=req.body.category
    const speci=req.body.specification
    let categoriesArray = [];



    try {
       
        const videoPath = req.file.path; // Adjust as needed
        const youtubePost = new ecom({
            title: req.body.title,
          
            description: req.body.description,
            photourl: videoPath,
            author: req.body.author,
            quantity:req.body.quantity,
            price:req.body.price,
            // category:categories,
            // specification:specifications,
            categoryy:category.toString().split(',').map(item => item.trim()),
            specification:speci.split(',').map(item => item.trim()),

           
            filename: `http://localhost:5000/public/images/${req.file.filename}`
        });
        console.log('Uploaded file path:', req.file.path);
        await youtubePost.save();
        res.status(200).send({  youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/createreview/:postid", async (req, res) => {
    const postid=req.params.postid

    try {
        const youtubePost = new review({
          
            rating: req.body.rating,
            description: req.body.description,
            email: req.body.email,
            author: req.body.author,
            postid:postid
        });

        await youtubePost.save();
        res.status(200).send({  youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
router.get("/getreview/:postid", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.postid)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    const id=req.params.postid
    try {
        
        const youtubePost = await review.find({
                postid:id
        })

        
        res.status(200).send({ youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/getall", async (req, res) => {


    try {
    
        const youtubePost = await ecom.find()
        
        
        res.status(200).send({ youtube: youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/search", async (req, res) => {
    const { query } = req.query; // Extract the query parameter from the request

    if (!query) {
        return res.status(400).send({ error: 'Query parameter is required' });
    }

    try {
        // Search across multiple fields (title, description, category)
        const youtubePost = await ecom.find({
            $or: [
                { 
                    title: { $regex: query, $options: 'i' }  // Search case-insensitive in title
                },
                { 
                    description: { $regex: query, $options: 'i' }  // Search case-insensitive in description
                },
                { 
                    category: { $elemMatch: { $regex: query, $options: 'i' } }  // Search each category element
                }
            ]
        });

        res.status(200).send({ youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error searching posts' });
    }
});



router.get("/getpost/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    const id=req.params.id
    try {
        
        const youtubePost = await ecom.findById(id)

        
        res.status(200).send({ youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put("/edit/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    const id=req.params.id
    try {
        
        const youtubePost = await ecom.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        
        res.status(200).send({ youtubePost });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
router.delete("/delete/:id", async (req, res) => {
    const cid = req.params.id
    try {
        const youtubePost = await ecom.findByIdAndDelete(cid)
        const videoPath = path.join(youtubePost.photourl);

        // Delete the video file from the server
        fs.unlink(videoPath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).send({ error: 'Error deleting image file' });
            }
            console.log("delete")
            res.status(200).send({ youtubePost })
        })
        
    } catch (error) {

        res.status(500).send(error)
    }
})

module.exports=router;