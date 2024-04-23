const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
    },
    relationship: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
    },
    active: {
      type: [Date],
    },
  },
  { timestamps: true }
);

module.exports = member = mongoose.model("member", memberSchema);
