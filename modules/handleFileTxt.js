const fs = require('fs');

const handleFileTxt = {
    toRead: () => {
        return fs.readFileSync('./note.txt').toString()*1
    },
    toWrite: (text) => {
        fs.writeFile('./note.txt', text.toString(),  function(err) {
            if (err) {
                return console.error(err);
            }
        })
    }
}


module.exports = handleFileTxt