<script setup lang="ts">
import { ref, computed } from 'vue'
import productos from '@/assets/data/products'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

useHead({
    title: 'Piel Artesanal | Catálogo',
})

// ─── BUSCADOR ─────────────────────────────────────────────────────────────
const busqueda = ref('')

const productosFiltrados = computed(() => {
    if (!busqueda.value.trim()) return productos
    const q = busqueda.value.toLowerCase()
    return productos.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.tipo.toLowerCase().includes(q)
    )
})

// ─── SELECCIÓN REACTIVA POR PRODUCTO ──────────────────────────────────────
const seleccion = ref<Record<number, { color: string, textura: string }>>(
    Object.fromEntries(productos.map(p => [p.id, { color: 'Negro', textura: 'Texturizada' }]))
)

const getSeleccion = (id: number) => seleccion.value[id] ?? { color: 'Negro', textura: 'Texturizada' }

const imagenActual = (producto: any) => {
    const { color, textura } = getSeleccion(producto.id)
    const key = `${color.toLowerCase()}-${textura.toLowerCase()}` as keyof typeof producto.imgs
    return producto.imgs[key]?.[0]
        ?? producto.imgs['negro-texturizada']?.[0]
        ?? producto.imgs['negro-lisa']?.[0]
        ?? ''
}

const precioActual = (producto: any) => {
    const { color, textura } = getSeleccion(producto.id)
    const variante = producto.variantes.find((v: any) =>
        v.color === color && v.textura === textura
    )
    return variante?.precio ?? producto.variantes[0]?.precio ?? 0
}

const linkProducto = (producto: any) => {
    const { color, textura } = getSeleccion(producto.id)
    return `/products/${producto.slug}?color=${encodeURIComponent(color)}&textura=${encodeURIComponent(textura)}`
}
const setColor = (id: number, color: string) => {
    if (seleccion.value[id]) seleccion.value[id].color = color
}

const setTextura = (id: number, textura: string) => {
    if (seleccion.value[id]) seleccion.value[id].textura = textura
}
</script>

<template>
    <section class="catalogo-page">

        <!-- ─── ENCABEZADO ──────────────────────────────────────────────── -->
        <div class="page-header">
            <h1 class="page-titulo">Catálogo</h1>
            <div class="header-top">
                <p class="header-desc">Cada pieza es fabricada individualmente a mano con piel premium de Jalisco.</p>
                <div class="buscador-input-wrap">
                    <PhMagnifyingGlass :size="18" class="buscador-icon" />
                    <input
                        v-model="busqueda"
                        type="text"
                        placeholder="Buscar producto o tipo..."
                        class="buscador"
                    />
                    <span v-if="busqueda" class="resultados-count">
                        {{ productosFiltrados.length }} resultado{{ productosFiltrados.length !== 1 ? 's' : '' }}
                    </span>
                </div>
            </div>
        </div>

        <!-- ─── GRID ────────────────────────────────────────────────────── -->
        <div class="grid-catalogo">
            <article
                v-for="producto in productosFiltrados"
                :key="producto.id"
                class="card"
            >
                <!-- Imagen reactiva -->
                <div class="card-img-wrap">
                    <NuxtImg
                        :src="imagenActual(producto)"
                        :alt="producto.nombre"
                        width="400"
                        height="400"
                        format="webp"
                        quality="75"
                        loading="lazy"
                        class="card-img"
                    />
                </div>

                <!-- Contenido -->
                <div class="card-body">
                    <h3 class="card-tipo">{{ producto.tipo.toUpperCase() }}</h3>
                    <h2 class="card-nombre">{{ producto.nombre }}</h2>
                    <p class="card-desc">{{ producto.descripcion }}</p>

                    <!-- Selectores -->
                    <div class="selectores">
                        <!-- Color -->
                        <div class="selector-grupo">
                            <span class="selector-label">Color</span>
                            <div class="bolitas">
                                <button
                                    v-for="color in [...new Set(producto.variantes.map((v: any) => v.color).filter(Boolean))]"
                                    :key="color"
                                    @click="setColor(producto.id, color)"
                                    :title="color"
                                    :class="[
                                        'bolita',
                                        color === 'Negro' ? 'bolita-negro' : 'bolita-cafe',
                                        getSeleccion(producto.id).color === color ? 'bolita-activa' : ''
                                    ]"
                                />
                            </div>
                            <span class="selector-valor">{{ getSeleccion(producto.id).color }}</span>
                        </div>

                        <!-- Textura -->
                        <div class="selector-grupo">
                            <span class="selector-label">Textura</span>
                            <div class="bolitas">
                                <button
                                    v-for="textura in [...new Set(producto.variantes.map((v: any) => v.textura).filter(Boolean))]"
                                    :key="textura"
                                    @click="setTextura(producto.id, textura)"
                                    :title="textura"
                                    :class="[
                                        'bolita-textura',
                                        getSeleccion(producto.id).textura === textura ? 'bolita-textura-activa' : ''
                                    ]"
                                >
                                    {{ textura === 'Lisa' ? 'L' : 'T' }}
                                </button>
                            </div>
                            <span class="selector-valor">{{ getSeleccion(producto.id).textura }}</span>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="card-footer">
                        <p class="card-precio">${{ precioActual(producto) }} <span class="card-moneda">MXN</span></p>
                        <NuxtLink :to="linkProducto(producto)">
                            <button class="btn-comprar">Ver Detalles y Comprar</button>
                        </NuxtLink>
                    </div>
                </div>
            </article>

            <!-- Sin resultados -->
            <div v-if="productosFiltrados.length === 0" class="sin-resultados">
                <p>No se encontraron productos para "<strong>{{ busqueda }}</strong>"</p>
                <button @click="busqueda = ''" class="btn-limpiar">Ver todos los productos</button>
            </div>
        </div>

        <p class="catalogo-nota">
            Cada pieza se fabrica individualmente a mano. Los detalles y colores pueden variar entre cada pieza como resultado de su proceso artesanal.
        </p>
    </section>
