
const express = require('express');
const data = require('./db.json')
// const { default: fetch } = require('node-fetch')

const { PORT, accessToken, URL_WEB } = require('./config/config');
const handlePublishPagePost = require('./modules/handlePublishPagePost');
const connectDB = require('./config/db');
const FinancialServicesCampaignsSchema = require('./models/Campaigns');
const loadFinancialServicesCampaigns = require('./modules/loadFinancialServicesCampaigns');
const handleMessage = require('./modules/handleMessage');
const formatTime = require('./modules/formatTime');

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
    delay = 60*150 // s
    step = 5
    countdown = delay // change s

    const publishPagePost = async () => {
                    //load data campaigns
            await loadFinancialServicesCampaigns()
                .then(data => campaigns = data)

            //check array đến cuối mảng
            if (campaigns[i]) {
                //check url có bị block không?
                if (campaigns[i]?.block != true) {

                    message = await handleMessage(campaigns[i])
                    
                    // post to phtoto
                    if(campaigns[i]?.urlPhoto) {

                        await handlePublishPagePost.toPhoto(accessToken, message, campaigns[i].urlPhoto)
                            .then(data => {
                                console.log(`toPhoto www.facebook.com/${data.post_id}`)
                                posted++;
                            })
                            .catch(err => {
                                fail++
                                console.log(err)
                            })
                    } else {
                        //default post to link
                        await handlePublishPagePost.toLink(accessToken, message, campaigns[i].link)
                            .then(data => {
                                console.log(`toLink www.facebook.com/${data.id}`)
                                posted++;
                            })
                            .catch(err => {
                                fail++
                                console.log(err)
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
                countdown = delay
                await publishPagePost()
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

main()

app.listen(PORT, () => {
    console.log('server running ', PORT)
})