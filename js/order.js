const churroBox = [
        {
            nombre: "Churro Box 4 Pzas + 1 dip",
            precio: 80,
            descripcion: "4 pzas de churro tradicional espolvoreados en azúcar y canela más 1 dip aparte (Cajeta, Lechera Chocolate, Nutella).",
            imagen: "../images/churros4.jpeg"
        },
        {
            nombre: "Churro Box 8 Pzas + 2 dips",
            precio: 110,
            descripcion: "8 pzas de churro tradicional espolvoreados en azúcar y canela más 2 dips aparte (Cajeta, Lechera Chocolate, Nutella).",
            imagen: "../images/churros8.jpeg"

        },
        {
            nombre: "Churro Box 12 Pzas + 3 dips",
            precio: 140,
            descripcion: "12 pzas de churro tradicional espolvoreados en azúcar y canela más 3 dips aparte (Cajeta, Lechera Chocolate, Nutella).",
            imagen: "../images/churros8.jpeg"

        }
];

const specialBites = [
        {
            nombre: "Bites especiales 4 pz con plátano y fresa + 1 topping",
            precio: 90,
            descripcion: "4 pzas de churro tradicional cortados, acompañados de plátano, fresa y bañados con 1 topping (aparte).",
            imagen: "../images/special-bites.jpeg"
        },
        {
            nombre: "Bites especiales 6 pz con plátano y fresa + 1 topping",
            precio: 110,
            descripcion: "6 pzas de churro tradicional cortados, acompañados de plátano, fresa y bañados con 2 topping (aparte).",
            imagen: "../images/special-bites.jpeg"
        },
        {
            nombre: "Bites especiales 8 pz con plátano y fresa + 1 topping",
            precio: 130,
            descripcion: "8 pzas de churro tradicional cortados, acompañados de plátano, fresa y bañados con 3 topping (aparte).",
            imagen: "../images/special-bites.jpeg"
        }
];

const bebidas = [
        {
            nombre: "Coca",
            precio: 20,
            descripcion: " Coca de 300ml",
            imagen: "../images/coca.jfif"
        },
        {
            nombre: "Agua Ciel",
            precio: 15,
            descripcion: "Agua de 500 ml",
            imagen: "../images/coca.jfif"
        },
        {
            nombre: "Te Negro",
            precio: 30,
            descripcion: "Fuze Tea de 350ml",
            imagen: "../images/coca.jfif"
        }
];

const pedido = [];

const cantidadProductos = document.getElementById("cantidadProductos");
const totalProductos = document.getElementById("totalProductos");
const informacion = document.getElementById("churroBox");
const informacion2 = document.getElementById("specialBites");
const bebidasDiv = document.getElementById("bebidas");


churroBox.forEach((producto) => {
    printMenu(producto, informacion);
});

specialBites.forEach((producto) => {
    printMenu(producto, informacion2);
});

bebidas.forEach((producto) => {
    printMenu(producto, bebidasDiv);
});

function calcularTotal(objeto) {
    const total = objeto.reduce((acumulador, actual) => acumulador + actual.precio, 0);
    return total;
}

function printMenu(producto, destino) {
    let numero = 0;

    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = 'tarjeta';

    // Insertar el producto
    const nombre = document.createElement('p');
    nombre.textContent = producto.nombre;

    // Insertar precio
    const precio = document.createElement('p');
    precio.textContent = `$${producto.precio}`;

    // Insertar imagen
    const imagen = document.createElement('img');
    imagen.setAttribute('src', producto.imagen);

    // Descripcion
    const detalles = document.createElement('p');
    detalles.textContent = producto.descripcion;

    // Cantidad de productos
    const cantidad  = document.createElement('p');
    cantidad.textContent = numero;

    // Boton agregar
    const boton = document.createElement('button');
    boton.addEventListener('click', function() {
        pedido.push(producto);
        
        numero++;
        cantidad.textContent = numero;
        const total = calcularTotal(pedido);
        cantidadProductos.textContent = `Productos: ${pedido.length}`;
        totalProductos.textContent = `Total: $${total}`;
        
    });
    boton.innerText = "Agregar";

    // Boton quitar
    const quitar = document.createElement('button');
    quitar.addEventListener('click', function() {

            const indice = pedido.findIndex(item => item.nombre == producto.nombre);
            if (indice != -1) {
                pedido.splice(indice, 1);
                numero--;
                cantidad.textContent = numero;
                const total = calcularTotal(pedido);
                cantidadProductos.textContent = `Productos: ${pedido.length}`;
                totalProductos.textContent =  `Total: $${total}`;
            }
            
    });
    quitar.innerText = "Quitar"

    

    nuevoDiv.appendChild(nombre);// Insertar nombre
    nuevoDiv.appendChild(precio);// Insertar precio debajo
    nuevoDiv.appendChild(imagen);
    nuevoDiv.appendChild(detalles);
    nuevoDiv.appendChild(boton);
    nuevoDiv.appendChild(quitar);
    nuevoDiv.appendChild(cantidad);

    destino.appendChild(nuevoDiv);
}

let pedidoWhats = document.getElementById("pedidoWhats");
pedidoWhats.addEventListener('click', function() {
    if (pedido.length >= 1){
    const conteo = {};
        pedido.forEach((item) => {
            conteo[item.nombre] = (conteo[item.nombre] || 0) + 1;
        });
        let textoPlantilla = "Buen día, quisiera ordenar: \n";
        Object.keys(conteo).forEach(clave => {
            textoPlantilla += `■ ${conteo[clave]} ${clave}\n`;
        });
        const telefono = "528118584280"
        const total = calcularTotal(pedido);
        textoPlantilla +=  `Total: $${total}`;
        const textoCodificado = encodeURIComponent(textoPlantilla);
        const urlWhatsApp = `https://wa.me/${telefono}?text=${textoCodificado}`;
        window.open(urlWhatsApp, "_blank");
    } else {
        alert("Agrega al menos 1 producto");
    }
});