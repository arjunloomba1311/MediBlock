const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJqdW5yYWpsb29tYmEiLCJhIjoiY2t4azkybTNxMTA2ZzJ5cGVlbXQ3NWo4ciJ9.ehGWWdrrAL7awM49RpY2cQ&limit=1'
    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('unable to connect to location services', undefined)
        } 

        else if (body.message == 'Not Authorized - Invalid Token') {
            callback("invalid api key", undefined)
        }

        else if (body.features.length == 0) {
            callback('unable to find location. Try another search', undefined)
        }

        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        }

    })

}

module.exports = geocode