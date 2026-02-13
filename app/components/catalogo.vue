<script setup lang="ts">
// Importa el products.ts a este archivo
import productos from '@/assets/data/products'

</script>

<template>
    <section id="catalogo" class="catalogo px-4 py-8">
        <div class="flex flex-col items-center mb-8">
            <h3>NUESTRA COLECCIÓN</h3>
            <h2 class="title mb-4">Productos destacados</h2>
            <div class="w-16 h-1 bg-black mb-4"></div>
            <p class="text-center max-w-lg mx-auto">Cada pieza es fabricada individualmente a mano con piel premium de Jalisco. Los detalles y colores pueden variar entre cada pieza como resultado de su proceso de manufactura, lo que la hace única.</p>

        </div>
            <div class="grid-productos">
                <!--Por cada producto del catálogo renderiza un artículo-->
                <article v-for="producto in productos" :key="producto.id" class="producto">
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
            <p class="mt-20 text-center max-w-x-lg mx-auto text-xs text-gray-500 opacity-60 relative before:block before:w-full before:h-0.25 before:bg-black before:mb-2 before:content-['']">    
                Cada pieza se fabrica individualmente a mano con materiales de alta calidad y durabilidad. Los detalles y colores pueden variar entre cada pieza como resultado de su proceso de manufactura, lo que la hace única.</p>
    </section>
</template>

<style>

.grid-productos {
    display: grid;
    gap: 1.5rem;
    /* Mobile: 1 columna por defecto */
    grid-template-columns: 1fr;
    max-width: 1200px;
    margin: 0 auto;
}

/* Tablet (md: 768px+): 2 columnas */
@media (min-width: 768px) {
    .grid-productos {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop (lg: 1024px+): exactamente 3 columnas máximo */
@media (min-width: 1024px) {
    .grid-productos {
        grid-template-columns: repeat(3, 1fr);
    }
}

.producto {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border: 1px solid #f0f0f0;
}

.producto img {
    width: 100%;
    height: 280px;
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
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #666;
    margin-bottom: 0.5rem;
}

.product-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
    line-height: 1.3;
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

.precio-label {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.precio-monto {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
}

.colores-label {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1rem;
}

.colores-label strong,
.colores-lista {
    color: #1a1a1a;
}

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
    text-align: center;
}

.btn-detalles:hover {
    background-color: #f3f4f6;
    color: #111827;
}
</style>