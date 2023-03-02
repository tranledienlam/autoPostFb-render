const mongoose = require('mongoose')

const { Schema } = mongoose

const contentsSchema = new Schema({
    name: String, // *
    desc: String,
    toLink: String, // * link affiliate
    toPhoto: String, // use for picture, if fb recieve link above 
})

const ContentsSchema = mongoose.model('contents', contentsSchema)

module.exports = ContentsSchema