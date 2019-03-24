class Storage
{
    setLocation(city) 
    {
      localStorage.setItem("city",city); 
    }
    getLocation()
    {
        return localStorage.getItem("city");
    }
}