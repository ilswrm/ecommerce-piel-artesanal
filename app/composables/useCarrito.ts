    //Importa solamente los tipos de datos 
    import type { Producto, Variante } from '@/assets/data/products'

    //Interfaz para definir cómo se representa un producto dentro del carrito
    //Item del carrito
    export interface ItemCarrito {
    producto: Producto
    variante: Variante
    cantidad: number
    color?: string
    tipo?: string
    }

    //Función para cargar desde localStorage
    const cargarDesdeLocalStorage = (): ItemCarrito[] => {
    if (import.meta.client) {
        try {
        const carritoGuardado = localStorage.getItem('carrito')
        if (carritoGuardado) {
            return JSON.parse(carritoGuardado)
        }
        } catch (error) {
        console.error('Error al cargar carrito:', error)
        }
    }
    return []
    }

    export const useCarrito = () => {
    //Estado reactivo del carrito se inicializa con el contenido de localStorage
    const items = useState<ItemCarrito[]>('carrito-items', () => cargarDesdeLocalStorage())

    //Guardar carrito en localStorage
    const guardarCarrito = () => {
        if (import.meta.client) {
        try {
            localStorage.setItem('carrito', JSON.stringify(items.value))
            console.log('✅ Carrito guardado:', items.value.length, 'items')
        } catch (error) {
            console.error('❌ Error al guardar carrito:', error)
        }
        }
    }

    //Recargar carrito desde localStorage
    const recargarCarrito = () => {
        if (import.meta.client) {
        try {
            const carritoGuardado = localStorage.getItem('carrito')
            if (carritoGuardado) {
            items.value = JSON.parse(carritoGuardado)
            console.log('🔄 Carrito recargado:', items.value.length, 'items')
            }
        } catch (error) {
            console.error('❌ Error al recargar carrito:', error)
        }
        }
    }
        //computed: Total de items en el carrito
        const totalItems = computed(() => {
            return items.value.reduce((total, item) => total + item.cantidad, 0)
        })

        //computed: Subtotal del carrito
        const subtotal = computed(() => {
            return items.value.reduce((total, item) => {
            return total + (item.variante.precio * item.cantidad)
            }, 0)
        })

        //computed: Total con envío 
        const costoEnvio = computed(() => {
            // gratis si es mayor a $3000, sino $150
            return subtotal.value >= 3000 ? 0 : 150
        })

        const total = computed(() => {
            return subtotal.value + costoEnvio.value
        })

        //Agregar item al carrito
        const agregarItem = (
            producto: Producto,
            variante: Variante,
            cantidad: number,
            color?: string,
            tipo?: string
        ) => {
            // Buscar si ya existe el mismo producto con la misma variante
            const existente = items.value.find(
            item => 
                item.producto.id === producto.id && 
                item.variante.id === variante.id
            )

            if (existente) {
            // Si existe, aumentar cantidad
            existente.cantidad += cantidad
            } else {
            // Si no existe, agregar nuevo item
            items.value.push({
                producto,
                variante,
                cantidad,
                color,
                tipo
            })
            }

            guardarCarrito()
        }

        //Actualizar cantidad de un item
        const actualizarCantidad = (index: number, cantidad: number) => {
            if (cantidad <= 0) {
            eliminarItem(index)
            } else if (items.value[index]) {
            items.value[index].cantidad = cantidad
            guardarCarrito()
            }
        }

        //Eliminar item del carrito
        const eliminarItem = (index: number) => {
            if (items.value[index]) {
            items.value.splice(index, 1)
            guardarCarrito()
            }
        }

        //vaciar carrito completo
        const vaciarCarrito = () => {
            items.value = []
            guardarCarrito()
        }

        //obtener item por índice
        const obtenerItem = (index: number) => {
            return items.value[index] || null
        }

        //verificar si el carrito está vacío
        const estaVacio = computed(() => {
            return items.value.length === 0
        })

        return {
            // Estado
            items,
            
            // Computed
            totalItems,
            subtotal,
            costoEnvio,
            total,
            estaVacio,
            
            // Métodos
            recargarCarrito,
            agregarItem,
            actualizarCantidad,
            eliminarItem,
            vaciarCarrito,
            obtenerItem
        }
        }
