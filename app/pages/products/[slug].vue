    <script setup lang="ts">
    // Importa el products.ts a este archivo al igual que su información
    import productos, { type Producto, type Variante } from '@/assets/data/products'

    const route = useRoute()
    const { agregarItem, recargarCarrito } = useCarrito()

    //Encontrar el producto
    const producto = computed<Producto>(() => {
        const found = productos.find(p => p.slug === route.params.slug)

        if (!found) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Producto no encontrado'
            })
        }

        return found
    })

    //Estado reactivo
    const imagenPrincipal = ref(producto.value.imgs[0] || '')
    const cantidad = ref(1)

    // Obtener la primera variante
    const obtenerPrimeraVariante = (): Variante => {
        return producto.value.variantes[0] || {
            id: 0,
            precio: 0
        }
    }

    //Variante seleccionada (inicia con la primera variante)
    const varianteSeleccionada = ref<Variante>(obtenerPrimeraVariante())

    //Opciones de color y tipo
    const coloresDisponibles = computed(() => {
        const colores = [...new Set(producto.value.variantes.map(v => v.color).filter(Boolean))]
        return colores as string[]
    })

    const tiposDisponibles = computed(() => {
        const tipos = [...new Set(producto.value.variantes.map(v => v.tipo).filter(Boolean))]
        return tipos as string[]
    })

    //Estados de selección individual
    const colorSeleccionado = ref(varianteSeleccionada.value.color || coloresDisponibles.value[0] || 'Negro')
    const tipoSeleccionado = ref(varianteSeleccionada.value.tipo || tiposDisponibles.value[0] || '')

    //Actualizar variante cuando cambia color o tipo
    const actualizarVariante = () => {
        const varianteEncontrada = producto.value.variantes.find(v => {
            const matchColor = !v.color || v.color === colorSeleccionado.value
            const matchTipo = !v.tipo || v.tipo === tipoSeleccionado.value
            return matchColor && matchTipo
        })

        if (varianteEncontrada) {
            varianteSeleccionada.value = varianteEncontrada
        }
    }

    // Watchers para actualizar variante
    watch(colorSeleccionado, actualizarVariante)
    watch(tipoSeleccionado, actualizarVariante)

    // Precio actual (reactivo según variante seleccionada)
    const precioActual = computed(() => {
        return varianteSeleccionada.value.precio || producto.value.variantes[0]?.precio || 0
    })

    const productoAgregado = ref(false)

        // Helper para obtener el color visual del botón
    const obtenerColorBoton = (color: string) => {
        const coloresMap: Record<string, { bg: string, border: string, text: string, hover: string }> = {
            'Café': { 
                bg: 'bg-amber-800', 
                border: 'border-amber-900', 
                text: 'text-white',
                hover: 'hover:bg-amber-900'
            },
            'Negro': { 
                bg: 'bg-gray-900', 
                border: 'border-gray-900', 
                text: 'text-white',
                hover: 'hover:bg-black'
            }
        }
        return coloresMap[color] || { 
            bg: 'bg-white', 
            border: 'border-gray-300', 
            text: 'text-gray-700',
            hover: 'hover:border-gray-400'
        }
    }
    // Helper para obtener las medidas de cada talla
    const obtenerMedidasTalla = (talla: string) => {
        const medidas: Record<string, string> = {
            'Chica': '74-82cm',
            'Mediana': '82-90cm',
            'Grande': '90-98.5cm',
            // Otras tallas (por si agregas más productos con tallas)
            'CH': '74-82cm',
            'M': '82-90cm',
            'G': '90-98.5cm'
    }
    return medidas[talla] || ''
}
    // Función para añadir al carrito
    const añadirAlCarrito = () => {
        
        // Agregar al carrito usando el composable
        agregarItem(
            producto.value,
            varianteSeleccionada.value,
            cantidad.value,
            colorSeleccionado.value,
            tipoSeleccionado.value
        )

        // Forzar recarga del carrito para actualizar el contador del carrito
        setTimeout(() => {
            recargarCarrito()
        }, 100)

        

        const agregarAlCarrito = () => {
            // lógica del carrito
                productoAgregado.value = true

                    setTimeout(() => {
                        productoAgregado.value = false
                    }, 2000)
            }

        //Resetear cantidad a 1
        cantidad.value = 1
    }

    //Incrementar/decrementar cantidad
    const incrementarCantidad = () => {
        cantidad.value++
    }

    const decrementarCantidad = () => {
        if (cantidad.value > 1) {
            cantidad.value--
        }
    }
    </script>

    <template>
        <section class="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <!-- Botón de volver -->
            <NuxtLink 
                to="/#catalogo" 
                class="inline-flex items-center gap-2 mb-6 md:mb-8 text-sm border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
                <Icon name="ph:arrow-left" size="16" />
                Volver a todos los productos
            </NuxtLink>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <!-- BLOQUE MOBILE: Info antes de la imagen -->
                <div class="flex flex-col gap-3 lg:hidden">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                            {{ producto.tipo }}
                        </span>
                        <span class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            Artesanal 100%
                        </span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900">
                        {{ producto.nombre }}
                    </h1>
                    <p class="text-lg text-gray-600">
                        Precio: <span class="text-3xl font-bold text-gray-900">${{ precioActual }} MXN</span>
                    </p>
                    <p class="text-gray-600 leading-relaxed mt-2">
                        {{ producto.descripcion }}
                    </p>
                </div>
                <!-- COLUMNA IZQUIERDA: Imágenes -->
                <div class="flex flex-col gap-4">
                    <!-- Imagen principal -->
                    <div class="relative overflow-hidden rounded-2xl shadow-lg">
                        <NuxtImg 
                            v-if="imagenPrincipal"
                            :src="imagenPrincipal" 
                            :alt="producto.nombre" 
                            width="520" 
                            height="680" 
                            sizes="(max-width: 1024px) 100vw, 520px" 
                            format="webp" 
                            quality="80" 
                            loading="eager" 
                            class="rounded-xl object-cover w-full"
                        />
                    </div>

                    <!-- Thumbnails -->
                    <div 
                        v-if="producto.imgs.length > 1" 
                        class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                    >
                        <button
                            v-for="(img, index) in producto.imgs"
                            :key="index"
                            @click="imagenPrincipal = img"
                            :class="[
                                'relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all',
                                'hover:opacity-100 hover:ring-2 hover:ring-gray-900',
                                imagenPrincipal === img 
                                    ? 'ring-2 ring-gray-900 opacity-100' 
                                    : 'opacity-60 ring-1 ring-gray-300'
                            ]"
                        >
                            <NuxtImg 
                                :src="img" 
                                :alt="`${producto.nombre} vista ${index + 1}`" 
                                width="96" 
                                height="96" 
                                sizes="96px"
                                format="webp" 
                                quality="70" 
                                loading="lazy"
                                class="w-full h-full object-cover"
                            />
                        </button>
                    </div>

                    <!-- instruccion para thumbnails -->
                    <p 
                        v-if="producto.imgs.length > 1" 
                        class="text-xs text-gray-500 flex items-center gap-1.5"
                    >
                        <Icon name="ph:hand-tap" size="14" />
                        <span>Haz clic en cada miniatura para verla más grande</span>
                    </p>
                </div>
                <!-- COLUMNA DERECHA: Info del producto (Desktop) -->
                <div class="hidden lg:flex flex-col gap-6">
                    <!-- Tipo y nombre -->
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                {{ producto.tipo }}
                            </span>
                            <span class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                Artesanal 100%
                            </span>
                        </div>
                        <h1 class="text-4xl font-bold text-gray-900">
                            {{ producto.nombre }}
                        </h1>
                    </div>

                    <!-- Precio -->
                    <div class="border-y border-gray-200 py-4">
                        <p class="text-lg text-gray-600">
                            Precio: <span class="text-4xl font-bold text-gray-900">${{ precioActual }} MXN</span>
                        </p>
                    </div>

                    <!-- Descripción -->
                    <p class="text-gray-600 leading-relaxed text-lg">
                        {{ producto.descripcion }}
                    </p>

                    <!-- Selector de Color  -->
                    <div v-if="coloresDisponibles.length > 1" class="space-y-3">
                        <label class="text-sm font-semibold text-gray-900">
                            Selecciona el color:
                        </label>
                        <div class="flex gap-3">
                            <button
                                v-for="color in coloresDisponibles"
                                :key="color"
                                @click="colorSeleccionado = color"
                                :class="[
                                    'px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all min-w-[100px] flex items-center justify-center gap-2',
                                    colorSeleccionado === color
                                        ? `${obtenerColorBoton(color).bg} ${obtenerColorBoton(color).border} ${obtenerColorBoton(color).text} ring-2 ring-offset-2 ring-gray-900`
                                        : `bg-white border-gray-300 text-gray-700 hover:border-gray-400`
                                ]"
                            >
                                <span 
                                    v-if="color === 'Café'"
                                    class="w-4 h-4 rounded-full bg-amber-800 border border-amber-900"
                                ></span>
                                <span 
                                    v-if="color === 'Negro'"
                                    class="w-4 h-4 rounded-full bg-black border border-gray-700"
                                ></span>
                                {{ color }}
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                            Selecciona el color para personalizar tu pedido
                        </p>
                    </div>

                    <!-- Selector de Tipo (si hay múltiples tipos) -->
                    <div v-if="tiposDisponibles.length > 1" class="space-y-3">
                        <label class="text-sm font-semibold text-gray-900">
                            Talla: <span class="font-normal text-gray-600">{{ tipoSeleccionado }}</span>
                        </label>
                        <div class="flex flex-col gap-2">
                            <button
                                v-for="tipo in tiposDisponibles"
                                :key="tipo"
                                @click="tipoSeleccionado = tipo"
                                :class="[
                                    'px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all text-left',
                                    tipoSeleccionado === tipo
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                ]"
                            >
                                <span class="font-semibold">{{ tipo }}</span>
                                <span 
                                    :class="[
                                        'block text-xs mt-1',
                                        tipoSeleccionado === tipo ? 'text-gray-300' : 'text-gray-500'
                                    ]"
                                >
                                    {{ obtenerMedidasTalla(tipo) }}
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Selector de Cantidad -->
                    <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-900">
                            Cantidad
                        </label>
                        <div class="flex items-center gap-4">
                            <button
                                @click="decrementarCantidad"
                                :disabled="cantidad <= 1"
                                class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <Icon name="ph:minus" size="18" />
                            </button>
                            <input
                                type="number"
                                min="1"
                                v-model.number="cantidad"
                                class="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-lg font-semibold"
                            />
                            <button
                                @click="incrementarCantidad"
                                class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            >
                                <Icon name="ph:plus" size="18" />
                            </button>
                        </div>
                    </div>

                    <!-- Botón añadir al carrito -->
                    <button
                        @click="añadirAlCarrito"
                        class="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
                    >
                        Añadir al carrito
                    </button>

                    <p v-if="productoAgregado" class="text-green-600 mt-2">
                        Producto agregado al carrito
                    </p>

                    <!-- Información adicional -->
                    <div class="mt-6 space-y-4 pt-6 border-t border-gray-200">
                        <details v-if="producto.materiales" class="group">
                            <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                                <span>Materiales</span>
                                <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                            </summary>
                            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                                {{ producto.materiales }}
                            </p>
                        </details>

                        <details v-if="producto.capacidad" class="group">
                            <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                                <span>Capacidad</span>
                                <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                            </summary>
                            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                                {{ producto.capacidad }}
                            </p>
                        </details>

                        <details v-if="producto.dimensiones" class="group">
                            <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                                <span>Dimensiones</span>
                                <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                            </summary>
                            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                                {{ producto.dimensiones }}
                            </p>
                        </details>
                    </div>
                </div>
                <!-- BLOQUE MOBILE: Controles y botón -->
                <div class="lg:hidden space-y-6 mt-4">
                    <!-- Selector de Color (Mobile) -->
                    <div v-if="coloresDisponibles.length > 1" class="space-y-3">
                        <label class="text-sm font-semibold text-gray-900">
                            Selecciona el color:
                        </label>
                        <div class="flex gap-3">
                            <button
                                v-for="color in coloresDisponibles"
                                :key="color"
                                @click="colorSeleccionado = color"
                                :class="[
                                    'px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all min-w-[100px] flex items-center justify-center gap-2',
                                    colorSeleccionado === color
                                        ? `${obtenerColorBoton(color).bg} ${obtenerColorBoton(color).border} ${obtenerColorBoton(color).text} ring-2 ring-offset-2 ring-gray-900`
                                        : `bg-white border-gray-300 text-gray-700 hover:border-gray-400`
                                ]">
                                <span 
                                    v-if="color === 'Café'"
                                    class="w-4 h-4 rounded-full bg-amber-800 border border-amber-900"
                                ></span>
                                <span 
                                    v-if="color === 'Negro'"
                                    class="w-4 h-4 rounded-full bg-black border border-gray-700"
                                ></span>
                                {{ color }}
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                            Selecciona el color para personalizar tu pedido
                        </p>
                    </div>

                    <!-- Selector de Tipo (Mobile) -->
                    <div v-if="tiposDisponibles.length > 1" class="space-y-3">
                        <label class="text-sm font-semibold text-gray-900">
                            Talla: <span class="font-normal text-gray-600">{{ tipoSeleccionado }}</span>
                        </label>
                        <div class="flex flex-col gap-2">
                            <button
                                v-for="tipo in tiposDisponibles"
                                :key="tipo"
                                @click="tipoSeleccionado = tipo"
                                :class="[
                                    'px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all text-left',
                                    tipoSeleccionado === tipo
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                ]">
                                <span class="font-semibold">{{ tipo }}</span>
                                <span 
                                    :class="[
                                        'block text-xs mt-1',
                                        tipoSeleccionado === tipo ? 'text-gray-300' : 'text-gray-500'
                                    ]"
                                >
                                    {{ obtenerMedidasTalla(tipo) }}
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Selector de Cantidad (Mobile) -->
                    <div class="space-y-3">
                        <label class="text-sm font-semibold text-gray-900">
                            Cantidad
                        </label>
                        <div class="flex items-center gap-4">
                            <button
                                @click="decrementarCantidad"
                                :disabled="cantidad <= 1"
                                class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <Icon name="ph:minus" size="18" />
                            </button>
                            <input
                                type="number"
                                min="1"
                                v-model.number="cantidad"
                                class="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-lg font-semibold"
                            />
                            <button
                                @click="incrementarCantidad"
                                class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                            >
                                <Icon name="ph:plus" size="18" />
                            </button>
                        </div>
                    </div>

                    <!-- Botón añadir al carrito (Mobile) -->
                    <button
                        @click="añadirAlCarrito"
                        class="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg"
                    >
                        Añadir al carrito
                    </button>

                    <!-- Información adicional (Mobile) -->
                    <div class="space-y-4 pt-6 border-t border-gray-200">
                        <details v-if="producto.materiales" class="group">
                            <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900">
                                <span>Materiales</span>
                                <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                            </summary>
                            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                                {{ producto.materiales }}
                            </p>
                        </details>

                        <details v-if="producto.capacidad" class="group">
                            <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900">
                                <span>Capacidad</span>
                                <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                            </summary>
                            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                                {{ producto.capacidad }}
                            </p>
                        </details>

                        <details v-if="producto.dimensiones" class="group">
                            <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900">
                                <span>Dimensiones</span>
                                <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                            </summary>
                            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                                {{ producto.dimensiones }}
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </section>
    </template>

    <style scoped>
    /* Ocultar scrollbar en navegadores WebKit */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    /* Ocultar scrollbar en Firefox */
    .scrollbar-hide {
        scrollbar-width: none;
    }

    /* Prevenir que el input number muestre flechas */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
    </style>
