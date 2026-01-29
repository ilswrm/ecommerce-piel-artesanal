
<script setup lang="ts">
const { totalItems, recargarCarrito } = useCarrito()

// Cargar carrito cuando el layout se monta
onMounted(() => {
    recargarCarrito()
})

</script>
<template>
    <UApp>
        <UHeader>
            <template #title>
                <ULink to="/" nuxt class="site-title">PielArtesanal</ULink>
            </template>

            <template #right>
                <div class="flex items-center gap-2">
                    <nav class="hidden lg:flex items-center gap-6">
                    <NuxtLink to="/#catalogo">Productos</NuxtLink>
                    <NuxtLink to="/#why-us">Nosotros</NuxtLink>
                    <NuxtLink to="/#contacto">Contacto</NuxtLink>
                </nav>
                <NuxtLink to="/carrito" class="relative">
                    <UButton icon="i-heroicons-shopping-bag" variant="ghost" color="neutral" aria-label="Carrito"/>
                    <!-- Badge contador -->
                    <span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1.5 pointer-events-none">
                        {{ totalItems > 99 ? '99+' : totalItems }}
                    </span>
                </NuxtLink>
                </div>
            </template> 
            <template #body>
                <div class="relative">
                    <nav class="flex flex-col gap-4 py-6 tracking-wider text-lg">
                        <NuxtLink to="#catalogo">Productos</NuxtLink>
                        <NuxtLink to="#why-us">Nosotros</NuxtLink>
                        <NuxtLink to="#contacto">Contacto</NuxtLink>
                            <!-- Carrito en menú móvil -->
                        <NuxtLink to="/carrito" class="flex items-center gap-2">
                            Carrito
                            <span v-if="totalItems > 0" class="bg-gray-900 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1.5">
                                {{ totalItems }}
                            </span>
                        </NuxtLink>
                    </nav>
                    <div class="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
                </div>
                    
                

            </template>
        </UHeader>
    
    <NuxtPage />
    </UApp>
</template>