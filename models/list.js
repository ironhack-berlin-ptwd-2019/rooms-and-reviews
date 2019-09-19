const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String },
  description: { type: String, default: '<none>' },
  imageUrl: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  board: { type: Schema.Types.ObjectId, ref: 'Board' }
}, {
    timestamps: true
  });

module.exports = mongoose.model("List", listSchema);