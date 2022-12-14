
const express = require('express');
const data = require('./db.json')
// const { default: fetch } = require('node-fetch')

const { PORT, accessToken } = require('./config/config');
const handlePostFacebook = require('./modules/handlePostFacebook');

const app = express();


app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

campaigns = data.data


app.get('/', (req, res) => {
    res.json({ 'success': true })
})

main = async () => {
    i = 0
    count = 0
    fail = 0
    delay = 1000 * 60 * 60
    function myLoop() {
        setTimeout(async () => {
            //check array đến cuối mảng
            if (campaigns[i]) {
                //check url có bị block không?
                if (campaigns[i]?.block != true) {
                    await handlePostFacebook(accessToken, campaigns[i].name, campaigns[i].link)
                        .then(data => {
                            console.log(`www.facebook.com/${data.id}`)
                            count++;
                        })
                        .catch(err => {
                            fail++
                            console.log(err)
                        })
                } else {
                    console.log(`name ${campaigns[i].name} bị block url`)
                }
                i++;
                console.log(`name ${campaigns[i-1].name}, tông ${count}, fail ${fail}`)
            } else i = 0

            // fail quá nhiều sẽ dừng lại
            if (fail < 10) {
                myLoop();
            }
        }, delay)
    }

    myLoop();
}

main()

app.listen(PORT, () => {
    console.log('server running ', PORT)
})