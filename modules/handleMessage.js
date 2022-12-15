const { URL_WEB } = require("../config/config")

tags='%23toicantien %23toi_can_tien%0A%23vay_nhanh %23vay_không_cần_thế_chấp %23vay_chỉ_cần_cmnd %23vay_tiêu_dùng'

const handleMessage = async (campaign) => {
    const {
        name,
        introduction = campaign.introduction || '',
        desc = campaign.desc || '',
        link,
        sub_category = campaign.sub_category || ''
    } = campaign
    return (
        name+"%0A"+"%0A"+
        introduction+"%0A"+"%0A"+
        desc+"%0A"+"%0A"+
        "Quất ngay: "+link+"%0A"+"%0A"+
        "Tổng hợp: "+URL_WEB+"%0A"+"%0A"+
        "%23"+name.replace(/ /g,"_").replace(/-/g,"")+"%0A"+
        (sub_category? ("%23"+sub_category.replace(/ /g,"_").replace(/-/g,"")+"%0A"):"")+
        tags
    )
}

module.exports = handleMessage