const mongoose = require('mongoose')

const { Schema } = mongoose

const targetPostSchema = new Schema({
    toicantien: Array
})

const TargetPostSchema = mongoose.model('targetposts', targetPostSchema)

module.exports = TargetPostSchema