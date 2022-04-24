const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const EventSchema = new Schema(
  {
    title: {
      type : String ,
      required : true ,

    },

    date: {
     type : String ,
     required : true
    },

    hour :{
        type :String,
        required : true
    },

     location :{
        type :String,
        required : true
    },

     eventPoster:{
        type :String,
        required : true
    },

        details:{
        type :String,
        required : true
    },
    status :{
      type :String ,
      required : true ,
      enum :["approved","on hold","rejected"],
    },
    

  },
  { timestamps: true }
);

EventSchema.plugin(uniqueValidator);

module.exports = model("Event", EventSchema);