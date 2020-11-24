let fs = require ("fs");

module.exports = moduloProductos = {
    archivo: "./productos.json",
    leerProductos: function(){
        let listaDeProductos = fs.readFileSync(this.archivo, "utf-8")
        return JSON.parse(listaDeProductos)
    },

    agregarProducto: function(nombreProducto, precio){
        let listaDeProductos = this.leerProductos()
        let lastId = 1

        listaDeProductos.map(function(producto){
            if (producto.id > lastId){
                lastId = producto.id
            }
        });

        let Producto = function(id, name, price){
            this.id = id,
            this.name = name,
            this.price = price
        };
        let nuevoProducto = new Producto(lastId + 1, nombreProducto, precio)
        listaDeProductos.push(nuevoProducto)
        this.guardarProductos(listaDeProductos)
    },
    
    guardarProductos: function(info){
        let nuevoJson = JSON.stringify(info)
        fs.writeFileSync(this.archivo, nuevoJson, "utf-8")
    },

    filtrarProductos: function(min, max){
        let productosAFiltrar = this.leerProductos();
        let productosFiltrados = productosAFiltrar.filter(productos => productos.price >= min && productos.price <= max)
        return productosFiltrados
    },

    modificarPrecio: function(id, nuevoPrecio){
        let listadoId = this.leerProductos()
        let productoAModificar = listadoId.filter(function(producto){
            if(producto.id == id){
                producto.price = nuevoPrecio
            }
            return listadoId
        })

        this.guardarProductos(productoAModificar)
    },
    eliminar : function(id){
        let listaDeProductos = this.leerProductos()
        let eliminarProducto = listaDeProductos.filter(function(producto){
            return producto.id !== id
        })

        this.guardarProductos(eliminarProducto)
    },
    buscar : function(busqueda){
        let listaDeProductos = this.leerProductos()

        let productoBuscado = listaDeProductos.filter(producto => {
            return producto.name.toLowerCase().includes(busqueda.toLowerCase()) 
        })
        return productoBuscado
    }
}