const FinancialServicesCampaignsSchema = require("../models/Campaigns")

const loadFinancialServicesCampaigns = async () => {
    const campaigns = await FinancialServicesCampaignsSchema.find({idCampaign: "5141521349430660949"})
    return campaigns
}

module.exports = loadFinancialServicesCampaigns