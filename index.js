
const express = require('express');
const fs = require('fs');
// const { default: fetch } = require('node-fetch')

const { PORT, URL_WEB } = require('./config/config');
const handlePublishPagePost = require('./modules/handlePublishPagePost');
const connectDB = require('./config/db');
const FinancialServicesCampaignsSchema = require('./models/Campaigns');
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
    campaigns = []
    message = ''
    i = 0
    posted = 0
    fail = 0
    delay = 120// handleRandomTime(23) //enter minute, +/-40%
    step = 60
    countdown = delay // change s

    const publishPagePost = async () => {
                    //load data campaigns
            await loadFinancialServicesCampaigns()
                .then(data => campaigns = data)
            
            // random campain to post
            i = await handleRandomCampaignPost(campaigns)

            // random page and group
            pageAndGroup = await randomPageAndGroup()
            accessToken = pageAndGroup.accessToken
            fromPage = pageAndGroup.fromPage
            groupid = pageAndGroup.toGroup
            // accessToken = 'EAAKcMOZCuOcwBAIzZCU5ozPmqoPR3NZCBVgRdUBaEBQoKGw75kcV86IT5kTIaI6w79UGW6yaA0yCQ9pGyJziP74AFZArhcaZCUgA89Xy2dAksuRNpH1ma59xJZC1omDe9P99tWtlZCYQ2ZCP5wXeEiowlvd2QXe4J40KxUqZAiusjkBlWXoKr30V2'
            // groupid = 'me'
            // i = campaigns.length -1

            //check array đến cuối mảng
            if (campaigns[i]) {
                //check url có bị block không?
                if (campaigns[i]?.block != true) {

                    message = await handleMessage(campaigns[i])
                    
                    // post to phtoto
                    if(campaigns[i]?.urlPhoto) {
                        console.log(`${fromPage} -> toPhoto ${groupid}`)
                        await handlePublishPagePost.toPhoto(accessToken,groupid, message, campaigns[i].urlPhoto)
                            .then(data => {
                                if(data.error) {
                                    console.log(data.error)
                                }
                                posted++
                            })
                            .catch(err => {
                                fail++
                                console.log(`failed: ${fail} - ${err}`)
                            })
                    } else {
                        console.log(`${fromPage} -> toLink ${groupid}`)
                        //default post to link
                        await handlePublishPagePost.toLink(accessToken, groupid, message, campaigns[i].link)
                            .then(data => {
                                if(data.error) {
                                    console.log(data.error)
                                }
                                posted++
                            })
                            .catch(err => {
                                fail++
                                console.log(`failed: ${fail} - ${err}`)
                            })
                    }
                } else {
                    console.log(`name ${campaigns[i].name} bị block url`)
                }
                i++;
                console.log(`name ${campaigns[i-1].name}, tông ${posted}, fail ${fail}`)
            } else i = 0
    }

    function countdownPost() {
        setTimeout(async ()=>{
            countdown -= step
            if(countdown<=0){
                await publishPagePost()
                countdown = handleRandomTime(22)
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
