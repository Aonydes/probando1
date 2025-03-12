const producto = []
const URL = "js/productos.json"

const plato = document.querySelector('div.plato')

retornarCardHtml = (producto) => {
    let imagenHTML = producto.imagen.includes("img/") || producto.imagen.includes("../img/")
        ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="morfi-img">`
        : producto.imagen; // Si es un emoji, lo deja tal cual


    return `<div class="morfi">
                <div class="morfi-image">${imagenHTML}</div>
                <div class="morfi-name">${producto.nombre}</div>
                <div class="morfi-price">$ ${producto.precio}</div>
                <div class="morfi-button">
                    <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">+</button>
                </div>
            </div>`;
}

const activarClickEnBotones = () =>{
    const botonesAgregar = document.querySelectorAll('button.button-outline.button-add')
    if(botonesAgregar !== null){
        botonesAgregar.forEach((button)=>{
            button.addEventListener('click', (e)=>{
                agregarAlCarrito(e.target.id)
            })
            })
        }

    }


const cargarProductos = (array) => {
    if(array.length > 0){
        array.forEach(producto => {
            plato.innerHTML += retornarCardHtml(producto)
        });
        activarClickEnBotones()
    }
}

const obtenerProductos = () => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => producto.push(...data))

    .then(() => cargarProductos(producto))
}

//cargarProductos(productos)

obtenerProductos()