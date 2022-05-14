const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const NewsSchema = new Schema(
  {
    title: {
      type : String ,
      required : true ,

    },
    
    newsImages:{
        type :[String],
        required : true
    },
    
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    content:{
        type :String,
        required : true
    },

    author:{
        type :String ,
        required :true
    },

  

    status :{
      type :String ,
      required : true ,
      enum :["approved","on hold","rejected"],
},
    },

  { timestamps: true }

);

NewsSchema.plugin(uniqueValidator);

module.exports = model("News", NewsSchema);