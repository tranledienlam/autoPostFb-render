targetPosts = [
    'me', //page tôi cần tiền
    '1425275367755509', //Chợ Online livestream
    '932940416866676', //Ứng dụng vay tiền nhanh online
]

const handleRandomTargetPost = async () => {
    index = Math.floor(Math.random()* targetPosts.length)
    return targetPosts[index]
}

module.exports = handleRandomTargetPost
