const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  }
});

const listSchema = new mongoose.Schema({
  name: String,
  todos:[todoSchema]
});

module.exports = {todoSchema,listSchema} ;