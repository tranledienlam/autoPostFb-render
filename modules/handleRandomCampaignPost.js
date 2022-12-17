
const handleRandomCampaignPost = async (campains) => {
    index = Math.floor(Math.random()* campains.length)
    return index
}

module.exports = handleRandomCampaignPost
