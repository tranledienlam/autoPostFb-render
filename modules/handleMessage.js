const { URL_WEB } = require("../config/config")

//tags='%23toicantien %23toi_can_tien%0A%23vay_nhanh %23vay_không_cần_thế_chấp %23vay_chỉ_cần_cmnd %23vay_tiêu_dùng %23Vay_Tiền_Online %23Vay_trả_góp'

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
        "Mọi thông tin mang tính chất tham khảo, chi tiết có thể thay đổi tùy thuộc vào từng thời điểm của dịch vụ đăng ký"+"%0A"+
        "----"+"%0A"+
        '%23list_app_vay_tien'
    )
}

module.exports = handleMessage
