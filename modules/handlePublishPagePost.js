const { default: fetch } = require('node-fetch');
const deleteGroupDatabase = require('./deleteGroupDatabase');


const handlePublishPagePost = {
    toLink: async (accessToken, targetPost, message, link) => {
        var url = `https://graph.facebook.com/${targetPost}/feed?message=${message}&link=${link}&access_token=${accessToken}`
        try {
            const response = await fetch(url, {
                method: 'POST',
            });
            const data = await response.json();
            if(data.error) {
                console.log(`message: ${data.error.message}`)
                await deleteGroupDatabase(data.error.message, targetPost)
            }
            return data
        } catch(error) {
            console.log('file handle',error)
        }
    },
    toPhoto: async (accessToken, targetPost, message, urlPhoto) => {

        var url = `https://graph.facebook.com/${targetPost}/photos?url=${urlPhoto}&message=${message}&access_token=${accessToken}`
        try {
            const response = await fetch(url, {
                method: 'POST',
            });
            const data = await response.json();
            if(data.error) {
                console.log(`message: ${data.error.message}`)
                await deleteGroupDatabase(data.error.message, targetPost)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = handlePublishPagePost