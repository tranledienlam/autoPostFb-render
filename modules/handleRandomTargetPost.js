const TargetPostSchema = require("../models/TargetPost")

targetPosts = [
    'me', //page tôi cần tiền
    '1425275367755509', //Chợ Online livestream
    '932940416866676', //Ứng dụng vay tiền nhanh online
    //chưa cập nhật dât mongo
    '1815586361982058',// Vay Tiền Online Uy Tín Toàn Quốc ok

    '1754959781347653', // công khai, pending
]

const handleRandomTargetPost = async () => {

    targetPosts = await TargetPostSchema.find({})
    index = Math.floor(Math.random()* targetPosts[0].toicantien.length)

    return targetPosts[0].toicantien[index]
}

module.exports = handleRandomTargetPost
