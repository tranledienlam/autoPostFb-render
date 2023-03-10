
const express = require('express');
const fs = require('fs');

const { PORT } = require('./config/config');
const handlePublishPagePost = require('./modules/handlePublishPagePost');
const connectDB = require('./config/db');
const loadContents = require('./modules/loadContents');
const handleMessage = require('./modules/handleMessage');
const formatTime = require('./modules/formatTime');
const handleRandomContent = require('./modules/handleRandomContent');
const handleRandomTime = require('./modules/handleRandomTime');
const randomPageAndGroup = require('./modules/randomPageAndGroup');
const loadPagesAndGroups = require('./modules/loadPagesAndGroups');

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
    pagesAndGroups = []
    message = ''
    i = 0
    posted = 0
    fail = 0
    start = 23// handleRandomTime(23) //enter minute, +/-40%
    countTime = 0
    step = 60
    countdown = start // change s

    const publishPagePost = async () => {
            //load & random data contents & hanlde mess
            await loadContents()
                .then(data => contents = data)
            i = await handleRandomContent(contents)
            
            // load & random page and group
            await loadPagesAndGroups()
            .then(data => pagesAndGroups = data)
            pageAndGroup = await randomPageAndGroup(pagesAndGroups)
            //get ele page and group
            accessToken = pageAndGroup.accessToken
            fromPage = pageAndGroup.fromPage
            groupid = pageAndGroup.toGroup
            // autopost1
            // accessToken = 'EAABqYNZAJb0wBAD0WZC3BRf1I3y3sEytDERc0TBFTzmqEyLESz1ol1dzvQxW0Aa0CTjqcxiZBZA7ZC5ryrlkFZBXMg4pohlSF6BzSrpZCObdAwzvcUxpRO2hqiLVciZAAur6aHYFCeZASqAHZAF18nGc6zZAxkwHkb9VOBlWKMOhnu9psR3xiYqAAPRbGHJlq2NPIcS7SzZBlzdgeQZDZD'
            groupid = 'me'
            // i = contents.length -1
            i = 0
            
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
        
        //countdown
        setTimeout(async ()=>{
            countdown -= 1
            countTime +=1
            if(countdown<=0){
                // posting
                await publishPagePost()
                countTime =0
                countdown = handleRandomTime((1500/pagesAndGroups.length))
            } else {
                if(countTime%step==0) {
                    countTime =0
                    console.log(`${formatTime(countdown)} - posted: ${posted} - fail: ${fail}`)
                }
            }
            // fail quá nhiều sẽ dừng lại
            if ( fail < 10) {
                countdownPost()
            } else {
                console.log(`Stop - posted: ${posted} - fail: ${fail}`)
            }
        }, 1000)
    }

    countdownPost();

}


app.listen(PORT, () => {
    console.log('server running ', PORT) 
    main()
    console.log(`start ${formatTime(countdown)} - posted: ${posted} - fail: ${fail}`)
})
