const { default: fetch } = require('node-fetch')

const handlePostToPageFb = async (accessToken, message = 'test', link = '') => {
    var url = `https://graph.facebook.com/me/feed?method=post&message=${message}&link=${link}&access_token=${accessToken}`
    const response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    return data
}

module.exports = handlePostToPageFb