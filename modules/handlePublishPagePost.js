const { default: fetch } = require('node-fetch')

const handlePublishPagePost = {
    toLink: async (accessToken, message, link) => {
        var url = `https://graph.facebook.com/me/feed?method=post&message=${message}&link=${link}&access_token=${accessToken}`
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        return data
    },
    toPhoto: async (accessToken, message, urlPhoto) => {
        console.log(message)
        var url = `https://graph.facebook.com/me/photos?url=${urlPhoto}&message=${message}&access_token=${accessToken}`
        const response = await fetch(url, {
            method: 'POST',
        });
        const data = await response.json();
        return data
    },
}

module.exports = handlePublishPagePost