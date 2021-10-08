// app.js for DOM manupulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// Update page
const updateUI = (data) => { // data here returns { cityDets, weather };

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // destructure properties
    const { cityDets, weather } = data; 
    // get properties from an object, then store them in the constant in the same name 



    // update details template
        details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my04">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    // let timeSrc = null; 
    //// let is to set a variable that will be overridden; const is to set a constant
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }

    // ternary operation
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);
    

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

// Update city information
const updateCity = async (city) => {

    const cityDets = await getCity(city); 
    const weather = await getWeather(cityDets.Key);
    
    // return an oject with 2 properties(city details and weather)  
    return { cityDets, weather };
    // object shorthand notation: when the property name same as value, 可以省略property name
    // cityDets: cityDets,
    // weather: weather
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city) // returning a promise
        .then(data => updateUI(data))
        .catch(err => console.log(err)); 

    // set local storage
    // I want to store the data on local storage at each input, so I put it under this SUBMIT EVENT
    localStorage.setItem('city', city);
});


// Want to load the data by itself in any case, so do not put it in the event
// get the data
if(localStorage.getItem('city')); {
    // Use the function undateCity, because this function is used to update the city
    updateCity(localStorage.getItem('city')) // return promise
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}

