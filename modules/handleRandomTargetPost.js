const TargetPostSchema = require("../models/TargetPost")

targetPosts = [
    'me', //page tôi cần tiền
    '1425275367755509', //Chợ Online livestream
    '932940416866676', //Ứng dụng vay tiền nhanh online
    '1733875150259115', // Chợ trời Online GiaohangTienloi
    '1815586361982058',// Vay Tiền Online Uy Tín Toàn Quốc ok
    '774500883833906', // Vay Tiền Online
    '1887843441347862', // Vay Tiền Nhanh
    '394166946250256', // VAY TIỀN ONLINE
    '657143315292158', // pending
    '667237784136460',
    '223072118232062',
    '4217488668280922',
    '1922235961394217',
    '407295359462494',
    '396071528373572',
    '786945545989583',
    '337495681146071',
    //chưa cập nhật dât mongo 10 group

    '1289608554735506', // Hội Vay App Online Nhanh chặn
    '1754959781347653', // công khai, pending
    '2008238049436153', // công khai, pending
    '2071810786403364', // công khai, pending
    '834804993791105', // công khai, pending
    '513204273027791',
    '678804743245315',
    '2065805583702006',
    '2757582787877891',
    '392800101343467',
    '232664574147679', // Vay Vốn Tín chấp pending
    '2963756470533461', //pending
    '450913218968229',//pending
    '4853289061422175', // pending
    '219273698097195', // pending
    '1265636550202892', // không up được
    '503072033412147',
    '366101381662648', // nó duyệt
    '125377341453804', //pending
]

const handleRandomTargetPost = async () => {

    targetPosts = await TargetPostSchema.find({})
    index = Math.floor(Math.random()* targetPosts[0].toicantien.length)

    return targetPosts[0].toicantien[index]
}

module.exports = handleRandomTargetPost
