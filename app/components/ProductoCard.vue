<script setup lang="ts">
const props = defineProps<{
    producto: any
}>()

const seleccion = ref({ color: 'Negro', textura: 'Texturizada' })

const imagenActual = computed(() => {
    const key = `${seleccion.value.color.toLowerCase()}-${seleccion.value.textura.toLowerCase()}`
    return props.producto.imgs[key]?.[0]
        ?? props.producto.imgs['negro-texturizada']?.[0]
        ?? props.producto.imgs['negro-lisa']?.[0]
        ?? ''
})

const precioActual = computed(() => {
    const variante = props.producto.variantes.find((v: any) =>
        v.color === seleccion.value.color && v.textura === seleccion.value.textura
    )
    return variante?.precio ?? props.producto.variantes[0]?.precio ?? 0
})

const linkProducto = computed(() => {
    const { color, textura } = seleccion.value
    return `/products/${props.producto.slug}?color=${encodeURIComponent(color)}&textura=${encodeURIComponent(textura)}`
})

const colores = computed(() => [...new Set(props.producto.variantes.map((v: any) => v.color).filter(Boolean))] as string[])
const texturas = computed(() => [...new Set(props.producto.variantes.map((v: any) => v.textura).filter(Boolean))] as string[])
</script>

<template>
    <article class="producto">
        <div class="producto-img-wrap">
            <NuxtLink :to="linkProducto">
            <NuxtImg
                :src="imagenActual"
                :alt="producto.nombre"
                width="400" height="400"
                format="webp" quality="70" loading="lazy"
                class="producto-img"
            />
            </NuxtLink>
        </div>
        <div class="contenido">
            <h3 class="tipo-producto">{{ producto.tipo.toUpperCase() }}</h3>
            <h2 class="product-title">{{ producto.nombre }}</h2>
            <p class="descripcion-producto">{{ producto.descripcion }}</p>

            <div class="selectores">
                <!-- Color -->
                <div class="selector-grupo">
                    <span class="selector-label">Color</span>
                    <div class="bolitas">
                        <button
                            v-for="color in colores"
                            :key="color"
                            @click="seleccion.color = color"
                            :title="color"
                            :class="['bolita', color === 'Negro' ? 'bolita-negro' : 'bolita-cafe', seleccion.color === color ? 'bolita-activa' : '']"
                        />
                    </div>
                    <span class="selector-valor">{{ seleccion.color }}</span>
                </div>

                <!-- Textura -->
                <div class="selector-grupo">
                    <span class="selector-label">Tipo de piel</span>
                    <div class="bolitas">
                        <button
                            v-for="textura in texturas"
                            :key="textura"
                            @click="seleccion.textura = textura"
                            :title="textura"
                            :class="['bolita-textura', seleccion.textura === textura ? 'bolita-textura-activa' : '']"
                        >
                                <!-- Lisa: círculo sólido -->
                                <svg v-if="textura === 'Lisa'" width="14" height="14" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" 
                                        :fill="seleccion.textura === 'Lisa' ? 'white' : '#aaaaaa'"
                                    />
                                </svg>

                                <!-- Texturizada: líneas diagonales -->
                                <svg v-else width="14" height="14" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" 
                                        :fill="seleccion.textura === 'Texturizada' ? '#1a1a1a' : '#aaaaaa'"
                                    />
                                    <line x1="4" y1="8" x2="8" y2="4" stroke="white" stroke-width="1.5" opacity="0.9"/>
                                    <line x1="4" y1="13" x2="13" y2="4" stroke="white" stroke-width="1.5" opacity="0.9"/>
                                    <line x1="7" y1="16" x2="16" y2="7" stroke="white" stroke-width="1.5" opacity="0.9"/>
                                    <line x1="12" y1="16" x2="16" y2="12" stroke="white" stroke-width="1.5" opacity="0.9"/>
                                </svg>
                        </button>
                    </div>
                    <span class="selector-valor">{{ seleccion.textura }}</span>
                </div>
            </div>

            <div class="producto-footer">
                <p class="precio-label">Precio: <span class="precio-monto">${{ precioActual }} MXN</span></p>
                <NuxtLink :to="linkProducto">
                    <button class="btn-detalles">Ver Detalles y Comprar</button>
                </NuxtLink>
            </div>
        </div>
    </article>
</template>

<style scoped>
.producto {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #f0f0f0;
    transition: box-shadow 0.2s;
}

.producto:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
.producto-img-wrap { overflow: hidden; }

.producto-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.producto:hover .producto-img { transform: scale(1.03); }

.contenido {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.tipo-producto {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: #999;
    margin-bottom: 0.4rem;
}

.product-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
}

.descripcion-producto {
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

.selectores { display: flex; gap: 1.5rem; margin-bottom: 1rem; }
.selector-grupo { display: flex; flex-direction: column; gap: 0.3rem; }
.selector-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 1px; color: #999; text-transform: uppercase; }
.selector-valor { font-size: 0.75rem; color: #555; }
.bolitas { display: flex; gap: 0.4rem; }

/* ─── BOLITAS COLOR ──────────────────────────────────────────────────────── */
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
.bolita-activa { outline: 2px solid #1a1a1a; outline-offset: 2px; }

/* ─── BOLITAS TEXTURA ────────────────────────────────────────────────────── */
.bolita-textura {
    width: 23px;
    height: 23px;
    border-radius: 6px;
    border: 2px solid #e5e7eb;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    transition: all 0.2s;
}

.bolita-textura-activa {
    border-color: #1a1a1a;
    background: #1a1a1a;
    color: white;
}

/* ─── FOOTER CARD ────────────────────────────────────────────────────────── */
.producto-footer { margin-top: auto; padding-top: 0.75rem; border-top: 1px solid #f0f0f0; }
.precio-label { font-size: 0.85rem; color: #666; margin-bottom: 0.5rem; }
.precio-monto { font-size: 1.4rem; font-weight: 700; color: #1a1a1a; }

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

.btn-detalles:hover { background-color: #f3f4f6; color: #111827; }
</style>