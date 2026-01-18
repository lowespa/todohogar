/**
 * carrito.js - Lógica del carrito de compras para Hogar & Confort
 * Maneja productos, filtros y generación de pedidos
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONFIGURACIÓN Y CONSTANTES
    // ============================================
    
    // Datos de productos actualizados con imágenes reales
    const productos = [
        // CATEGORÍA: Ropa de cama (6 productos)
        {
            id: 1,
            nombre: "Juego de sábanas de algodón egipcio",
            descripcion: "Suavidad y transpirabilidad para noches de sueño perfectas.",
            precio: 89990,
            categoria: "cama",
            imagen: "Productos/cama1.png"
        },
        {
            id: 2,
            nombre: "Edredón nórdico de plumas premium",
            descripcion: "Calidez y confort para los meses más fríos.",
            precio: 75990,
            categoria: "cama",
            imagen: "Productos/cama2.png"
        },
        {
            id: 3,
            nombre: "Almohada viscoelástica ergonómica",
            descripcion: "Adapta a la forma de tu cabeza para un descanso óptimo.",
            precio: 29990,
            categoria: "cama",
            imagen: "Productos/cama3.png"
        },
        {
            id: 4,
            nombre: "Cobertor térmico para invierno",
            descripcion: "Aislamiento térmico de alta calidad.",
            precio: 64990,
            categoria: "cama",
            imagen: "Productos/cama4.png"
        },
        {
            id: 5,
            nombre: "Set de fundas nórdicas algodón",
            descripcion: "Set de 2 fundas nórdicas en diversos colores.",
            precio: 42990,
            categoria: "cama",
            imagen: "Productos/cama5.png"
        },
        {
            id: 6,
            nombre: "Colchón viscoelástico premium",
            descripcion: "Soporte ortopédico y confort superior.",
            precio: 329990,
            categoria: "cama",
            imagen: "Productos/cama6.png"
        },
        
        // CATEGORÍA: Cocina (6 productos)
        {
            id: 7,
            nombre: "Set de ollas antiadherentes",
            descripcion: "5 piezas de calidad profesional para tu cocina.",
            precio: 124990,
            categoria: "cocina",
            imagen: "Productos/cocina1.png"
        },
        {
            id: 8,
            nombre: "Set de cuchillos profesionales",
            descripcion: "6 piezas de acero inoxidable con soporte.",
            precio: 54990,
            categoria: "cocina",
            imagen: "Productos/cocina2.png"
        },
        {
            id: 9,
            nombre: "Batidora de pie profesional",
            descripcion: "Potente batidora con múltiples accesorios.",
            precio: 89990,
            categoria: "cocina",
            imagen: "Productos/cocina3.png"
        },
        {
            id: 10,
            nombre: "Juego de sartenes cerámicos",
            descripcion: "Set de 3 sartenes sin PFOA, saludables.",
            precio: 78990,
            categoria: "cocina",
            imagen: "Productos/cocina4.png"
        },
        {
            id: 11,
            nombre: "Robot de cocina multifunción",
            descripcion: "Prepara más de 20 recetas automáticamente.",
            precio: 189990,
            categoria: "cocina",
            imagen: "Productos/cocina5.png"
        },
        {
            id: 12,
            nombre: "Licuadora de alta velocidad",
            descripcion: "Potencia profesional para smoothies y sopas.",
            precio: 64990,
            categoria: "cocina",
            imagen: "Productos/cocina6.png"
        },
        
        // CATEGORÍA: Menaje (6 productos)
        {
            id: 13,
            nombre: "Vajilla de porcelana blanca",
            descripcion: "Elegante set de 24 piezas para 6 personas.",
            precio: 67990,
            categoria: "menaje",
            imagen: "Productos/menaje1.png"
        },
        {
            id: 14,
            nombre: "Juego de copas de vino",
            descripcion: "Set de 6 copas de cristal fino para vino tinto y blanco.",
            precio: 38990,
            categoria: "menaje",
            imagen: "Productos/menaje2.png"
        },
        {
            id: 15,
            nombre: "Set de cubiertos de acero inoxidable",
            descripcion: "24 piezas para 6 personas con diseño moderno.",
            precio: 42990,
            categoria: "menaje",
            imagen: "Productos/menaje3.png"
        },
        {
            id: 16,
            nombre: "Jarrón de cristal soplado",
            descripcion: "Artesanía en cristal para decoración elegante.",
            precio: 24990,
            categoria: "menaje",
            imagen: "Productos/menaje4.png"
        },
        {
            id: 17,
            nombre: "Set de tazas para café",
            descripcion: "6 tazas de cerámica con platillos incluidos.",
            precio: 28990,
            categoria: "menaje",
            imagen: "Productos/menaje5.png"
        },
        {
            id: 18,
            nombre: "Bandeja de servir de madera",
            descripcion: "Bandeja rectangular de madera de olivo.",
            precio: 18990,
            categoria: "menaje",
            imagen: "Productos/menaje6.png"
        },
        
        // CATEGORÍA: Organización (3 productos)
        {
            id: 19,
            nombre: "Organizador modular para closet",
            descripcion: "Sistema adaptable para maximizar el espacio.",
            precio: 45990,
            categoria: "organizacion",
            imagen: "Productos/organizacion1.png"
        },
        {
            id: 20,
            nombre: "Estantería modular de bambú",
            descripcion: "Estantes modulares para organizar cualquier espacio.",
            precio: 64990,
            categoria: "organizacion",
            imagen: "Productos/organizacion2.png"
        },
        {
            id: 21,
            nombre: "Cajas organizadoras apilables",
            descripcion: "Set de 6 cajas transparentes con tapa.",
            precio: 24990,
            categoria: "organizacion",
            imagen: "Productos/organizacion3.png"
        },
        
        // CATEGORÍA: Otras (3 productos)
        {
            id: 22,
            nombre: "Lámpara de pie moderna",
            descripcion: "Diseño escandinavo con luz regulable.",
            precio: 55990,
            categoria: "otras",
            imagen: "Productos/otras1.png"
        },
        {
            id: 23,
            nombre: "Reloj de pared minimalista",
            descripcion: "Diseño contemporáneo sin números.",
            precio: 32990,
            categoria: "otras",
            imagen: "Productos/otras2.png"
        },
        {
            id: 24,
            nombre: "Espejo decorativo para entrada",
            descripcion: "Marco de madera natural, 80x120cm.",
            precio: 78990,
            categoria: "otras",
            imagen: "Productos/otras3.png"
        }
    ];
    
    // ============================================
    // ELEMENTOS DEL DOM
    // ============================================
    
    const productosGrid = document.getElementById('productos-grid');
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoResumen = document.getElementById('carrito-resumen');
    const carritoTotalItems = document.getElementById('carrito-total-items');
    const resumenCantidad = document.getElementById('resumen-cantidad');
    const resumenTotal = document.getElementById('resumen-total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const generarPedidoBtn = document.getElementById('generar-pedido');
    const generarEmailBtn = document.getElementById('generar-email');
    
    // ============================================
    // FUNCIONES DEL CARRITO (sin cambios)
    // ============================================
    
    /**
     * Obtiene el carrito desde localStorage
     * @returns {Array} Array de productos en el carrito
     */
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carritoHogarConfort')) || [];
    }
    
    /**
     * Guarda el carrito en localStorage
     * @param {Array} carrito - Array de productos
     */
    function guardarCarrito(carrito) {
        localStorage.setItem('carritoHogarConfort', JSON.stringify(carrito));
        actualizarContadorHeader();
    }
    
    /**
     * Actualiza el contador del carrito en el header
     */
    function actualizarContadorHeader() {
        const carrito = obtenerCarrito();
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        // Actualizar contador en header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        
        // Actualizar contador en página de carrito
        if (carritoTotalItems) {
            carritoTotalItems.textContent = totalItems;
        }
    }
    
    /**
     * Agrega un producto al carrito
     * @param {number} id - ID del producto
     */
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;
        
        const carrito = obtenerCarrito();
        const productoExistente = carrito.find(item => item.id === id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        guardarCarrito(carrito);
        actualizarCarrito();
        
        // Mostrar notificación
        mostrarNotificacion(`"${producto.nombre}" agregado al carrito`);
    }
    
    /**
     * Elimina un producto del carrito
     * @param {number} id - ID del producto a eliminar
     */
    function eliminarDelCarrito(id) {
        let carrito = obtenerCarrito();
        carrito = carrito.filter(item => item.id !== id);
        
        guardarCarrito(carrito);
        actualizarCarrito();
    }
    
    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {number} id - ID del producto
     * @param {number} cantidad - Nueva cantidad
     */
    function actualizarCantidad(id, cantidad) {
        if (cantidad < 1) {
            eliminarDelCarrito(id);
            return;
        }
        
        const carrito = obtenerCarrito();
        const producto = carrito.find(item => item.id === id);
        
        if (producto) {
            producto.cantidad = cantidad;
            guardarCarrito(carrito);
            actualizarCarrito();
        }
    }
    
    /**
     * Vacía completamente el carrito
     */
    function vaciarCarrito() {
        if (obtenerCarrito().length === 0) return;
        
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            guardarCarrito([]);
            actualizarCarrito();
            mostrarNotificacion('Carrito vaciado');
        }
    }
    
    /**
     * Formatea un precio como moneda chilena
     * @param {number} precio - Precio a formatear
     * @returns {string} Precio formateado
     */
    function formatearPrecio(precio) {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(precio);
    }
    
    // ============================================
    // RENDERIZADO DE ELEMENTOS
    // ============================================
    
    /**
     * Renderiza los productos en el grid
     * @param {string} categoria - Categoría a filtrar, o "todos" para mostrar todos
     */
    function renderizarProductos(categoria = 'todos') {
        if (!productosGrid) return;
        
        productosGrid.innerHTML = '';
        
        const productosFiltrados = categoria === 'todos' 
            ? productos 
            : productos.filter(p => p.categoria === categoria);
        
        productosFiltrados.forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.className = 'producto-card producto-catalogo-card';
            productoCard.innerHTML = `
                <div class="producto-catalogo-img">
                    <img src="assets/img/${producto.imagen}" alt="${producto.nombre}" class="producto-imagen-real" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f8f1e9%22/><text x=%2250%22 y=%2250%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22>🏠</text></svg>'">
                </div>
                <div class="producto-catalogo-content">
                    <span class="producto-catalogo-categoria">${obtenerNombreCategoria(producto.categoria)}</span>
                    <h3 class="producto-catalogo-title">${producto.nombre}</h3>
                    <p class="producto-catalogo-desc">${producto.descripcion}</p>
                    <div class="producto-catalogo-precio">${formatearPrecio(producto.precio)}</div>
                    <button class="btn btn-primary agregar-carrito-btn" data-id="${producto.id}">
                        <i class="fas fa-cart-plus"></i> Agregar al carrito
                    </button>
                </div>
            `;
            
            productosGrid.appendChild(productoCard);
        });
        
        // Agregar event listeners a los botones de agregar
        document.querySelectorAll('.agregar-carrito-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                agregarAlCarrito(id);
            });
        });
    }
    
    /**
     * Renderiza los productos en el carrito
     */
    function renderizarCarrito() {
        if (!carritoItems || !carritoResumen) return;
        
        const carrito = obtenerCarrito();
        
        // Mostrar/ocultar elementos según si hay productos
        if (carrito.length === 0) {
            carritoVacio.style.display = 'block';
            carritoResumen.style.display = 'none';
            return;
        }
        
        carritoVacio.style.display = 'none';
        carritoResumen.style.display = 'block';
        
        // Renderizar items del carrito
        carritoItems.innerHTML = '';
        
        let totalPrecio = 0;
        let totalItems = 0;
        
        carrito.forEach(item => {
            totalPrecio += item.precio * item.cantidad;
            totalItems += item.cantidad;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'carrito-item';
            itemElement.innerHTML = `
                <div class="carrito-item-img">
                    <img src="assets/img/${item.imagen}" alt="${item.nombre}" class="carrito-imagen-real" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23f8f1e9%22/><text x=%2250%22 y=%2250%22 font-size=%2215%22 text-anchor=%22middle%22 dy=%22.3em%22>🏠</text></svg>'">
                </div>
                <div class="carrito-item-info">
                    <div class="carrito-item-nombre">${item.nombre}</div>
                    <div class="carrito-item-categoria">${obtenerNombreCategoria(item.categoria)}</div>
                </div>
                <div class="carrito-item-precio">${formatearPrecio(item.precio)}</div>
                <div class="carrito-item-cantidad">
                    <button class="cantidad-btn decrementar" data-id="${item.id}">-</button>
                    <span class="cantidad-value">${item.cantidad}</span>
                    <button class="cantidad-btn incrementar" data-id="${item.id}">+</button>
                </div>
                <button class="carrito-item-eliminar" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            
            carritoItems.appendChild(itemElement);
        });
        
        // Actualizar resumen
        resumenCantidad.textContent = totalItems;
        resumenTotal.textContent = formatearPrecio(totalPrecio);
        
        // Agregar event listeners a los botones del carrito
        document.querySelectorAll('.decrementar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const carrito = obtenerCarrito();
                const producto = carrito.find(item => item.id === id);
                
                if (producto) {
                    actualizarCantidad(id, producto.cantidad - 1);
                }
            });
        });
        
        document.querySelectorAll('.incrementar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const carrito = obtenerCarrito();
                const producto = carrito.find(item => item.id === id);
                
                if (producto) {
                    actualizarCantidad(id, producto.cantidad + 1);
                }
            });
        });
        
        document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                eliminarDelCarrito(id);
            });
        });
    }
    
    /**
     * Actualiza toda la interfaz del carrito
     */
    function actualizarCarrito() {
        renderizarCarrito();
        actualizarContadorHeader();
        
        // Disparar evento para que main.js lo capture
        if (typeof window.actualizarCarritoGlobal === 'function') {
            window.actualizarCarritoGlobal();
        }
    }
    
    // ============================================
    // FUNCIONES DE UTILIDAD
    // ============================================
    
    /**
     * Obtiene el nombre legible de una categoría
     * @param {string} categoria - Código de categoría
     * @returns {string} Nombre legible
     */
    function obtenerNombreCategoria(categoria) {
        const categorias = {
            'cama': 'Ropa de cama',
            'cocina': 'Cocina',
            'menaje': 'Menaje',
            'organizacion': 'Organización',
            'otras': 'Otras'
        };
        
        return categorias[categoria] || categoria;
    }
    
    /**
     * Muestra una notificación temporal
     * @param {string} mensaje - Mensaje a mostrar
     */
    function mostrarNotificacion(mensaje) {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        
        // Estilos para la notificación
        notificacion.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--color-primary);
            color: var(--color-dark);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notificacion);
        
        // Mostrar notificación
        setTimeout(() => {
            notificacion.style.transform = 'translateX(0)';
        }, 10);
        
        // Ocultar y eliminar después de 3 segundos
        setTimeout(() => {
            notificacion.style.transform = 'translateX(120%)';
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
    
    /**
     * Genera un mensaje para WhatsApp con los productos del carrito
     */
    function generarMensajeWhatsApp() {
        const carrito = obtenerCarrito();
        
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío');
            return;
        }
        
        let mensaje = "Hola, me interesan los siguientes productos de Hogar & Confort:\n\n";
        
        carrito.forEach((item, index) => {
            mensaje += `${index + 1}. ${item.nombre}\n`;
            mensaje += `   Cantidad: ${item.cantidad}\n`;
            mensaje += `   Precio referencial: ${formatearPrecio(item.precio)}\n\n`;
        });
        
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        mensaje += `Total referencial: ${formatearPrecio(total)}\n\n`;
        mensaje += "Me gustaría consultar disponibilidad y coordinar una visita a la tienda.";
        
        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        const telefono = "+56912345678"; // Número de ejemplo
        
        // Abrir WhatsApp con el mensaje
        window.open(`https://wa.me/${telefono}?text=${mensajeCodificado}`, '_blank');
    }
    
    /**
     * Genera un correo con los productos del carrito
     */
    function generarCorreo() {
        const carrito = obtenerCarrito();
        
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío');
            return;
        }
        
        let cuerpo = "Hola, me interesan los siguientes productos de Hogar & Confort:\n\n";
        
        carrito.forEach((item, index) => {
            cuerpo += `${index + 1}. ${item.nombre}\n`;
            cuerpo += `   Cantidad: ${item.cantidad}\n`;
            cuerpo += `   Precio referencial: ${formatearPrecio(item.precio)}\n\n`;
        });
        
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        cuerpo += `Total referencial: ${formatearPrecio(total)}\n\n`;
        cuerpo += "Me gustaría consultar disponibilidad y coordinar una visita a la tienda.\n\n";
        cuerpo += "Saludos,\n[Nombre]\n[Teléfono]";
        
        const asunto = encodeURIComponent("Consulta de productos - Hogar & Confort");
        cuerpo = encodeURIComponent(cuerpo);
        
        // Abrir cliente de correo
        window.open(`mailto:info@hogaryconfort.cl?subject=${asunto}&body=${cuerpo}`);
    }
    
    // ============================================
    // MANEJADORES DE EVENTOS
    // ============================================
    
    // Filtro de productos por categoría
    if (filtroBtns) {
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filtroBtns.forEach(b => b.classList.remove('active'));
                
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                // Filtrar productos
                const categoria = this.getAttribute('data-categoria');
                renderizarProductos(categoria);
            });
        });
    }
    
    // Vaciar carrito
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }
    
    // Generar pedido por WhatsApp
    if (generarPedidoBtn) {
        generarPedidoBtn.addEventListener('click', generarMensajeWhatsApp);
    }
    
    // Generar pedido por email
    if (generarEmailBtn) {
        generarEmailBtn.addEventListener('click', generarCorreo);
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    
    // Renderizar productos inicialmente
    renderizarProductos('todos');
    
    // Renderizar carrito inicialmente
    actualizarCarrito();
    
    // Manejar parámetros de URL si existen
    if (typeof window.filtrarPorParametroURL === 'function') {
        window.filtrarPorParametroURL('todos');
    }
    
    // Escuchar eventos de actualización del carrito desde otras pestañas
    window.addEventListener('storage', function(e) {
        if (e.key === 'carritoHogarConfort') {
            actualizarCarrito();
        }
    });
    
    // Escuchar evento personalizado de actualización
    window.addEventListener('carritoActualizado', actualizarCarrito);
});