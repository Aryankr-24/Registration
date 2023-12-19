const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            maxlength:30,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
            maxlength:100,
            validate:validator.isEmail,
        },
        batch:{
            type:String,
            required:true,
            enum:{
                values:["6-7 AM", "7-8 AM", "8-9 AM", "5-6 PM"],
            },
        },
        age: {
            type: Number,
            min: 18,
            max: 65,
            required:true,
          },
    },
    {
        timestamps: true,
    }
);

module.exports=mongoose.model("User", userSchema);