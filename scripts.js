$(document).ready(function() {
    // Inicializa DataTable solo si existe la tabla de productos en la página
    if ($('#productos').length) {
        $('#productos').DataTable({
            data: obtenerProductos(), // Carga productos simulados
            columns: [
                { data: 'nombre' },
                { data: 'descripcion' },
                { data: 'categoria' },
                { data: 'precio' }
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
});

// Función para simular productos cargados dinámicamente (si no usas una API real)
function obtenerProductos() {
    return [
        {
            nombre: 'ASIANA PETO OFICIAL ROJO/AZUL',
            descripcion: 'Peto para combate. Doble vista AZUL Y ROJO.',
            categoria: 'Protecciones',
            precio: '$600'
        },
        {
            nombre: 'UNIFORME ASIANA',
            descripcion: 'Uniforme oficial para competiciones.',
            categoria: 'Uniformes',
            precio: '$700'
        },
        {
            nombre: 'GUANTES DE ENTRENAMIENTO',
            descripcion: 'Guantes de alta calidad para entrenamiento.',
            categoria: 'Entrenamiento',
            precio: '$300'
        }
    ];
}

// Función para realizar la búsqueda de productos mediante una API
function buscarProductos(query) {
    // Simula una API o un endpoint que devuelva productos según la búsqueda
    // Por ejemplo, puedes usar una API pública o interna para obtener los datos
    let url = `https://api.example.com/products?search=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Llama a la función que llena la tabla con los datos obtenidos
            llenarTabla(data);
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Función para llenar la tabla con los productos
function llenarTabla(productos) {
    // Limpia la tabla antes de llenarla
    $('#productosBody').empty();

    // Recorre cada producto y crea una fila en la tabla
    productos.forEach(producto => {
        let fila = `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.categoria}</td>
                <td>${producto.precio}</td>
            </tr>
        `;
        $('#productosBody').append(fila);
    });
}
