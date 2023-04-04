
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
   title: { type: String },
   body: { type: String },
   user: { type: String, required: true },
   comments: [{
      // an id referencing the comment
      type: mongoose.Types.ObjectId,
      // search for it in the Comments collection
      ref: 'Comment'
   }]
}, { timestamps: true })

const Entry = mongoose.model('Entries', postSchema)

module.exports = Entry