const { default: fetch } = require('node-fetch');
const handleErrors = require('./handleErrors');


const handlePublishPagePost = {
    toText: async (accessToken, targetPost, message) => {
        var url = `https://graph.facebook.com/${targetPost}/feed?message=${message}&access_token=${accessToken}`
        try {
            const response = await fetch(url, {
                method: 'POST',
            })
            const data = await response.json()
            if(data.error) {
                await handleErrors(data.error, targetPost)
            }
            return data
        } catch(error) {
            console.log('file handle',error)
        }
    },
    toLink: async (accessToken, targetPost, message, link) => {
        var url = `https://graph.facebook.com/${targetPost}/feed?message=${message}&link=${link}&access_token=${accessToken}`
        try {
            const response = await fetch(url, {
                method: 'POST',
            });
            const data = await response.json();
            if(data.error) {
                await handleErrors(data.error, targetPost)
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
                await handleErrors(data.error, targetPost)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = handlePublishPagePost