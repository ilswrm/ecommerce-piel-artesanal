<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import productos from '@/assets/data/products'

useHead({
    title: 'Piel Artesanal | Catálogo',
})

// ─── PRODUCTOS DESTACADOS ─────────────────────────────────────────────────
const idsPrimeros8 = [23, 24, 19, 20, 14, 5, 18, 17]
const idsUltimos4  = [1, 10, 25, 16]

const primeros8 = computed(() => idsPrimeros8.map(id => productos.find(p => p.id === id)).filter(Boolean))
const ultimos4  = computed(() => idsUltimos4.map(id => productos.find(p => p.id === id)).filter(Boolean))

// ─── CARRUSEL ─────────────────────────────────────────────────────────────
const imagenesCarrusel = [
    'catalogo-carrusel/catalogo-2.webp',
    'catalogo-carrusel/catalogo-3.webp',
    'catalogo-carrusel/catalogo-4.webp',
]
const imagenActiva = ref(0)
let intervalo
onMounted(() => {
    intervalo = setInterval(() => {
        imagenActiva.value = (imagenActiva.value + 1) % imagenesCarrusel.length
    }, 2500)
})
onUnmounted(() => clearInterval(intervalo))
</script>

<template>
    <div>
        <header>
            <section id="hero"></section>
        </header>

        <main>
            <!-- ─── MÁS VENDIDOS (primeros 8) ─────────────────────────── -->
            <section id="catalogo" class="catalogo seccion-catalogo py-12">
                <div class="flex flex-col items-center mb-8">
                    <h3>MÁS VENDIDOS</h3>
                    <h2 class="title mb-4">Productos destacados</h2>
                    <div class="w-16 h-1 bg-black mb-4"></div>
                    <p class="text-center max-w-lg mx-auto">Cada pieza es fabricada individualmente a mano con piel premium de Jalisco. Los detalles y colores pueden variar entre cada pieza como resultado de su proceso de manufactura, lo que la hace única.</p>
                </div>
                <div class="grid-productos grid-4">
                    <article v-for="producto in primeros8" :key="producto.id" class="producto">
                        <NuxtImg :src="producto.imgs[0]" :alt="producto.nombre" width="223" height="298" sizes="223px" format="webp" quality="70" loading="lazy" class="producto-img"/>
                        <div class="contenido">
                            <h3 class="tipo-producto">{{ producto.tipo.toUpperCase() }}</h3>
                            <h2 class="product-title">{{ producto.nombre }}</h2>
                            <p class="descripcion-producto">{{ producto.descripcion }}</p>
                            <div class="producto-footer">
                                <p class="precio-label">Precio: <span class="precio-monto">${{ producto.variantes[0]?.precio || "N/A" }} MXN</span></p>
                                <p class="colores-label">Colores: <span class="colores-lista">{{ [...new Set(producto.variantes.map(v => v.color).filter(Boolean))].join(', ') }}</span></p>
                                <NuxtLink :to="`/products/${producto.slug}`">
                                    <button class="btn-detalles">Ver Detalles y Comprar</button>
                                </NuxtLink>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <!-- ─── SECCIÓN CARRUSEL + HOVER CATÁLOGO ─────────────────── -->
            <section class="catalogo-preview">
                <div class="preview-izquierda">
                    <img
                        v-for="(img, index) in imagenesCarrusel"
                        :key="index"
                        :src="img"
                        :class="['carrusel-img', { activa: index === imagenActiva }]"
                        alt="Piel Artesanal"
                    />
                </div>
                <NuxtLink to="/catalogo" class="preview-derecha">
                    <img src="/catalogo-carrusel/catalogo-1.webp" alt="Ver Catálogo" />
                    <div class="hover-overlay">
                        <span class="hover-texto">CATÁLOGO</span>
                    </div>
                </NuxtLink>
            </section>

            <!-- ─── ÚLTIMOS 4 ──────────────────────────────────────────── -->
            <section class="catalogo seccion-catalogo py-12">
                <div class="grid-productos grid-4 mt-8 ">
                    <article v-for="producto in ultimos4" :key="producto.id" class="producto">
                        <NuxtImg :src="producto.imgs[0]" :alt="producto.nombre" width="223" height="298" sizes="223px" format="webp" quality="70" loading="lazy" class="producto-img"/>
                        <div class="contenido">
                            <h3 class="tipo-producto">{{ producto.tipo.toUpperCase() }}</h3>
                            <h2 class="product-title">{{ producto.nombre }}</h2>
                            <p class="descripcion-producto">{{ producto.descripcion }}</p>
                            <div class="producto-footer">
                                <p class="precio-label">Precio: <span class="precio-monto">${{ producto.variantes[0]?.precio || "N/A" }} MXN</span></p>
                                <p class="colores-label">Colores: <span class="colores-lista">{{ [...new Set(producto.variantes.map(v => v.color).filter(Boolean))].join(', ') }}</span></p>
                                <NuxtLink :to="`/products/${producto.slug}`">
                                    <button class="btn-detalles">Ver Detalles y Comprar</button>
                                </NuxtLink>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

        </main>
    </div>
