const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      //unique: true,
    },

    refrencesTo: {
      type: String,
      required:true,
      enum:["news","blog","podcast"]
    },

  },

  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
