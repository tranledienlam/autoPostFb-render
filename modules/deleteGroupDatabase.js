const PageAndGroupSchema = require("../models/PageAndGroup")

const deleteGroupDatabase = async (message, idGroup) => {

    if(message.includes(`Object with ID '${idGroup}' does not exist`)) {
        await PageAndGroupSchema.deleteOne({toGroup: idGroup})
        console.log(`deleted: ${idGroup}`)
    }
    if(message.includes(`(#200) Insufficient permission to post to group`)) {
        await PageAndGroupSchema.deleteOne({toGroup: idGroup})
        console.log(`deleted: ${idGroup}`)
    }
}

module.exports = deleteGroupDatabase
