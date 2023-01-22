const mongoose = require("mongoose")

const {Schema} = mongoose

const existCampaignSchema = new Schema({
    idCampaign: String,
    name: String
})

const ExistCampaignSchema = mongoose.model('existcampaigns', existCampaignSchema)

module.exports = ExistCampaignSchema