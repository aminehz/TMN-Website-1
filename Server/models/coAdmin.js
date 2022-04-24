const express = require("express");
const { Schema, model } = require("mongoose");

const coAdminSchema = new Schema({

  name: {
    type: String,
    required: true,
  },

  lastName:{
    type:String,
    required :true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String, 
    required: true,
  },

  city:{
    
    type :String ,
    required :true,
  },
  
  role:{

    type: String ,
    required: true,
    enum :["co-admin"]
  }
  
});

module.exports = model("CoAdmin", coAdminSchema);
