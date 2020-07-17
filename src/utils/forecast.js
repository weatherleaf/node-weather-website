const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=b6f65c08eb94f07d7e29532f2b09d872&query='+longitude+','+latitude+'&units=f'

    request({url, json: true}, (error, {body} = {}) => {
        
        if(error) {
            callback('Unable to connect to the Weather service', undefined)
        }else if (body.error){
            callback('Unable to find the location', undefined)
        }else {
            const weatherInfo = body.current.weather_descriptions[0]+'.'+
            'It is Currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.'+
            ' Wind speed '+ body.current.wind_speed

            callback(undefined, weatherInfo)
        }
    })
    
}


module.exports = forecast