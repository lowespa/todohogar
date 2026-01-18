/**
 * main.js - Funcionalidades principales del sitio Hogar & Confort
 * Maneja navegación, animaciones y funcionalidades compartidas
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONFIGURACIÓN INICIAL
    // ============================================
    
    // Elementos del DOM
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const cartCount = document.querySelector('.cart-count');
    
    // ============================================
    // FUNCIONES UTILITARIAS
    // ============================================
    
    /**
     * Actualiza el contador del carrito en el header
     */
    function actualizarContadorCarrito() {
        if (!cartCount) return;
        
        const carrito = JSON.parse(localStorage.getItem('carritoHogarConfort')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    /**
     * Cierra el menú móvil
     */
    function cerrarMenuMovil() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    /**
     * Maneja el comportamiento de los enlaces del menú
     */
    function manejarEnlacesMenu() {
        // Para enlaces internos, hacer scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo para enlaces internos (no a otras páginas)
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Cerrar menú móvil si está abierto
                        cerrarMenuMovil();
                        
                        // Scroll suave al elemento
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    /**
     * Maneja la navegación activa basada en la sección actual
     */
    function manejarNavegacionActiva() {
        // Solo ejecutar en index.html
        if (!window.location.pathname.endsWith('index.html') && 
            window.location.pathname !== '/' && 
            !window.location.pathname.endsWith('/')) {
            return;
        }
        
        const sections = document.querySelectorAll('section[id]');
        
        // Observador de intersección para detectar sección activa
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // Actualizar enlaces de navegación
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                    
                    mobileNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    /**
     * Aplica animaciones de aparición a elementos
     */
    function inicializarAnimaciones() {
        // Configuración para animaciones de scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animado');
                }
            });
        }, observerOptions);
        
        // Observar elementos que deben animarse
        document.querySelectorAll('.categoria-card, .producto-card, .step').forEach(el => {
            observer.observe(el);
        });
    }
    
    /**
     * Inicializa los placeholders de imágenes con colores aleatorios
     */
    function inicializarPlaceholders() {
        const placeholders = document.querySelectorAll('.img-placeholder');
        const colores = ['#f8f1e9', '#f0f7ee', '#f5f0f8', '#eef8f7', '#f9f3e9', '#e9f4f8'];
        
        placeholders.forEach(placeholder => {
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            const parent = placeholder.parentElement;
            
            if (parent && parent.classList.contains('categoria-img') || 
                parent.classList.contains('producto-img')) {
                parent.style.backgroundColor = colorAleatorio;
            }
        });
    }
    
    /**
     * Configura los iconos flotantes con animaciones
     */
    function configurarIconosFlotantes() {
        const floatingIcons = document.querySelector('.floating-icons');
        const icons = document.querySelectorAll('.floating-icon');
        
        if (!floatingIcons) return;
        
        // Añadir animación de entrada escalonada
        icons.forEach((icon, index) => {
            // Retraso escalonado para cada icono
            setTimeout(() => {
                icon.style.opacity = '0';
                icon.style.transform = 'translateY(20px) scale(0.8)';
                
                // Animar entrada
                setTimeout(() => {
                    icon.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    icon.style.opacity = '1';
                    icon.style.transform = 'translateY(0) scale(1)';
                }, 100);
            }, index * 150);
        });
        
        // Ocultar/mostrar iconos al hacer scroll
        let lastScrollTop = 0;
        const floatingIconsContainer = floatingIcons;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Ocultar al bajar, mostrar al subir
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // Bajando - ocultar
                floatingIconsContainer.style.transform = 'translateY(100px)';
                floatingIconsContainer.style.opacity = '0';
            } else if (scrollTop < lastScrollTop || scrollTop < 300) {
                // Subiendo o cerca del top - mostrar
                floatingIconsContainer.style.transform = 'translateY(0)';
                floatingIconsContainer.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Añadir interacción táctil para móviles
        icons.forEach(icon => {
            icon.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            icon.addEventListener('touchend', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
        });
    }
    
    // ============================================
    // MANEJADORES DE EVENTOS
    // ============================================
    
    // Abrir menú móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Cerrar menú móvil
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', cerrarMenuMovil);
    }
    
    // Cerrar menú al hacer clic en un enlace
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', cerrarMenuMovil);
    });
    
    // Cerrar menú al hacer clic fuera de él
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            cerrarMenuMovil();
        }
    });
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    
    // Actualizar contador del carrito al cargar la página
    actualizarContadorCarrito();
    
    // Configurar comportamiento de enlaces
    manejarEnlacesMenu();
    
    // Configurar navegación activa (solo en index.html)
    manejarNavegacionActiva();
    
    // Inicializar animaciones
    inicializarAnimaciones();
    
    // Inicializar placeholders de imágenes
    inicializarPlaceholders();
    
    // Configurar iconos flotantes
    configurarIconosFlotantes();
    
    // ============================================
    // MANEJO DE PARÁMETROS URL (para productos.html)
    // ============================================
    
    // Si estamos en la página de productos, manejar parámetros de URL
    if (window.location.pathname.includes('productos.html')) {
        // Esta función se llama desde carrito.js después de cargar los productos
        window.filtrarPorParametroURL = function(categoria) {
            const urlParams = new URLSearchParams(window.location.search);
            const categoriaParam = urlParams.get('categoria');
            
            if (categoriaParam && categoria) {
                const botonCategoria = document.querySelector(`.filtro-btn[data-categoria="${categoriaParam}"]`);
                if (botonCategoria) {
                    // Simular clic en el botón de filtro correspondiente
                    botonCategoria.click();
                }
            }
        };
    }
    
    // ============================================
    // EVENTOS GLOBALES
    // ============================================
    
    // Actualizar contador del carrito cuando cambia el localStorage
    window.addEventListener('storage', function(e) {
        if (e.key === 'carritoHogarConfort') {
            actualizarContadorCarrito();
        }
    });
    
    // Crear evento personalizado para actualizar el carrito
    window.actualizarCarritoGlobal = function() {
        actualizarContadorCarrito();
        
        // Disparar evento personalizado para que carrito.js lo capture
        window.dispatchEvent(new CustomEvent('carritoActualizado'));
    };
});