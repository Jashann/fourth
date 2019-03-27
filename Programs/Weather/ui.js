class UI
{
    constructor()
    {
        this.output = document.querySelector('#output');
        this.changeBtn = document.querySelector('#change');
    }
    showUI(response)
    {
        let icon = "https://";
        let img = response.current.condition.icon;
        img = img.substring(2);
        icon = icon.concat(img);
        this.output.innerHTML = 
        `<h3 class="display-5">${response.location.name}, ${response.location.country}</h2>
        <h4 class="display-5">${response.current.condition.text}</h3>
        <h3 class="display-5">${response.current.temp_f} F (${response.current.temp_c} C)</h2>
        <img src="${icon}" alt="">
        <ul class="list-group card bg-light text-dark m-2">
                <li class="list-group-item">Precipitation:${response.current.precip_in}</li>
                <li class="list-group-item">Humidity:${response.current.humidity}</li> 
                <li class="list-group-item">Feelslike_C:${response.current.feelslike_c}</li>
                <li class="list-group-item">Feelslike_F:${response.current.feelslike_f}</li>
        </ul>`;  
    }
}