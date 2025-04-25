const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=42ed00ffc9f6d4a42bf15b4a3dcaa85d&query='+address+'& forecast_days=1&hourly=1'

    request({ url, json: true }, (error, { body }) => {
        //console.log(body.error)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined,'latitude : '+body.location.lat+', longitude :'+body.location.lon +', weather :'+ body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast