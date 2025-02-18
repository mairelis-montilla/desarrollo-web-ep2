export const API_URL = "https://servicios.campus.pe/"

export const agregarCarrito = (item, cantidadProducto) => {
    item.cantidad = cantidadProducto
    console.log(item)
    let carrito = []
    if (sessionStorage.getItem("carritocompras")) {
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"))//parse convierte un string a objeto
        let index = -1
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].idproducto === item.idproducto) {
                index = i
                break
            }
        }
        if(index === -1){
            carrito.push(item)
        }
        else{
            carrito[index].cantidad += cantidadProducto
        }
    }
    else{
        carrito.push(item)
    }
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito))//stringify convierte un objeto a string
    //setItem guarda datos en el navegador usando sessionStorage
}

export const agregarProvedor = (item) => {
    console.log(item)
    let provedores = JSON.parse(sessionStorage.getItem("provedores")) || [];

    const existe = provedores.some(provedor => provedor.idproveedor === item.idproveedor);

    if (!existe) {
        provedores.push(item);
        sessionStorage.setItem("provedores", JSON.stringify(provedores));
    }
};