</template>

<style scoped>
.catalogo-page {
    padding-top: 1.5rem;
}

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
.page-header {
    padding: var(--space-lg) var(--space-lg) 0;
    max-width: 1100px;
    margin: 0 auto 2rem auto;
}

.page-titulo {
    font-family: var(--font-title);
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
}

.header-top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.header-desc {
    font-size: 0.9rem;
    color: #888;
    flex: 1;
}

.buscador-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
}

.buscador-input-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 9999px;
    padding: 0.75rem 1.25rem;
    transition: border-color 0.2s;
    background: white;
    
}
.buscador-input-wrap:focus-within {
    border-color: #111827;
}

.buscador-icon {
    color: #999;
    flex-shrink: 0;
}

.buscador {
    flex: 1;
    max-width: 300px;
    width: 100%; 
    border: none;
    outline: none;
    font-size: 0.9rem;
    font-family: var(--font-main);
    background: transparent;
    min-width: 0;
}

.buscador:focus {
    border-color: #111827;
}

.resultados-count {
    font-size: 0.8rem;
    color: #888;
    padding-left: 0.5rem;
}

@media (min-width: 768px) {


    .header-top {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .buscador-input-wrap {
        flex: 1;
        max-width: 450px;
    }
    .header-desc {
        flex: 1;
        padding-right: 2rem;
    }
}


/* ─── GRID ───────────────────────────────────────────────────────────────── */
.grid-catalogo {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    width: 100%;
    padding: 0 1.5rem;
}

@media (min-width: 563px) {
    .grid-catalogo { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 960px) {
    .grid-catalogo { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1500px) {
    .grid-catalogo { grid-template-columns: repeat(4, 1fr); }
}

/* ─── CARD ───────────────────────────────────────────────────────────────── */
.card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #f0f0f0;
    transition: box-shadow 0.2s;
}

.card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.card-img-wrap {
    overflow: hidden;
}

.card-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.card:hover .card-img {
    transform: scale(1.03);
}

.card-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.card-tipo {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: #999;
    margin-bottom: 0.4rem;
}

.card-nombre {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
}

.card-desc {
    color: #777;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* ─── SELECTORES ─────────────────────────────────────────────────────────── */
.selectores {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.selector-grupo {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.selector-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: #999;
    text-transform: uppercase;
}

.selector-valor {
    font-size: 0.75rem;
    color: #555;
}

.bolitas {
    display: flex;
    gap: 0.4rem;
}

.bolita {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
}

.bolita-negro { background: #1a1a1a; }
.bolita-cafe  { background: #5A382F; }

.bolita-activa {
    border-color: #1a1a1a;
    outline: 2px solid #1a1a1a;
    outline-offset: 2px;
}

.bolita-textura {
    width: 28px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid #e5e7eb;
    background: white;
    cursor: pointer;
    font-size: 0.65rem;
    font-weight: 700;
    color: #555;
    transition: all 0.2s;
}

.bolita-textura-activa {
    border-color: #1a1a1a;
    background: #1a1a1a;
    color: white;
}

/* ─── FOOTER CARD ────────────────────────────────────────────────────────── */
.card-footer {
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #f0f0f0;
}

.card-precio {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
}

.card-moneda {
    font-size: 0.85rem;
    font-weight: 400;
    color: #888;
}

.btn-comprar {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #111827;
    color: #ffffff;
    border: 1px solid #111827;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.btn-comprar:hover {
    background-color: #f3f4f6;
    color: #111827;
}

/* ─── SIN RESULTADOS ─────────────────────────────────────────────────────── */
.sin-resultados {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 0;
    color: #666;
}

.btn-limpiar {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    border: 1px solid #111827;
    border-radius: 9999px;
    background: white;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
}

.btn-limpiar:hover {
    background: #111827;
    color: white;
}

/* ─── NOTA ───────────────────────────────────────────────────────────────── */
.catalogo-nota {
    margin-top: 4rem;
    text-align: center;
    font-size: 0.75rem;
    color: #aaa;
    padding: 0 1.5rem;
}
</style>