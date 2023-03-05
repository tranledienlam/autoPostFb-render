const PageAndGroupSchema = require("../models/PageAndGroup")

const loadPagesAndGroups = async () => {
    const pagesAndGroups = await PageAndGroupSchema.find({})
    return pagesAndGroups
}

module.exports = loadPagesAndGroups