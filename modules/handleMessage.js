const { URL_WEB } = require("../config/config")

//tags='%23toicantien %23toi_can_tien%0A%23vay_nhanh %23vay_không_cần_thế_chấp %23vay_chỉ_cần_cmnd %23vay_tiêu_dùng %23Vay_Tiền_Online %23Vay_trả_góp'

const handleMessage = async (campaign) => {
    const {
        name,
        desc = campaign.desc || '',
    } = campaign
    return (
        desc
    )
}

module.exports = handleMessage
