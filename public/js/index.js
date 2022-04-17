//   function fetcher(location) {
//     fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXJqdW5yYWpsb29tYmEiLCJhIjoiY2t4azkybTNxMTA2ZzJ5cGVlbXQ3NWo4ciJ9.ehGWWdrrAL7awM49RpY2cQ&limit=1').then((response) => {
//         response.json().then((data) => {

// 			console.log(data)
//             // if (data.error) {
//             //     messageOne.textContent = data.error
//             // } else {
//             //     messageOne.textContent = data.location
//             //     messageTwo.textContent = 'Current Temp (farenheit): ' + data.forecast.temp + ' Summary: ' + data.forecast.description;
//             // }
//         })
//     })
//   }