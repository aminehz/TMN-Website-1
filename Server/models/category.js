const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      //unique: true,
    },

    refrencesTo: {
      type: String,
      required: true,
      enum: ["news", "blogs","podcast"],
    },
  },
  { timestamps: true }
);

//CategorySchema.plugin(uniqueValidator);

module.exports = model("Category", CategorySchema);