</template>

<style scoped>
#hero {
    width: 100%;
    min-height: 80vh;
    background-image: url('~/assets/images/piel-artesanal-hero-1.webp');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #000;
    padding: 0;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

#catalogo.seccion-catalogo {
    padding-left: 1rem;
    padding-right: 1rem;
}

section.seccion-catalogo {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}

@media (max-width: 540px) {
    #hero {
        min-height: 50vh;
        background-size: cover;
    }
}

/* Grid productos */
.grid-productos {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
    width: 100%;
    margin: 0 auto;
}

.grid-4 {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    width: 100%;
}
@media (min-width: 563px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 960px) {
    .grid-4 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1500px) {
    .grid-4 { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
}

/* Cards */
.producto {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border: 1px solid #f0f0f0;
}

.producto-img { 
    width: 100%; 
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: cover;  
}

.contenido {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.tipo-producto {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: #666;
    margin-bottom: 0.5rem;
}

.product-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
}

.descripcion-producto {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.producto-footer {
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #f0f0f0;
}

.precio-label { font-size: 0.85rem; color: #666; margin-bottom: 0.5rem; }
.precio-monto { font-size: 1.5rem; font-weight: 700; color: #1a1a1a; }
.colores-label { font-size: 0.85rem; color: #666; margin-bottom: 1rem; }
.colores-lista { color: #1a1a1a; }

.btn-detalles {
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

.btn-detalles:hover {
    background-color: #f3f4f6;
    color: #111827;
}

/* ─── SECCIÓN CARRUSEL + HOVER CATÁLOGO ─────────────────── */

.catalogo-preview {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem 1.5rem;

    max-width: 1100px;
    margin: 0 auto;
}

/* IZQUIERDA (carrusel) */
.preview-izquierda {
    display: none;
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: 65vh;
    overflow: hidden;
}

/* IMÁGENES CARRUSEL */
.carrusel-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    opacity: 0;
    transition: opacity 0.8s ease;
}

.carrusel-img.activa {
    opacity: 1;
}

/* DERECHA (imagen catálogo) */
.preview-derecha {
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: 65vh;
    overflow: hidden;
    display: block;
    cursor: pointer;
}

/* IMAGEN */
.preview-derecha img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: transform 0.7s ease;
}

.preview-derecha:hover img {
    transform: scale(1.04);
}

/* OVERLAY */
.hover-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(2px);

    transition: background 0.3s ease;
}

.preview-derecha:hover .hover-overlay {
    background: rgba(0, 0, 0, 0.35);
}

/* TEXTO */
.hover-texto {
    color: #fff;
    font-family: var(--font-main);
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 6px;
    text-transform: uppercase;

    border-bottom: 1px solid rgba(255,255,255,0.6);
    padding-bottom: 6px;

    opacity: 0.9;
}

/* ─── RESPONSIVE ───────────────────────────────────────── */

@media (min-width: 540px) {
    .catalogo-preview {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .preview-izquierda {
        display: block;
    }
}

@media (min-width: 1024px) {
    .catalogo-preview {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        padding: 2rem 0;
    }
}
</style>