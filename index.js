
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
delay = 20000

app.get('/', (res, req) => {
    res.json({'success': true})
})

main = async () => {
    i = 0
    count = 0
    function myLoop() {
        setTimeout(async () => {
            if (campaigns[i]) {
                await handlePostFacebook(accessToken, campaigns[i].name, campaigns[i].link)
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))
                i++;
                count++;
                console.log(`index ${i-1}, tông ${count}`)
            } else i=0
            myLoop();
        }, delay)
    }
    myLoop();
}

main()

app.listen(PORT, () => {
    console.log('server running ', PORT)
})