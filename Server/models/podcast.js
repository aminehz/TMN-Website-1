const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PodcastSchema = new Schema(
  {
    title: {
      type : String ,
      required : true ,

    },
    author :{
        type :String,
        required : true
    },

     guests:{
        type :String,
        required : true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },

     podcastLink:{
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
)

PodcastSchema.plugin(uniqueValidator);

module.exports = model("Podcast", PodcastSchema);