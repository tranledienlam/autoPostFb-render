const { default: fetch } = require('node-fetch')


const handlePublishPagePost = {
    toLink: async (accessToken, targetPost, message, link) => {
        var url = `https://graph.facebook.com/${targetPost}/feed?method=post&message=${message}&link=${link}&access_token=${accessToken}`
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        return data
    },
    toPhoto: async (accessToken, targetPost, message, urlPhoto) => {

        var url = `https://graph.facebook.com/${targetPost}/photos?url=${urlPhoto}&message=${message}&access_token=${accessToken}`
        try {
            const response = await fetch(url, {
                method: 'POST',
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = handlePublishPagePost