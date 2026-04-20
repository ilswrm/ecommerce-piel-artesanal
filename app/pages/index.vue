<script setup>
import Catalogo from '~/components/catalogo.vue'
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
    title: 'Piel Artesanal | Catálogo',
})

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
        <section id="hero">
        </section>
        </header>
    <main>
        <Catalogo/>
        <section class="catalogo-preview">
            <!-- Izquierda: carrusel -->
            <div class="preview-izquierda">
                <img
                    v-for="(img, index) in imagenesCarrusel"
                    :key="index"
                    :src="img"
                    :class="['carrusel-img', { activa: index === imagenActiva }]"
                    alt="Piel Artesanal"
                />
            </div>

            <!-- Derecha: imagen fija con hover -->
            <NuxtLink to="/catalogo" class="preview-derecha">
                <img src="/catalogo-carrusel/catalogo-1.webp" alt="Ver Catálogo" />
                <div class="hover-overlay">
                    <span class="hover-texto">CATÁLOGO</span>
                </div>
            </NuxtLink>
        </section>
    </main>

    </div>
</template>

<style scoped>
#hero{
    width: 100%;
    min-height: 80vh;
    background-image: url('~/assets/images/piel-artesanal-hero-1.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #000;
    padding: 0;
}

.catalogo-preview {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 0;
    padding: 0.5rem;
}

.preview-izquierda {
    display: none;
    position: relative;
    aspect-ratio: 3 / 4;
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

.carrusel-img.activa {
    opacity: 1;
}

.preview-derecha {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    display: block;
    cursor: pointer;
    max-height: 70vh;
}

.preview-derecha img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.preview-derecha:hover img {
    transform: scale(1.03);
}

.hover-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
}

.preview-derecha:hover .hover-overlay {
    background: rgba(0, 0, 0, 0.45);
}

.hover-texto {
    color: #fff;
    font-family: var(--font-main);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 4px;
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
}

@media (min-width: 540px) {
    .catalogo-preview {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding: 1.5rem;
    }

    .preview-izquierda {
        display: block;
        max-height: 70vh;
    }
}

@media (min-width: 1024px) {
    .catalogo-preview {
        padding: 2.4rem;
        max-width: 1400px;
        margin: 0 auto;
    }
}

</style>