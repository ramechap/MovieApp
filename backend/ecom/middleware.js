const jwt =require("jsonwebtoken");

//Authentication Middleware (Accepting and Validating Tokens)

//The goal of this middleware is to validate the authentication token and then fetch the profile for that user. 
const Auth=async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if (!token) return res.status(403).send("Access denied.");
        jwt.verify(token, "astrowebwebsitetoken",async(err,data)=>{
            if(err){
                return res.status(403).json("Token is not validd")
            }
            req.author = data._id
            next();
        });
    
       
        
    }
    catch(e){
        res.status(401).send(e)
    }
   
}
module.exports= Auth;


//The method verify() verifies the authentication token from req.header using our private key yourprivatekey. A decoded token is returned, which contains the payload we used to create the token (id). This decoded token can then be used to fetch a user profile which can then be passed to req.user. This allows route handler functions to access the user profile without having to fetch it again.