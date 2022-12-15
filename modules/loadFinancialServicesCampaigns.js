const FinancialServicesCampaignsSchema = require("../models/Campaigns")

const loadFinancialServicesCampaigns = async () => {
    const campaigns = await FinancialServicesCampaignsSchema.find({idCampaign: "5213572788075905357"})
    return campaigns
}

module.exports = loadFinancialServicesCampaigns