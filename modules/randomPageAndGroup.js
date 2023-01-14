const {  ACCESSTOKEN } = require('../config/config');
const PageAndGroupSchema = require("../models/PageAndGroup")

// pagesAndGroups = [
//     {
//         fromPage: 'toicantien',
//         toGroup: 'me'
//     },
//     {
//         fromPage: 'cantienlaco',
//         toGroup: 'me'
//     }
// ]

const randomPageAndGroup = async () => {

    pagesAndGroups = await PageAndGroupSchema.find({})
    index = Math.floor(Math.random()* pagesAndGroups.length)

    return {
        accessToken: ACCESSTOKEN[pagesAndGroups[index].fromPage],
        fromPage: pagesAndGroups[index].fromPage,
        toGroup:  pagesAndGroups[index].toGroup
    }
}
randomPageAndGroup().then(data => console.log(data))

module.exports = randomPageAndGroup
