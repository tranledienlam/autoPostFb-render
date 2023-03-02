const PageAndGroupSchema = require("../models/PageAndGroup")

const handleErrors = async (error, idGroup) => {
    const {message} = error
    // thành công
    if(message.includes(`Unsupported request - method type: post`)) {
        
    } else {
        console.log(`message: ${message}`)
    }
    // noti
    if(message.includes(`Invalid parameter`)) {
        console.log(`message: ${error?.error_user_msg}`)
        console.log('-> Sử dụng link toPhoto có đuối .JPG, PNG... Ví dụ:')
        console.log('https://i.pinimg.com/originals/d0/32/d1/d032d1c21d8bce9676f1626ef8c03b83.jpg')
    }
    // delete database
    if(message.includes(`Object with ID '${idGroup}' does not exist`)) {
        await PageAndGroupSchema.deleteOne({toGroup: idGroup})
        console.log(`deleted: ${idGroup}`)
    }
    if(message.includes(`(#200) Insufficient permission to post to group`)) {
        await PageAndGroupSchema.deleteOne({toGroup: idGroup})
        console.log(`deleted: ${idGroup}`)
    }
    
}

module.exports = handleErrors
