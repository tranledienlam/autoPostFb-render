const handleRandomTime = (time) => {
    if(typeof time == 'number' && time > 0) {
        biendo = 0.35
        start = time*(1-biendo)
        end = time*(1+biendo)
        minute = start + Math.random()*(end - start)
        return Math.floor(minute*60)
    } else {
        console.log("Failed: number > 0")
        return 30*60
    }
}

module.exports = handleRandomTime

