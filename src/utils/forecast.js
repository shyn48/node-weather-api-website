const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/959f47caf395cfebf3016ea77e876b70/${lat},${long}?units=si`
    request({url: url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services')
        } else if(body.error){
            callback('Unable to find loaction')
        } else {
            callback(undefined,`${body.currently.summary}. It is currently ${body.currently.temperature} out and there is a ${body.daily.data[0].precipProbability*100}% chance of rain`)
        }
    })
}

module.exports = forecast