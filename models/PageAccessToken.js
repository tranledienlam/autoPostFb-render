const mongoose = require('mongoose')

const { Schema } = mongoose

const pageAccessTokenSchema = new Schema({
    accessToken: Object
})

const PageAccessTokenSchema = mongoose.model('pageaccesstokens', pageAccessTokenSchema)

module.exports = PageAccessTokenSchema