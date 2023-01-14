const mongoose = require('mongoose')

const { Schema } = mongoose

const pageAndGroupSchema = new Schema({
    fromPage: String,
    toGroup: String
})

const PageAndGroupSchema = mongoose.model('pagesandgroups', pageAndGroupSchema)

module.exports = PageAndGroupSchema