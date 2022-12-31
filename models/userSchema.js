const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    questions : [
        {
            question : {
                type : String,
                required : true
            },
            link : {
                type : String,
                required : true
            },
            category : {
                type: String,
                required: true
            },
            isDone : {
                type : Boolean
            }
        }
    ]
})

// Middleware to hash the password before saving it to the Database
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

userSchema.methods.generateAuthToken = async function (){
    try{
        const jsontoken = jwt.sign({email : this.email}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : jsontoken});
        await this.save();
        return jsontoken;

    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;