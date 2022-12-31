const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require('../middleware/authenticate')
const jwt = require('jsonwebtoken');

// connecting to database
require('../db/conn');
const User = require('../models/userSchema');

// Route for the Home Page
router.get("/", (req, res) => {
    res.send({ message: "Welcome to the Site" });
})

// Route for the Register Page
router.post("/register", async (req, res) => {
    try {
        // destructuring the register form details
        const { name, email, password, cpassword, question, link, category } = req.body;

        // form validation
        if (!name || !email || !password || !cpassword) {
            return res.status(422).json({ error: "Please fill all the details" });
        }
        if (password != cpassword) {
            return res.status(422).json({ error: "Password does not match" });
        }

        // checking whether email is unique or not
        const userExist = await User.findOne({ email });
        const testData = await User.findOne({email : "Admin@mail.com"})

        if (userExist) {
            // User.findOneAndUpdate({ email: userExist.email }, { $push: { questions: { question, link, category } } }, function (error, success) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log(success);
            //     }
            // })
            return res.status(422).json({ error: "Email already exist" });
        }

        // creating a user schema to save
        const user = new User({ name, email, password, cpassword });

        // before saving the data to server first we have to hash the password for safety puspose with middleware in the user shcma

        // saving data if email is unique
        await user.save();

        // transfering the question from Admin to user
        User.findOneAndUpdate({ email: email }, { $set: { questions: testData.questions } }, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })
        res.status(201).json({ message: "User registerd successfully" });

    } catch (err) {
        console.log(err);
    }
})

router.post("/login", async (req, res) => {
    try {
        // destructuring the register form details
        const { email, password } = req.body;

        // form validation
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the details" });
        }

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            // verifying user password and hashed password
            const isMatch = await bcrypt.compare(password, emailExist.password);

            if (isMatch) {
                const token = await emailExist.generateAuthToken();

                res.cookie('dsatokens', token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                })
                res.status(201).json({ message: "User login successfull" })
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" })
        }
    } catch (err) {
        console.log(err)
    }

})

router.get('/practice', authenticate, async (req, res) => {
    res.status(200).json(req.rootUser.questions)
})

router.post('/question',async (req,res)=>{

    const token = req.cookies.dsatokens;
    const data = jwt.verify(token,process.env.SECRET_KEY);

    User.findOneAndUpdate({email : data.email }, {$set :{[`questions.${req.body.count}.isDone`] : true}},function(error, success){
        if(error){
            console.log("Error");
        }
        else{
            console.log("Done");
        }
    })
    res.status(200).send("Yep")
})

router.get('/logout',(req,res)=>{
    res.clearCookie('dsatokens', {path : '/'});
    res.status(200).json({ Success:"User Logout Successfully" })
})

module.exports = router;