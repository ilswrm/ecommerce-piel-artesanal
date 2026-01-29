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
                        <h3>{{ producto.tipo.toUpperCase() }}</h3>
                        <h2 id="product-title">{{ producto.nombre }}</h2>
                        <p class="precio text-2xl font-bold mb-2">
                            <!--Toma el precio de la primera variante y si no existe muestra su no disponibilidad -->
                            <span class="rounded px-1 py-0.5" style="background-color: #A3A09F;">${{ producto.variantes[0]?.precio || "Precio no disponible" }}</span>
                        </p>
                        <p class="line-clamp-4 leading-6">{{ producto.descripcion }}</p>
                        <NuxtLink :to="`/products/${producto.slug}`">
                            <button>Ver detalles y comprar</button>
                        </NuxtLink>
                    </div>
                </article>
            </div>
            <p class="mt-20 text-center max-w-x-lg mx-auto text-gray-700 relative before:block before:w-full before:h-0.25 before:bg-black before:mb-2 before:content-['']">    
                Cada pieza se fabrica individualmente a mano con materiales de alta calidad y durabilidad. Los detalles y colores pueden variar entre cada pieza como resultado de su proceso de manufactura, lo que la hace única.</p>
    </section>
</template>

<style>
.grid-productos{
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.producto {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.producto img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.contenido {
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.contenido h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.contenido p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5rem;
    margin: 0;
}

.contenido p.precio {
    margin-bottom: 0.5rem; 
}

.contenido button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #111827; 
    color: #ffffff;
    border: 1px solid #111827;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.contenido button:hover {
    background-color: #f3f4f6;
    color: #111827;
}

#product-title{
    font-size: 1.6rem;
}


</style>