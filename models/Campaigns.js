const mongoose = require('mongoose')

const { Schema } = mongoose

const financialServicesCampaignsSchema = new Schema({
    idCampaign: {type: String, required: false},
    name: String, // *
    introduction: String,
    desc: String,
    link: String, // * link affiliate
    urlPhoto: String, // use for picture, if fb recieve link above 
    typePost: String, // link (default) or photo
    block: Boolean, // fb blocked link above
    sub_category: String,
})

const FinancialServicesCampaignsSchema = mongoose.model('financialservices', financialServicesCampaignsSchema)

module.exports = FinancialServicesCampaignsSchema