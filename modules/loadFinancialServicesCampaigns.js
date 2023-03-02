const ContentsSchema = require("../models/Content")

const loadFinancialServicesCampaigns = async () => {
    const contents = await ContentsSchema.find({block: {$not: {$eq: true}}})
    return contents
}

module.exports = loadFinancialServicesCampaigns