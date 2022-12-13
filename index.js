
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
delay = 10000

app.get('/', (req, res) => {
    res.json({'success': true})
})

main = async () => {
    i = 0
    count = 0
    fail = 0
    function myLoop() {
        setTimeout(async () => {
            if (campaigns[i]) {
                await handlePostFacebook(accessToken, campaigns[i].name, campaigns[i].link)
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        fail++
                        console.log(err)
                })
                i++;
                count++;
                console.log(`name ${campaigns[i].name}, tông ${count}, fail ${fail}`)
            } else i=0
            if( fail <10 ) {
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