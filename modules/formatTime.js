
const formatTime = (time) => {
    sencond = 0
    minute =0
    hour = 0
    
    if(time % 60 >= 0) {
        sencond = time % 60
        minute = (time - (time % 60))/60
    }
    if (minute%60 >= 0) {
        hour = (minute - (minute % 60))/60
        minute = minute % 60
    }
    return `${hour}h:${minute}m:${sencond}`
}

module.exports = formatTime