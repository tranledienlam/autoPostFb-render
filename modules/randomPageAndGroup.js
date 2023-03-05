const PageAccessTokenSchema = require('../models/PageAccessToken');
const PageAndGroupSchema = require("../models/PageAndGroup")

accessToken = {
    // 'toicantien':'EAAJJRn8x7VEBAGjBN3cdINg5KaOXN9FQBVw4RHqJG96rovmCXOUj3kCU4XeUFd4cNSaFD1g4KkdSalDgN3Yv5gzRLCyA4paEO3ckoS1LaEuzamB8CGxOgALi9HZA0mFWiOb2JMvhwBBKTJg6YBtpG27fQAXMugMkaHq67qZAWSAtX6Xrxc',
    // 'cantienlaco':'EAAR0FSqiVCwBAEZBncb0MoSsR5L33aZBFhWjdorKlK38ZAeRTaHSWk7ZBAFBwHB4wMpFcZBwF271oAVWdDiJvqL2G4P1quyKaC9jNwWqqSsH2NZBk1BBMEnCK35D57m3gT9cBibViyTecqR8hIfzmiyENNvZCkTn8rSndfHhoV2MBuRoZBW2v4Yu'
}

const randomPageAndGroup = async (pagesAndGroups) => {

    index = Math.floor(Math.random()* pagesAndGroups.length)

    if(accessToken && accessToken[pagesAndGroups[index].fromPage]) {
        console.log('randomPageAndGroup exist Token')
    } else {
        dataAccessToken = await PageAccessTokenSchema.find({})
        accessToken = dataAccessToken[0].accessToken
    }

    return {
        accessToken: accessToken[pagesAndGroups[index].fromPage],
        fromPage: pagesAndGroups[index].fromPage,
        toGroup:  pagesAndGroups[index].toGroup
    }
}

module.exports = randomPageAndGroup
