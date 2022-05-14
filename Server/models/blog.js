const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

   author:{
      type: String,
      required:false,
    },
    
    authorSocialMedia:{
      type:String,
      required:false ,
    },

    status:{
      type : String,
      required :true ,
      enum :["aproved","on hold","rejected"]
    },
   
  },
  { timestamps: true }
);

BlogSchema.plugin(uniqueValidator);

module.exports = model("Blog", BlogSchema);
