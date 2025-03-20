const tbody = document.querySelector("tbody");
const btnComprar = document.querySelector("button#btnComprar");

// Función que calcula el subtotal de un producto
const calcularSubtotal = (producto) => {
    return producto.precio * producto.cantidad;
}

// Función para calcular el total de todos los productos en el carrito
const calcularTotal = () => {
    const total = carritoFrutas.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    document.getElementById("totalAmount").textContent = `$ ${total}`;
};

// Función para recalcular el total cuando cambian las cantidades o se elimina un producto
const actualizarTotal = () => {
    calcularTotal();  // Calcula el total
};

// Función para generar el HTML de una fila con el producto
const retornarTablaHTML = (producto) => {
    return `<tr data-id="${producto.id}">
                <td><img src="${producto.imagen}" alt="${producto.nombre}" class="product-img"></td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td>
                    <button class="cantidad-button cantidad-minus" data-id="${producto.id}">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="cantidad-button cantidad-plus" data-id="${producto.id}">+</button>
                </td>
                <td>$ ${calcularSubtotal(producto)}</td>
                <td><button class="remove-button" data-id="${producto.id}">Quitar</button></td>
            </tr>`;
};

if (carritoFrutas.length > 0) {
    tbody.innerHTML = ""; // Limpiamos la tabla antes de agregar productos
    carritoFrutas.forEach((producto) => {
        tbody.innerHTML += retornarTablaHTML(producto); // Agregar producto a la tabla
    });
    actualizarTotal();  // Actualizamos el total
} else {
    tbody.innerHTML = "<tr><td colspan='6'>No hay productos en el carrito.</td></tr>"; // Mensaje si no hay productos
}

// Botón de comprar
btnComprar.addEventListener("click", () => {
    alert("Muchas Gracias por su Compra");
    localStorage.removeItem("carritoFrutas");
    tbody.innerHTML = "";
    document.getElementById("totalAmount").textContent = "$0"; // Reseteamos el total
});

// Eliminar producto
tbody.addEventListener("click", (e) => {
    // Verifica si se hizo clic en un botón con la clase "remove-button"
    if (e.target && e.target.classList.contains("remove-button")) {
        const productId = e.target.dataset.id; // Obtiene el ID del producto
        const productoIndex = carritoFrutas.findIndex((producto) => producto.id == productId);

        if (productoIndex > -1) {
            carritoFrutas.splice(productoIndex, 1); // Elimina el producto del carrito
            almacenarCarrito(); // Actualiza el carrito en localStorage
            e.target.closest("tr").remove(); // Elimina la fila de la tabla
            actualizarTotal();  // Recalculamos el total
        }
    }
});

// Cambiar cantidad de producto
tbody.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("cantidad-plus")) {
        const productId = e.target.dataset.id; // Obtiene el ID del producto
        const producto = carritoFrutas.find((producto) => producto.id == productId);
        if (producto) {
            producto.cantidad++; // Incrementa la cantidad
            almacenarCarrito(); // Guarda el nuevo carrito
            e.target.closest("tr").querySelector(".cantidad").textContent = producto.cantidad; // Actualiza la cantidad en la tabla
            e.target.closest("tr").querySelector("td:nth-child(5)").textContent = `$ ${calcularSubtotal(producto)}`; // Actualiza el subtotal
            actualizarTotal();  // Recalculamos el total
        }
    }

    if (e.target && e.target.classList.contains("cantidad-minus")) {
        const productId = e.target.dataset.id; // Obtiene el ID del producto
        const producto = carritoFrutas.find((producto) => producto.id == productId);
        if (producto && producto.cantidad > 1) {
            producto.cantidad--; // Decrementa la cantidad
            almacenarCarrito(); // Guarda el nuevo carrito
            e.target.closest("tr").querySelector(".cantidad").textContent = producto.cantidad; // Actualiza la cantidad en la tabla
            e.target.closest("tr").querySelector("td:nth-child(5)").textContent = `$ ${calcularSubtotal(producto)}`; // Actualiza el subtotal
            actualizarTotal();  // Recalculamos el total
        }
    }
});



