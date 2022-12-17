const FinancialServicesCampaignsSchema = require("../models/Campaigns")

const loadFinancialServicesCampaigns = async () => {
    const campaigns = await FinancialServicesCampaignsSchema.find({block: {$not: {$eq: true}}})
    return campaigns
}

module.exports = loadFinancialServicesCampaigns