const tbody = document.querySelector("tbody")
const btnComprar = document.querySelector("button#btnComprar")

const retornarTablaHTML = (producto) => {
return           ` <tr>
                        <th id="tablehead">${producto.imagen}</th>
                        <th id="tablehead">${producto.nombre}</th>
                        <th id="tablehead">${producto.precio}</th>
                        <th id="tablehead">Quitar</th>
                    </tr>;`
};

if(carritoFrutas.length > 0){
    tbody.innerHTML = ""
    carritoFrutas.forEach((producto) =>(tbody.innerHTML += retornarTablaHTML(producto))
)
}

btnComprar.addEventListener("click", ()=>{
    alert("Muchas Gracias por su Compra");
    localStorage.removeItem("carritoFrutas");
    tbody.innerHTML= "";
});