const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hheWFuNDgiLCJhIjoiY2s5MnNva2p6MDA2MjNmbWh3NGVucjMzNCJ9.3i0gFKInBrE_dMCGj1DINg&limit=1`

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to loaction services', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find loaction', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                loaction: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode