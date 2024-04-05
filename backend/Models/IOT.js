const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IOTSchema = Schema(
  {
    image: { 
      type: String,
      required: true,
    },
    date: { 
        type: Date,
        required: true
    }
  }
);

module.exports = IOT = mongoose.model("IOT", IOTSchema);