<script setup lang="ts">
import productos, { type Producto, type Variante } from '@/assets/data/products'

const route = useRoute()
const { agregarItem, recargarCarrito } = useCarrito()

// ─── PRODUCTO ─────────────────────────────────────────────────────────────
const producto = computed<Producto>(() => {
    const found = productos.find(p => p.slug === route.params.slug)
    if (!found) {
        throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' })
    }
    return found
})

// ─── OPCIONES DISPONIBLES ─────────────────────────────────────────────────
const coloresDisponibles = computed(() =>
    [...new Set(producto.value.variantes.map(v => v.color).filter(Boolean))] as string[]
)

const texturasDisponibles = computed(() =>
    [...new Set(producto.value.variantes.map(v => v.textura).filter(Boolean))] as string[]
)

const tiposDisponibles = computed(() =>
    [...new Set(producto.value.variantes.map(v => v.tipo).filter(Boolean))] as string[]
)

// ─── SELECCIÓN (lee query params del catálogo) ────────────────────────────
const colorSeleccionado = ref(
    (route.query.color as string) || coloresDisponibles.value[0] || 'Negro'
)
const texturaSeleccionada = ref(
    (route.query.textura as string) || texturasDisponibles.value[0] || 'Texturizada'
)
const tipoSeleccionado = ref(tiposDisponibles.value[0] || '')
const cantidad = ref(1)

// ─── IMÁGENES REACTIVAS ───────────────────────────────────────────────────
const imagenesActuales = computed(() => {
    const key = `${colorSeleccionado.value.toLowerCase()}-${texturaSeleccionada.value.toLowerCase()}` as keyof typeof producto.value.imgs
    return producto.value.imgs[key]
        ?? producto.value.imgs['negro-texturizada']
        ?? producto.value.imgs['negro-lisa']
        ?? []
})

const imagenPrincipal = ref(imagenesActuales.value[0] || '')

// Cuando cambia color o textura, actualiza imagen principal
watch(imagenesActuales, (nuevas) => {
    imagenPrincipal.value = nuevas[0] || ''
})

// ─── VARIANTE SELECCIONADA ────────────────────────────────────────────────
const actualizarVariante = () => {
    const found = producto.value.variantes.find(v => {
        const matchColor   = !v.color   || v.color   === colorSeleccionado.value
        const matchTextura = !v.textura || v.textura === texturaSeleccionada.value
        const matchTipo    = !v.tipo    || v.tipo    === tipoSeleccionado.value
        return matchColor && matchTextura && matchTipo
    })
    if (found) varianteSeleccionada.value = found
}

const varianteSeleccionada = ref<Variante>(
    (producto.value.variantes.find(v =>
        v.color === colorSeleccionado.value && v.textura === texturaSeleccionada.value
    ) ?? producto.value.variantes[0]) as Variante
)

watch(colorSeleccionado,    actualizarVariante)
watch(texturaSeleccionada,  actualizarVariante)
watch(tipoSeleccionado,     actualizarVariante)

// ─── PRECIO ───────────────────────────────────────────────────────────────
const precioActual = computed(() =>
    varianteSeleccionada.value.precio || producto.value.variantes[0]?.precio || 0
)

// ─── CARRITO ──────────────────────────────────────────────────────────────
const productoAgregado = ref(false)

const añadirAlCarrito = () => {
    agregarItem(
        producto.value,
        varianteSeleccionada.value,
        cantidad.value,
        colorSeleccionado.value,
        tipoSeleccionado.value
    )
    setTimeout(() => recargarCarrito(), 100)
    productoAgregado.value = true
    setTimeout(() => { productoAgregado.value = false }, 2000)
    cantidad.value = 1
}

const incrementarCantidad = () => cantidad.value++
const decrementarCantidad = () => { if (cantidad.value > 1) cantidad.value-- }

