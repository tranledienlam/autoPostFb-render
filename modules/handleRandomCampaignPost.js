const handleRandomCampaignPost = async (campagins) => {

    index = Math.floor(Math.random()* campagins.length)

    return index
}

module.exports = handleRandomCampaignPost
