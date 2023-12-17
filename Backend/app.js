var express = require("express")
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require("bcrypt");

var connection = require("./db_conn/Connection");
var User = require("./Schema/Users");
const auth_check = require("./Middleware/auth_check");

var app = express()
var PORT = process.env.PORT;

// necessary additions [study this in detail afterwards]
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requseted-With,Content,Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Database Connection
connection();

// APIs
app.get("/",(req,res)=>{
    res.send("Hello World !")
})

app.post("/register",(req,res)=>{
    const {name,email,password} = req.body
    bcrypt.hash(password,10)
    .then((hashed_pass)=>{
        const user = new User({
            name,
            email,
            password:hashed_pass
        });
        user.save()
        .then((results)=>{
            res.status(201).send({
                message:"User Created Successfully !",
                results
            });
        })
        .catch((error) =>{
            res.status(500).send({
                message:"Error while Creating User !",
                error,
            });
        })
    })
    .catch((e) =>{
        res.status(500).send({
            message:"Error while Hashing password !",
            e,
        });
    });
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    User.findOne({email:email})
    .then((user)=>{
        bcrypt.compare(password,user.password)
        .then((pass_check)=>{
            if(!pass_check){
                return res.status(400).send({
                    message:"Incorrect Password !",
                    pass_check,
                });
            }

            const token = jwt.sign(
                {id:user._id,
                email:user.email}
                ,process.env.SECRET_TOKEN_KEY,
                {expiresIn:600} // 10minutes
            );

            console.log("token from backend -> ",token);

            res.status(200).send({
                message:"Login Successful !",
                name:user.name,
                email:user.email,
                token
            });
        })
        .catch(e=>{
            res.status(400).send({
                message:"Incorrect Password !",
                error:e
            })
        })
    })
    .catch(e=>{
        res.status(400).send({
            message:"Email not found !",
            error:e
        })
    })
})

// Secret apis
app.get("/secret",auth_check,(req,res)=>{
    res.send("Secret API hit !");
})

// 
app.listen(PORT,(e)=>{
    if(e){console.log("Error while starting the Server !")}
    else{console.log("Server running on port ",PORT)}
})

/*
setup database connection
since jwt will be formed on the basis of username and password

understanding cookies crud

flow
    LOGIN
    ui se aaega username and password
    backend mei 1- check if it's correct with database
                2- send it to the UI to be stored into cookies
    Upon sending request from UI send the token as well
    for protected paths add middleware to check if token is correct

Role based routing
https://javascript.plainenglish.io/how-to-implement-role-based-access-control-to-each-routes-in-react-bf8790a719a7
on logout delete token from cookies and database also
*/