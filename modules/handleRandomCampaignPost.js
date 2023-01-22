const ExistCampaignSchema = require("../models/existCampaign")


existCampaigns = []

loadData = async () => {
    existCampaigns = await ExistCampaignSchema.find({})
    setTimeout(async () => {
        loadData()
    },1000*60*60*24)
}

loadData()

const handleRandomCampaignPost = async (campagins) => {

    index = Math.floor(Math.random()* campagins.length)

    if(campagins[index].idCampaign) {
        existIndex = existCampaigns.findIndex((el) => {
            return el.idCampaign == campagins[index].idCampaign
        })
        if (existIndex > -1) {
            return index
        } else handleRandomCampaignPost(campagins)
    } else {
        return index
    }
}

module.exports = handleRandomCampaignPost
