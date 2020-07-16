const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoibWFuMXNoIiwiYSI6ImNrYzk1ejhyczBpYm0yeXBmNHN0dGF1d20ifQ.fw_jpRqI9ia3rTXhwWs0aQ&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to the Geocoding service', undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        }else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode