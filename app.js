const process = require("process")

let moduloProductos = require("./productos")

let comando = process.argv[2]

switch (comando) {
    case "listar":

        let productos = moduloProductos.leerProductos();
        if (productos.lenght === 0) {
            console.log("-------------------------------------------------")
            console.log("La lista de productos esta vacia. ¡REPONER STOCK!")
            console.log("-------------------------------------------------")
        } else {
            console.log("-------------------------------")
            console.log("Este es tu listado de productos")
            console.log("-------------------------------")

            for (let i = 0; i < productos.length; i++) {
                console.log("id: " + productos[i].id + " ||" + " Nombre del producto: " + productos[i].name + " || Precio del producto = " + productos[i].price)
            }
        }
        break;

    case "agregar":

        let nombreProducto = process.argv[3]
        let precio = Number(process.argv[4])

        if (nombreProducto == undefined || precio == undefined) {
            console.log("----------------------------------------------")
            console.log("Tenes que agregar nombre y precio del producto")
            console.log("----------------------------------------------")
        } else {
            moduloProductos.agregarProducto(nombreProducto, precio)

            console.log("----------------------------------------")
            console.log("¡El producto ha sido guardado con exito!")
            console.log("----------------------------------------")
        }
        break;

    case "filtrar":

        let min = Number(process.argv[3])
        let max = Number(process.argv[4])
        let productosFiltrados = moduloProductos.filtrarProductos(min, max)

        if (productosFiltrados.length === 0) {
            console.log("----------------------------------------")
            console.log("No hay productos dentro de estos precios")
            console.log("----------------------------------------")
        } else {
            console.log("------------------------------")
            console.log("Listado de productos filtrados")
            console.log("------------------------------")

            for (const p in productosFiltrados) {
                console.log("id: " + productosFiltrados[p].id + " ||" + " Nombre del producto: " + productosFiltrados[p].name + " || Precio del producto = " + productosFiltrados[p].price)
            }
        }
        break;
    case "cambiarPrecio":

        let id = Number(process.argv[3])
        let nuevoPrecio = Number(process.argv[4])

        if (id == undefined || nuevoPrecio == undefined) {
            console.log("-----------------------------------------------------------")
            console.log("Ingrese el id a modificar y el nuevo precio correspondiente")
            console.log("-----------------------------------------------------------")
        }
        moduloProductos.modificarPrecio(id, nuevoPrecio)

        console.log("---------------------------------")
        console.log("¡Precio modificado correctamente!")
        console.log("---------------------------------")

        break;
    case "eliminar":

        let eliminarId = Number(process.argv[3])

        if (eliminarId == undefined){
            console.log('-------------------------------------');
            console.log('Ingresa el id del producto a eliminar');
            console.log('-------------------------------------');
        }

        moduloProductos.eliminar(eliminarId)

        console.log('--------------------------------');
        console.log('Producto eliminado correctamente');
        console.log('--------------------------------');
        break;
    case "buscar":

        let producto = process.argv[3]
        let productosBuscados = moduloProductos.buscar(producto)

        if (productosBuscados.length !== 0){
            console.log('-------------------------');
            console.log('Resultados de la búsqueda');
            console.log('-------------------------');

        productosBuscados.forEach(producto => {
            console.log('id: '+ producto.id +' Producto: ' + producto.name + ' Precio: ' + producto.price)
        });
        }else{
            console.log('----------------------');
            console.log('Producto no encontrado');
            console.log('----------------------');
        }
        break;
    default:
        break;
}
