    <script setup lang="ts">
    //Función que regresa un objeto
    const { 
    items, 
    totalItems, 
    subtotal, 
    costoEnvio, 
    total, 
    estaVacio,
    recargarCarrito,
    actualizarCantidad,
    eliminarItem
    } = useCarrito()

    // Cargar carrito al montar
    onMounted(() => {
    recargarCarrito()
    })

    // Función para formatear precio
    const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(precio)
    }

    // Incrementar cantidad
    const incrementarCantidad = (index: number) => {
    const item = items.value[index]
    if (item) {
        actualizarCantidad(index, item.cantidad + 1)
    }
    }

    // Decrementar cantidad
    const decrementarCantidad = (index: number) => {
    const item = items.value[index]
    if (item && item.cantidad > 1) {
        actualizarCantidad(index, item.cantidad - 1)
    }
    }

    //Ir a checkout
    const irACheckout = () => {
    navigateTo('/checkout')
    }

    //Meta tags
    useHead({
    title: 'Carrito de Compras',
    meta: [
        { name: 'description', content: 'Tu carrito de compras' }
    ]
    })
    </script>

    <template>
    <div class="min-h-screen bg-gray-50 py-8 md:py-12">
        <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="mb-8">
            <NuxtLink 
            to="/#catalogo" 
            class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
            <Icon name="ph:arrow-left" size="16" />
            Seguir comprando
            </NuxtLink>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            Carrito de Compras
            </h1>
            <p v-if="!estaVacio" class="text-gray-600 mt-2">
            {{ totalItems }} {{ totalItems === 1 ? 'artículo' : 'artículos' }} en tu carrito
            </p>
        </div>

        <!-- Carrito vacío -->
        <div v-if="estaVacio" class="text-center py-16">
            <Icon name="ph:shopping-bag" size="64" class="text-gray-300 mx-auto mb-4" />
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
            </h2>
            <p class="text-gray-600 mb-6">
            Agrega productos para comenzar tu compra
            </p>
            <NuxtLink 
            to="/#catalogo" 
            class="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
            <Icon name="ph:shopping-bag" size="20" />
            Ver productos
            </NuxtLink>
        </div>

        <!--Carrito con items -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!--Columna izquierda: Lista de productos -->
            <div class="lg:col-span-2 space-y-4">
            <div
                v-for="(item, index) in items"
                :key="`${item.producto.id}-${item.variante.id}`"
                class="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex gap-4">
                <!--Imagen del producto -->
                <div class="flex-shrink-0">
                    <NuxtLink :to="`/products/${item.producto.slug}`">
                    <img
                        :src="item.producto.imgs[0]"
                        :alt="item.producto.nombre"
                        class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                    </NuxtLink>
                </div>

                <!--Info del producto -->
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start gap-4">
                    <div class="flex-1 min-w-0">
                        <NuxtLink 
                        :to="`/products/${item.producto.slug}`"
                        class="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors line-clamp-2"
                        >
                        {{ item.producto.nombre }}
                        </NuxtLink>
                        <p class="text-sm text-gray-500 mt-1">
                        {{ item.producto.tipo }}
                        </p>

                        <!-- Variantes -->
                        <div class="flex flex-wrap gap-2 mt-2">
                        <span v-if="item.color" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {{ item.color }}
                        </span>
                        <span v-if="item.tipo" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {{ item.tipo }}
                        </span>
                        </div>
                    </div>

                    <!-- Botón eliminar (desktop) -->
                    <button
                        @click="eliminarItem(index)"
                        class="hidden md:flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Eliminar producto"
                    >
                        <Icon name="ph:trash" size="20" />
                    </button>
                    </div>

                    <!-- Precio y controles -->
                    <div class="flex items-center justify-between mt-4">
                    <!-- Selector de cantidad -->
                    <div class="flex items-center gap-2">
                        <button
                        @click="decrementarCantidad(index)"
                        :disabled="item.cantidad <= 1"
                        class="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                        <Icon name="ph:minus" size="16" />
                        </button>
                        <span class="w-12 text-center font-semibold text-gray-900">
                        {{ item.cantidad }}
                        </span>
                        <button
                        @click="incrementarCantidad(index)"
                        class="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                        >
                        <Icon name="ph:plus" size="16" />
                        </button>
                    </div>

                    <!-- Precio -->
                    <div class="text-right">
                        <p class="text-lg font-bold text-gray-900">
                        {{ formatearPrecio(item.variante.precio * item.cantidad) }}
                        </p>
                        <p v-if="item.cantidad > 1" class="text-xs text-gray-500">
                        {{ formatearPrecio(item.variante.precio) }} c/u
                        </p>
                    </div>
                    </div>

                    <!-- Botón eliminar (mobile) -->
                    <button
                    @click="eliminarItem(index)"
                    class="md:hidden w-full mt-3 flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                    <Icon name="ph:trash" size="16" />
                    Eliminar
                    </button>
                </div>
                </div>
            </div>
            </div>

            <!-- Columna derecha: Resumen -->
            <div class="lg:col-span-1">
            <div class="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                Resumen del pedido
                </h2>

                <!-- Desglose -->
                <div class="space-y-3 mb-6">
                <div class="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{{ formatearPrecio(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>{{ formatearPrecio(costoEnvio) }}</span>
                </div>
                <div class="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{{ formatearPrecio(total) }}</span>
                </div>
                </div>

                <!-- Botón checkout -->
                <button
                @click="irACheckout"
                class="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                >
                Proceder al pago
                </button>

                <!-- Info adicional -->
                <div class="mt-6 space-y-3 text-sm text-gray-600">
                <div class="flex items-start gap-2">
                    <Icon name="ph:shield-check" size="20" class="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Compra 100% segura</span>
                </div>
                <div class="flex items-start gap-2">
                    <Icon name="ph:truck" size="20" class="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Envío a toda la República Mexicana</span>
                </div>
                <div class="flex items-start gap-2">
                    <Icon name="ph:credit-card" size="20" class="text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Pago seguro con Stripe</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </template>

    <style scoped>
    .line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
</style>