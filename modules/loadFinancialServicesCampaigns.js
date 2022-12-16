const FinancialServicesCampaignsSchema = require("../models/Campaigns")

const loadFinancialServicesCampaigns = async () => {
    const campaigns = await FinancialServicesCampaignsSchema.find()
    return campaigns
}

module.exports = loadFinancialServicesCampaigns