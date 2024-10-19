$(document).ready(function() {
    // Inicializa DataTable solo si existe la tabla de productos en la página
    if ($('#productos').length) {
        $('#productos').DataTable({
            data: obtenerProductos(), // Carga productos simulados
            columns: [
                { data: 'nombre' },
                { data: 'descripcion' },
                { data: 'categoria' },
                { data: 'precio' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return `<button class="agregar-carrito" data-nombre="${data.nombre}" data-precio="${data.precio}">Agregar al carrito</button>`;
                    }
                }
            ]
        });
    }

    // Captura el botón de búsqueda
    $('#searchButton').on('click', function() {
        let query = $('#searchInput').val();
        if (query) {
            buscarProductos(query);
        }
    });

    // Inicializar DataTable para el carrito
    var carritoTable = $('#carritoTabla').DataTable();

    // Array para almacenar los productos del carrito
    var productosCarrito = [];

    // Variable para controlar el cupón de descuento
    var descuento = 0;
    let precioOriginal = 1299;
    let precioFinal = precioOriginal;

    // Función para simular productos cargados dinámicamente (si no usas una API real)
    function obtenerProductos() {
        return [
            {
                nombre: 'ASIANA PETO OFICIAL ROJO/AZUL',
                descripcion: 'Peto para combate. Doble vista AZUL Y ROJO.',
                categoria: 'Protecciones',
                precio: 600
            },
            {
                nombre: 'UNIFORME ASIANA',
                descripcion: 'Uniforme oficial para competiciones.',
                categoria: 'Uniformes',
                precio: 700
            },
            {
                nombre: 'GUANTES DE ENTRENAMIENTO',
                descripcion: 'Guantes de alta calidad para entrenamiento.',
                categoria: 'Entrenamiento',
                precio: 300
            }
        ];
    }

    // Función para realizar la búsqueda de productos mediante una API
    function buscarProductos(query) {
        let url = `https://api.example.com/products?search=${query}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                llenarTabla(data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }

    // Función para llenar la tabla con los productos
    function llenarTabla(productos) {
        $('#productosBody').empty();
        productos.forEach(producto => {
            let fila = `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.categoria}</td>
                    <td>$${producto.precio}</td>
                </tr>
            `;
            $('#productosBody').append(fila);
        });
    }

    // Maneja el evento de agregar un producto al carrito
    $(document).on('click', '.agregar-carrito', function() {
        let nombre = $(this).data('nombre');
        let precio = $(this).data('precio');
        agregarAlCarrito(nombre, precio);
    });

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        let existe = productosCarrito.find(producto => producto.nombre === nombre);

        if (existe) {
            existe.cantidad++;
        } else {
            productosCarrito.push({ nombre, precio, cantidad: 1 });
        }

        cargarCarrito();
    }

    // Función para cargar productos en el carrito
    function cargarCarrito() {
        carritoTable.clear();
        var total = 0;
        productosCarrito.forEach(function(producto, index) {
            var subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            carritoTable.row.add([
                producto.nombre,
                `<input type="number" id="cantidadProducto${index}" value="${producto.cantidad}" class="cantidad-input" min="1">`,
                `$${subtotal.toFixed(2)}`,
                `<button class="eliminar-producto" data-index="${index}">Eliminar</button>`
            ]).draw();
        });
        $('#totalCarrito').text(total.toFixed(2));
        actualizarPrecioFinal(total);
    }

    // Manejar cambios en la cantidad del producto
    $(document).on('change', '.cantidad-input', function() {
        var inputId = $(this).attr('id');
        var nuevaCantidad = $(this).val();
        var index = inputId.replace('cantidadProducto', '');
        productosCarrito[index].cantidad = nuevaCantidad;
        cargarCarrito();
    });

    // Eliminar producto del carrito
    $(document).on('click', '.eliminar-producto', function() {
        let index = $(this).data('index');
        productosCarrito.splice(index, 1);
        cargarCarrito();
    });

    // Función para aplicar el cupón de descuento
    $('#aplicar-cupon').on('click', function() {
        var cupon = $('#cupon').val().trim();
        if (cupon === 'TKD30') {
            descuento = 0.30;
            alert('¡Se ha aplicado el cupón de descuento correctamente!\n30% de descuento.');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            descuento = 0;
            alert('Cupón no válido.');
        }
        var totalActual = parseFloat($('#totalCarrito').text());
        actualizarPrecioFinal(totalActual);
    });

    // Función para actualizar el precio final con el descuento aplicado
    function actualizarPrecioFinal(total) {
        var precioConDescuento = total - (total * descuento);
        $('#precio-final').text('Precio final: $' + precioConDescuento.toFixed(2));
    }
});

$(document).ready(function() {
    // Código existente...

    // Evento para cambiar el modo oscuro
    $('#toggle-dark-mode').on('click', function() {
        $('body').toggleClass('dark-mode');
        header.toggleClass('dark-mode');
        nav.find('ul li a').toggleClass('dark-mode');
        $('.cart-item').toggleClass('dark-mode');
        $('.cart-total').toggleClass('dark-mode');
        footer.toggleClass('dark-mode');
    });
});

// Función para cambiar la imagen al hacer clic
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todas las imágenes en la tabla de productos
    const imagenes = document.querySelectorAll('#carritoTabla img');

    // Iteramos sobre cada imagen y le agregamos un evento de clic
    imagenes.forEach((imagen) => {
        imagen.addEventListener('click', function() {
            // Verificamos cuál es la imagen actual y la cambiamos
            if (this.src.includes('basico.jpg')) {
                this.src = 'patada.jpg';  // Cambia a la nueva imagen
            } else {
                this.src = 'basico.jpg';  // Cambia de nuevo a la imagen original si ya fue cambiada
            }
        });
    });
});





