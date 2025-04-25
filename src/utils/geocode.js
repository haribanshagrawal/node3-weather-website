const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'
    if(address==='!') {
        callback('Invalid Location, Please try another search', undefined)
        }   
    else{   
        callback(undefined, {
                add: address
            })
        }
        }

module.exports = geocode