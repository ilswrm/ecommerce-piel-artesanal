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

    // Estado del costo de envío dinámico
    const costoEnvioCalculado = useState<number>('costo-envio', () => 150) // Default 150
    const calculandoEnvio = useState<boolean>('calculando-envio', () => false)

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

        //Función para calcular costo de envío dinámicamente
    const calcularCostoEnvio = async (codigoPostal: string) => {
        if (!codigoPostal || !/^\d{5}$/.test(codigoPostal)) {
        console.warn('Código postal inválido:', codigoPostal)
        return
        }
        
        calculandoEnvio.value = true
        
        try {
        const response = await $fetch<{
            success: boolean
            costoEnvio: number
            codigoPostal: string
            servicio?: string
            error?: string
        }>('/api/calcular-envio', {
            method: 'POST',
            body: { codigoPostal }
        })
        
        // Usar el costo que retorna el servidor
        costoEnvioCalculado.value = response.costoEnvio
        console.log('✅ Costo de envío calculado:', response.costoEnvio)
        
        if (!response.success && response.error) {
            console.warn('⚠️', response.error)
        }
        } catch (error) {
        console.error('❌ Error al calcular envío:', error)
        // Usar costo por defecto si falla
        costoEnvioCalculado.value = 150
        } finally {
        calculandoEnvio.value = false
        }
    }

    // Computed: Costo de envío (usa el valor calculado)
    const costoEnvio = computed(() => costoEnvioCalculado.value)

    // Computed: Total
    const total = computed(() => {
        return subtotal.value + costoEnvio.value
    })

    // Agregar item al carrito
    const agregarItem = (
    producto: Producto,
    variante: Variante,
    cantidad: number,
    color?: string,
    tipo?: string
    ) => {
    console.log('🛒 Agregando al carrito:', producto.nombre, 'x', cantidad)
    
    const existente = items.value.find(
        item => 
        item.producto.id === producto.id && 
        item.variante.id === variante.id
    )

    if (existente) {
        existente.cantidad += cantidad
        console.log('📦 Producto ya existía, nueva cantidad:', existente.cantidad)
    } else {
        items.value.push({
        producto,
        variante,
        cantidad,
        color,
        tipo
        })
        console.log('✨ Nuevo producto agregado')
    }

    guardarCarrito()
    console.log('📊 Total items en carrito:', totalItems.value)
    }

  // Actualizar cantidad
    const actualizarCantidad = (index: number, cantidad: number) => {
    if (cantidad <= 0) {
        eliminarItem(index)
    } else if (items.value[index]) {
        items.value[index].cantidad = cantidad
        guardarCarrito()
    }
    }

  // Eliminar item
    const eliminarItem = (index: number) => {
    if (items.value[index]) {
        items.value.splice(index, 1)
        guardarCarrito()
    }
    }

  // Vaciar carrito
    const vaciarCarrito = () => {
    items.value = []
    guardarCarrito()
    }

  // Obtener item
    const obtenerItem = (index: number) => {
    return items.value[index] || null
    }

  // Computed: ¿Está vacío?
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
    calculandoEnvio, // 🆕 Para mostrar "Calculando..." en UI
    
    // Métodos
    recargarCarrito,
    agregarItem,
    actualizarCantidad,
    eliminarItem,
    vaciarCarrito,
    obtenerItem,
    calcularCostoEnvio // 🆕 Función para calcular envío
  }
}
