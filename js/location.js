// Crea el mapa de Leaflet
var map = L.map('map');

// Esto sirve para saber la ubicacion del usuario
// map.locate({setView: true, maxZoom: 16});

// Añade la capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Obtenemos hora y minutos
const ahora = new Date();
const hora = ahora.getHours();
const minutos = ahora.getMinutes();

// Transformamos la hora actual en minutos
const horaActual = hora * 60 + minutos;

// Icono de abierto
var greenIcon = L.icon({
    iconUrl: '../assets/churronetaOpen.svg',
    iconSize:     [50, 50], // tamaño del icono
});

// Icono de cerrado
var redIcon = L.icon({
    iconUrl: '../assets/churronetaClose.svg',
    iconSize:     [50, 50], // tamaño del icono
});

// Array de objetos de las churronetas
const churronetas = [
    {
        sucursal: "José Alvarado",
        ubicacion: "Av. José Alvarado 1252, Valle de Chapultepec, 67140 Guadalupe, N.L.",
        apertura: 960,
        cierre: 1260,
        coordenadaX: 25.66090819062636,
        coordenadaY: -100.26943542353264
    },
    {
        sucursal: "Revolución",
        ubicacion: "Av. Revolución 2703, Ladrillera, Distrito Tec, 64830 Monterrey, N.L.",
        apertura: 960,
        cierre: 1260,
        coordenadaX: 25.65354348094262,
        coordenadaY: -100.27459422328502
    },
    {
        sucursal: "Tecnológico",
        ubicacion: "Av. Junco de la Vega, Sin Nombre 34, Distrito Tec, 64700 Monterrey, N.L.",
        apertura: 960,
        cierre: 1260,
        coordenadaX: 25.65063060148365,
        coordenadaY: -100.286422043698
    }
];

// Recorre los datos de los objetos para crear la churroneta en el mapa
churronetas.forEach(createChurroMarker);

let churronetaSeleccionada;
const boton = document.querySelector(".directions");

// Determina si la churroneta está abierta y crea su marcador en el mapa
function createChurroMarker (churroneta) {
    let iconoElegido;
    if (horaActual < churroneta.cierre && horaActual >= churroneta.apertura) {
        iconoElegido = greenIcon;
    } else {
       iconoElegido = redIcon;
    } 
    // Añade a la coordenada, el icono y un popup del nombre
    let marcador = L.marker([churroneta.coordenadaX, churroneta.coordenadaY], {icon: iconoElegido}).addTo(map).bindPopup(churroneta.sucursal).on('click', () => {
        

        const informacion = document.getElementById("direccion");
        
        churronetaSeleccionada = churroneta;

        informacion.classList.remove("fade-in"); // Le quita la animacion de fade in
        void informacion.offsetWidth; // Resetea la animacion de CSS
        informacion.innerHTML = `<p>${churroneta.sucursal}</p> <br> <p>${churroneta.ubicacion}</p>`;
        informacion.classList.add("fade-in"); // Le vuelve a dar la animacion
        
        informacion.style.display = "block";
        boton.style.display = "block";
        boton.classList.add("fade-in");

    }); 
    churroneta.marcador = marcador;

}

// setInterval
const revisarHora = setInterval(() => {

    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaActual = hora * 60 + minutos;

    churronetas.forEach(function (churroneta) {
        if (horaActual < churroneta.cierre && horaActual >= churroneta.apertura) {
            churroneta.marcador.setIcon(greenIcon);
        } else {
            churroneta.marcador.setIcon(redIcon);
        } 
    });
}, 60000);

        // Mandar a Google Maps
        boton.addEventListener('click', function() {
            const uri = encodeURIComponent(churronetaSeleccionada.ubicacion); 

            // URL para abrir Google Maps
            const url = `https://www.google.com/maps/search/?api=1&query=${uri}`;

            // Abrir el mapa
            window.open(url, '_blank');
        })

// Extrae las coordenadas x y de los objetos churronetas y los guarda en un array "coordenadas" 
const coordenadas = churronetas.map(churroneta => [churroneta.coordenadaX, churroneta.coordenadaY]);

// Centra el mapa para que todas las churronetas se vean
map.fitBounds(coordenadas);