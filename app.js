const apiKey = '44c5f8ea17b34c5ab2e162202230809';

const searchItem = document.querySelector('#input');
const searchBtn = document.querySelector('#btn');
const city = document.querySelector('#city');
const temperature = document.querySelector('#temp');
const storedCity = localStorage.getItem('city');
const storedTemp = localStorage.getItem('temperature');
const storedImg = localStorage.getItem('conditionImage');
const storedConditionText = localStorage.getItem('conditionText');
const conditionImage = document.querySelector('#image');
const conditionText = document.querySelector('#conditionText')



if(storedCity){
    city.innerHTML=storedCity;
    temperature.innerHTML= Math.round(toCelsius(storedTemp));
    conditionImage.setAttribute('src',storedImg);
    conditionText.innerHTML = storedConditionText;
}
async function getWaether() {
    if(searchItem.value == ''){
    alert('Please Enter any City Name');
    return
}
else {
     const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchItem.value}`);
    const data = await response.json();
     console.log(data)
    city.innerHTML =data.location.name;
    temperature.innerHTML = Math.round(toCelsius(data.current.temp_f));
    conditionImage.setAttribute('src',data.current.condition.icon);
    conditionText.innerHTML = data.current.condition.text;
    localStorage.setItem('city', data.location.name);
    localStorage.setItem('temperature',data.current.temp_f );
    localStorage.setItem('conditionImage', data.current.condition.icon );
    localStorage.setItem('ConditionText',data.current.condition.text);
    searchItem.value = ''
}

}
   
searchBtn.addEventListener('click', getWaether);

function toCelsius(item) {
    return (item-32)*5/9 
}