// ─── HELPERS ──────────────────────────────────────────────────────────────
const obtenerColorBoton = (color: string) => {
    const map: Record<string, { bg: string, border: string, text: string }> = {
        'Café':  { bg: '', border: '', text: 'text-white' },
        'Negro': { bg: 'bg-gray-900', border: 'border-gray-900', text: 'text-white' },
    }
    return map[color] || { bg: 'bg-white', border: 'border-gray-300', text: 'text-gray-700' }
}

const obtenerInfoTipo = (tipo: string) => {
    // Medidas de cinturón
    const medidasCinturon: Record<string, string> = {
        'Chica': '74-82cm',
        'Mediana': '82-90cm',
        'Grande': '90-98.5cm',
    }
    
    // Medidas de bolsas (totes, neceseres, etc)
    const medidasBolsa: Record<string, string> = {
        'Grande': '42cm x 35cm x 10cm',
        'Pequeña': '33cm x 31cm x 8cm',
    }

    // Tallas de deskmat
    const medidasDeskmat: Record<string, string> = {
        '55cm x 35cm': 'Talla grande',
        '35cm x 35cm': 'Talla chica',
    }

    const slug = producto.value.slug

    if (slug === 'cinturon') return medidasCinturon[tipo] || ''
    if (slug === 'totes') return medidasBolsa[tipo] || ''
    if (slug === 'deskmat') return medidasDeskmat[tipo] || ''
    
    return ''
}
</script>

