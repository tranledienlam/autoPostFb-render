const ContentsSchema = require("../models/Content")

const loadContents = async () => {
    const contents = await ContentsSchema.find({block: {$not: {$eq: true}}})
    return contents
}

module.exports = loadContents