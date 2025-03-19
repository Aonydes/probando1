const tbody = document.querySelector("tbody")
const btnComprar = document.querySelector("button#btnComprar")

const retornarTablaHTML = (producto) => {
    return `<tr data-id="${producto.id}">
                <td><img src="${producto.imagen}" alt="${producto.nombre}" class="product-img"></td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td><button class="remove-button" data-id="${producto.id}">Quitar</button></td>
            </tr>`;
};





if (carritoFrutas.length > 0) {
    tbody.innerHTML = ""; // Limpiamos la tabla antes de agregar productos
    carritoFrutas.forEach((producto) => {
        tbody.innerHTML += retornarTablaHTML(producto); // Agregar producto a la tabla
    });
} else {
    tbody.innerHTML = "<tr><td colspan='4'>No hay productos en el carrito.</td></tr>"; // Mensaje si no hay productos
}


btnComprar.addEventListener("click", ()=>{
    alert("Muchas Gracias por su Compra");
    localStorage.removeItem("carritoFrutas");
    tbody.innerHTML= "";
});

tbody.addEventListener("click", (e) => {
    // Verifica si se hizo clic en un botón con la clase "remove-button"
    if (e.target && e.target.classList.contains("remove-button")) {
        const productId = e.target.dataset.id; // Obtiene el ID del producto
        const productoIndex = carritoFrutas.findIndex((producto) => producto.id == productId);

        if (productoIndex > -1) {
            carritoFrutas.splice(productoIndex, 1); // Elimina el producto del carrito
            almacenarCarrito(); // Actualiza el carrito en localStorage
            e.target.closest("tr").remove(); // Elimina la fila de la tabla
        }
    }
});