<template>
    <section class="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <!-- Botón volver -->
        <NuxtLink
            to="/catalogo"
            class="inline-flex items-center gap-2 mb-6 md:mb-8 text-sm border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
            <Icon name="ph:arrow-left" size="16" />
            Volver al catálogo
        </NuxtLink>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <!-- MOBILE: Info antes de imagen -->
            <div class="flex flex-col gap-3 lg:hidden">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">{{ producto.tipo }}</span>
                    <span class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">Artesanal 100%</span>
                </div>
                <h1 class="text-3xl font-bold text-gray-900">{{ producto.nombre }}</h1>
                <p class="text-lg text-gray-600">Precio: <span class="text-3xl font-bold text-gray-900">${{ precioActual }} MXN</span></p>
                <p class="text-gray-600 leading-relaxed mt-2">{{ producto.descripcion }}</p>
            </div>

            <!-- COLUMNA IZQUIERDA: Imágenes -->
            <div class="flex flex-col gap-4">
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
                    v-if="imagenesActuales.length > 1"
                    class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                >
                    <button
                        v-for="(img, index) in imagenesActuales"
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
                            width="96" height="96" sizes="96px"
                            format="webp" quality="70" loading="lazy"
                            class="w-full h-full object-cover"
                        />
                    </button>
                </div>

                <p v-if="imagenesActuales.length > 1" class="text-xs text-gray-500 flex items-center gap-1.5">
                    <Icon name="ph:hand-tap" size="14" />
                    <span>Haz clic en cada miniatura para verla más grande</span>
                </p>
            </div>

            <!-- COLUMNA DERECHA: Info Desktop -->
            <div class="hidden lg:flex flex-col gap-6">
                <div class="space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">{{ producto.tipo }}</span>
                        <span class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">Artesanal 100%</span>
                    </div>
                    <h1 class="text-4xl font-bold text-gray-900">{{ producto.nombre }}</h1>
                </div>

                <div class="border-y border-gray-200 py-4">
                    <p class="text-lg text-gray-600">Precio: <span class="text-4xl font-bold text-gray-900">${{ precioActual }} MXN</span></p>
                </div>

                <p class="text-gray-600 leading-relaxed text-lg">{{ producto.descripcion }}</p>

                <!-- Selector Color -->
                <div v-if="coloresDisponibles.length > 0" class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Color:</label>
                    <div class="flex gap-3">
                        <button
                            v-for="color in coloresDisponibles"
                            :key="color"
                            @click="colorSeleccionado = color"
                            :style="colorSeleccionado === color && color === 'Café' 
                                ? { background: '#5A382F', borderColor: '#5A382F' } 
                                : {}"
                            :class="[
                                'px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all min-w-[100px] flex items-center justify-center gap-2',
                                colorSeleccionado === color
                                    ? `${obtenerColorBoton(color).bg} ${obtenerColorBoton(color).border} ${obtenerColorBoton(color).text} ring-2 ring-offset-2 ring-gray-900`
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                            ]"
                        >
                            <span 
                                v-if="color === 'Café'" class="w-4 h-4 rounded-full border-2 flex-shrink-0" :style="colorSeleccionado === 'Café' 
                                    ? { background: '#5A382F', borderColor: 'white' }
                                    : { background: '#5A382F', borderColor: '#5A382F' }"
                            ></span>
                            <span 
                                v-if="color === 'Negro'" 
                                class="w-4 h-4 rounded-full border-2 flex-shrink-0"
                                :style="colorSeleccionado === 'Negro'
                                    ? { background: '#111827', borderColor: 'white' }
                                    : { background: '#111827', borderColor: '#374151' }"
                            ></span>
                            {{ color }}
                        </button>
                    </div>
                </div>

                <!-- Selector Textura -->
                <div v-if="texturasDisponibles.length > 0" class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Textura: <span class="font-normal text-gray-600">{{ texturaSeleccionada }}</span></label>
                    <div class="flex gap-3">
                        <button
                            v-for="textura in texturasDisponibles"
                            :key="textura"
                            @click="texturaSeleccionada = textura"
                            :class="[
                                'px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all',
                                texturaSeleccionada === textura
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            ]"
                        >
                            {{ textura }}
                        </button>
                    </div>
                </div>

                <!-- Selector Tipo/Talla -->
                <div v-if="tiposDisponibles.length > 0" class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Talla: <span class="font-normal text-gray-600">{{ tipoSeleccionado }}</span></label>
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
                            <span :class="['block text-xs mt-1', tipoSeleccionado === tipo ? 'text-gray-300' : 'text-gray-500']">
                                {{ obtenerInfoTipo(tipo) }}
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Cantidad -->
                <div class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Cantidad</label>
                    <div class="flex items-center gap-4">
                        <button @click="decrementarCantidad" :disabled="cantidad <= 1"
                            class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            <Icon name="ph:minus" size="18" />
                        </button>
                        <input type="number" min="1" v-model.number="cantidad"
                            class="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-lg font-semibold" />
                        <button @click="incrementarCantidad"
                            class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors">
                            <Icon name="ph:plus" size="18" />
                        </button>
                    </div>
                </div>

                <!-- Botón carrito -->
                <button @click="añadirAlCarrito"
                    class="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl">
                    Añadir al carrito
                </button>
                <p v-if="productoAgregado" class="text-green-600 mt-2">✓ Producto agregado al carrito</p>

                <!-- Info adicional -->
                <div class="mt-6 space-y-4 pt-6 border-t border-gray-200">
                    <details v-if="producto.materiales" class="group">
                        <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                            <span>Materiales</span>
                            <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                        </summary>
                        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ producto.materiales }}</p>
                    </details>
                    <details v-if="producto.capacidad" class="group">
                        <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                            <span>Capacidad</span>
                            <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                        </summary>
                        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ producto.capacidad }}</p>
                    </details>
                    <details v-if="producto.dimensiones" class="group">
                        <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                            <span>Dimensiones</span>
                            <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                        </summary>
                        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ producto.dimensiones }}</p>
                    </details>
                </div>
            </div>

            <!-- MOBILE: Controles -->
            <div class="lg:hidden space-y-6 mt-4">
                <!-- Color Mobile -->
                <div v-if="coloresDisponibles.length > 0" class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Color:</label>
                    <div class="flex gap-3">
                        <button
                            v-for="color in coloresDisponibles"
                            :key="color"
                            @click="colorSeleccionado = color"
                            :style="colorSeleccionado === color && color === 'Café' 
                                ? { background: '#5A382F', borderColor: '#5A382F' } 
                                : {}"
                            :class="[
                                'px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all min-w-[100px] flex items-center justify-center gap-2',
                                colorSeleccionado === color
                                    ? `${obtenerColorBoton(color).bg} ${obtenerColorBoton(color).border} ${obtenerColorBoton(color).text} ring-2 ring-offset-2 ring-gray-900`
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                            ]"
                        >
                            <span 
                                v-if="color === 'Café'" class="w-4 h-4 rounded-full border-2 flex-shrink-0" :style="colorSeleccionado === 'Café' 
                                    ? { background: '#5A382F', borderColor: 'white' }
                                    : { background: '#5A382F', borderColor: '#5A382F' }"
                            ></span>
                            <span 
                                v-if="color === 'Negro'" 
                                class="w-4 h-4 rounded-full border-2 flex-shrink-0"
                                :style="colorSeleccionado === 'Negro'
                                    ? { background: '#111827', borderColor: 'white' }
                                    : { background: '#111827', borderColor: '#374151' }"
                            ></span>
                            {{ color }}
                        </button>
                    </div>
                </div>

                <!-- Textura Mobile -->
                <div v-if="texturasDisponibles.length > 0" class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Textura: <span class="font-normal text-gray-600">{{ texturaSeleccionada }}</span></label>
                    <div class="flex gap-3">
                        <button
                            v-for="textura in texturasDisponibles"
                            :key="textura"
                            @click="texturaSeleccionada = textura"
                            :class="[
                                'px-6 py-3 rounded-lg border-2 text-sm font-medium transition-all',
                                texturaSeleccionada === textura
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            ]"
                        >
                            {{ textura }}
                        </button>
                    </div>
                </div>

                <!-- Tipo Mobile -->
                <div v-if="tiposDisponibles.length > 0" class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Talla: <span class="font-normal text-gray-600">{{ tipoSeleccionado }}</span></label>
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
                            <span :class="['block text-xs mt-1', tipoSeleccionado === tipo ? 'text-gray-300' : 'text-gray-500']">
                                {{ obtenerInfoTipo(tipo) }}
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Cantidad Mobile -->
                <div class="space-y-3">
                    <label class="text-sm font-semibold text-gray-900">Cantidad</label>
                    <div class="flex items-center gap-4">
                        <button @click="decrementarCantidad" :disabled="cantidad <= 1"
                            class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                            <Icon name="ph:minus" size="18" />
                        </button>
                        <input type="number" min="1" v-model.number="cantidad"
                            class="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-lg font-semibold" />
                        <button @click="incrementarCantidad"
                            class="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors">
                            <Icon name="ph:plus" size="18" />
                        </button>
                    </div>
                </div>

                <button @click="añadirAlCarrito"
                    class="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg">
                    Añadir al carrito
                </button>

                <p v-if="productoAgregado" class="text-green-600">✓ Producto agregado al carrito</p>

                <!-- Info adicional Mobile -->
                <div class="space-y-4 pt-6 border-t border-gray-200">
                    <details v-if="producto.materiales" class="group">
                        <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900">
                            <span>Materiales</span>
                            <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                        </summary>
                        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ producto.materiales }}</p>
                    </details>
                    <details v-if="producto.capacidad" class="group">
                        <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900">
                            <span>Capacidad</span>
                            <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                        </summary>
                        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ producto.capacidad }}</p>
                    </details>
                    <details v-if="producto.dimensiones" class="group">
                        <summary class="flex items-center justify-between cursor-pointer py-2 text-sm font-semibold text-gray-900">
                            <span>Dimensiones</span>
                            <Icon name="ph:caret-down" size="20" class="transition-transform group-open:rotate-180" />
                        </summary>
                        <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ producto.dimensiones }}</p>
                    </details>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { scrollbar-width: none; }

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
input[type="number"] { -moz-appearance: textfield; appearance: textfield; }
</style>