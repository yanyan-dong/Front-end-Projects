//forcast.js for interact with api

const key = 'mRPKdI3TALvIdxEbkJvgYvG4fEZgBSo6'; // The key in the api, assigned to the constant key

// get weather info
const getWeather = async (id) => { //async function

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`; 

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};


//get city info
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};

// getCity('chicago').then(data => {
//     return getWeather(data.Key); // get the city id
// }).then(data => console.log(data)) // It's a promise, add .then
//     .catch(err => console.log(err));

