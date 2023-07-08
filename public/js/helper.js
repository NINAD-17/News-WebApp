const splitTime = (time) => {
    const timeArr = time.split("T");
    return timeArr;
}

module.exports = {
    splitTime: splitTime
}