<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import productos from '@/assets/data/products'

useHead({
    title: 'Piel Artesanal | Inicio',
})

const idsPrimeros8 = [23, 24, 19, 20, 14, 5, 18, 17]
const idsUltimos4  = [1, 10, 25, 16]

const primeros8 = computed(() => idsPrimeros8.map(id => productos.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => p !== undefined))
const ultimos4  = computed(() => idsUltimos4.map(id => productos.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => p !== undefined))

// ─── CARRUSEL ─────────────────────────────────────────────────────────────
const imagenesCarrusel = [
    'catalogo-carrusel/catalogo-2.webp',
    'catalogo-carrusel/catalogo-3.webp',
    'catalogo-carrusel/catalogo-4.webp',
]
const imagenActiva = ref(0)
let intervalo: ReturnType<typeof setInterval> | null = null

onMounted(() => {
    intervalo = setInterval(() => {
        imagenActiva.value = (imagenActiva.value + 1) % imagenesCarrusel.length
    }, 2500)
})

onUnmounted(() => {
    if (intervalo) clearInterval(intervalo)
})
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
                    <ProductoCard
                        v-for="producto in primeros8"
                        :key="producto.id"
                        :producto="producto"
                    />
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
                <div class="grid-productos grid-4 mt-8">
                    <ProductoCard
                        v-for="producto in ultimos4"
                        :key="producto.id"
                        :producto="producto"
                    />
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

.catalogo-preview {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
}

.preview-izquierda {
    display: none;
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: 65vh;
    overflow: hidden;
}

.carrusel-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.8s ease;
}

.carrusel-img.activa { opacity: 1; }

.preview-derecha {
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: 65vh;
    overflow: hidden;
    display: block;
    cursor: pointer;
}

.preview-derecha img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
}

.preview-derecha:hover img { transform: scale(1.04); }

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

.preview-derecha:hover .hover-overlay { background: rgba(0, 0, 0, 0.35); }

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

@media (min-width: 540px) {
    .catalogo-preview {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .preview-izquierda { display: block; }
}

@media (min-width: 1024px) {
    .catalogo-preview {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        padding: 2rem 0;
    }
}
</style>