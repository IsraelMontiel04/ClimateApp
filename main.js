const ciudadGeolocalizada = document.getElementById("ciudad-geolocalizada")
const temperaturaGeolocalizada= document.getElementById("temperatura-geolocalizada")
const informacionGeolocalizada= document.getElementById("informacion-geolocalizada")
const humedadGeolocalizada= document.getElementById("humedad-geolocalizada")
const vientoGeolocalizado = document.getElementById("viento-geolocalizado")
const iconoGeolocalizado = document.getElementsByClassName("caja-ciudad")


const claveAPI = "20734ba4d13b8e9e0d6d276b9b8672d7"

function clima(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            let latitud = position.coords.latitude
            let longitud = position.coords.longitude;
            let url= `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${claveAPI}&lang=es&units=metric`;
            
            fetch(url)
            .then(res => res.json() )
            .then(info => {
                console.log(info);

                let ciudad = info.name;
                ciudadGeolocalizada.textContent=ciudad;

                let temperatura = info.main.temp;
                temperaturaGeolocalizada.textContent=temperatura;

                let informacion = info.weather[0].description;
                informacionGeolocalizada.textContent=informacion.toUpperCase();

                let humedad = info.main.humidity;
                humedadGeolocalizada.textContent=`${humedad}%`

                let viento = ((info.wind.speed) * 3.6).toFixed(2);
                vientoGeolocalizado.textContent=`${viento} Km/h`
                
                let icono = info.weather[0].icon;
                let img = document.createElement("img")
                img.src=`http://openweathermap.org/img/wn/${icono}.png`;
                img.classList.add("icono")
                iconoGeolocalizado[0].appendChild(img)
                
            })
            .catch(error => console.log(error))
        })
    }else{
        console.log("Geolocalizacion no disponible esn este dispositivo");
        
    }
}

clima();