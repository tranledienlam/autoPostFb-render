
const express = require('express');
const fs = require('fs');

const { PORT, URL_WEB } = require('./config/config');
const handlePublishPagePost = require('./modules/handlePublishPagePost');
const connectDB = require('./config/db');
const loadFinancialServicesCampaigns = require('./modules/loadFinancialServicesCampaigns');
const handleMessage = require('./modules/handleMessage');
const formatTime = require('./modules/formatTime');
const handleRandomCampaignPost = require('./modules/handleRandomCampaignPost');
const handleRandomTime = require('./modules/handleRandomTime');
const randomPageAndGroup = require('./modules/randomPageAndGroup');

const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//connect DB
connectDB()

app.get('/', (req, res) => {
    res.json({ 'success': true })
}) 

main = async () => {
    contents = []
    message = ''
    i = 0
    posted = 0
    fail = 0
    start = 20// handleRandomTime(23) //enter minute, +/-40%
    step = 5
    countdown = start // change s

    const publishPagePost = async () => {
            // random campain to post
            i = await handleRandomCampaignPost(contents)

            // random page and group
            pageAndGroup = await randomPageAndGroup()
            accessToken = pageAndGroup.accessToken
            fromPage = pageAndGroup.fromPage
            groupid = pageAndGroup.toGroup
            // cantienlaco
            accessToken = 'EAAKcMOZCuOcwBAGXyZBfPAq1ldvGYAOG4kfCHJnLcfZBQo3q20GZCTRmGrwq4tKZAvNbNA6ZBc6zj0HjC20lFB1WrJ0ZALJU88MPXK6Vk8LcgZB9fNvXQAQgf3ivsvSOcMvuXH4T3Wj0dm8y0jUf1FddNgNJSXegxdlmacyFU6kDkYQZCzauKOUOV'
            groupid = 'me'
            // i = contents.length -1
            // i = 2

            message = await handleMessage(contents[i])
            // post to phtoto
            if(contents[i]?.toPhoto) {
                console.log(`${fromPage} -> toPhoto ${groupid}`)
                await handlePublishPagePost.toPhoto(accessToken,groupid, message, contents[i].toPhoto)
                    .then(data => {
                        posted++
                    })
                    .catch(err => {
                        fail++
                        console.log(`failed: ${fail} - ${err}`)
                    })
            } else {
                if (contents[i]?.toLink) {
                    console.log(`${fromPage} -> toLink ${groupid}`)
                    await handlePublishPagePost.toLink(accessToken, groupid, message, contents[i].toLink)
                        .then(data => {
                            posted++
                        })
                        .catch(err => {
                            fail++
                            console.log(`failed: ${fail} - ${err}`)
                        })
                } else {
                    console.log(`${fromPage} -> toText ${groupid}`)
                    await handlePublishPagePost.toText(accessToken, groupid, message)
                        .then(data => {
                            posted++
                        })
                        .catch(err => {
                            fail++
                            console.log(`failed: ${fail} - ${err}`)
                        })
                }
            }
            console.log(`name ${contents[i].name}, tông ${posted}, fail ${fail}`)
    }

    const countdownPost = async () => {
        //load data contents
        await loadFinancialServicesCampaigns()
        .then(data => contents = data)
        //countdown
        setTimeout(async ()=>{
            countdown -= step
            if(countdown<=0){
                await publishPagePost()
                countdown = handleRandomTime((1440/contents.length))
            } else {
                console.log(`${formatTime(countdown)} - posted: ${posted} - fail: ${fail}`)
            }
            // fail quá nhiều sẽ dừng lại
            if ( fail < 10) {
                countdownPost()
            } else {
                console.log(`Stop - posted: ${posted} - fail: ${fail}`)
            }
        }, step*1000)
    }

    countdownPost();

}


app.listen(PORT, () => {
    console.log('server running ', PORT) 
    main()
    console.log(`start ${formatTime(countdown)} - posted: ${posted} - fail: ${fail}`)
})
