document.addEventListener('DOMContentLoaded',()=>
{
    let weather = new Weather();
    const ui = new UI();
    const storage = new Storage();

    changeWeather();

    function changeWeather(cityName)
    {
        cityName = storage.getLocation();
        if(cityName===undefined || cityName === null)
             weather.getWeather("Paris").then(res=> ui.showUI(res)).catch(err=> err);
        else
        {
            console.log(cityName);
            weather.getWeather(cityName).then(res=> ui.showUI(res)).catch(err=> err);
        }
    }

    const save = document.querySelector('#save');
    const cityName = document.querySelector('#city-in');
    let cityValue;

    save.onclick = ()=> 
    {
        cityValue = cityName.value;
        storage.setLocation(cityValue);
        changeWeather(cityValue);
        $("#exampleModal").modal('hide');
    }



});
