class Weather
{
    
    constructor()
    {
        this.api =  "5bf73fbf7227481b94941431192403";
    }
    async getWeather(city)
    {
        const http = await fetch(`https://api.apixu.com/v1/current.json?key=5bf73fbf7227481b94941431192403&q=${city}`);
        const response = await http.json();
        return response;
    }

}