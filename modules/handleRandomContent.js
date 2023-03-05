const handleRandomContent = async (contents) => {

    index = Math.floor(Math.random()* contents.length)

    return index
}

module.exports = handleRandomContent
