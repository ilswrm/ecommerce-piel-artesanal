
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
                    <!-- NAV DESKTOP -->
                    <nav class="hidden lg:flex items-center gap-6">
                    <NuxtLink to="/#catalogo" class="font-medium relative pb-1 group">
                        Productos
                        <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </NuxtLink>
                    <NuxtLink to="/#why-us" class="font-medium relative pb-1 group">
                        Nosotros
                        <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </NuxtLink>
                    <NuxtLink to="/#contacto" class="font-medium relative pb-1 group">
                        Contacto
                        <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </NuxtLink>
                </nav>
                <NuxtLink to="/carrito" class="relative">
                    <UButton icon="i-heroicons-shopping-bag" variant="ghost" color="neutral" aria-label="Carrito"/>
                    <!-- contador del carrito-->
                    <span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1.5 pointer-events-none">
                        {{ totalItems > 99 ? '99+' : totalItems }}
                    </span>
                </NuxtLink>
                </div>
            </template> 
            <!-- MENU MOBILE -->
            <template #body>
                <div class="relative">
                    <nav class="flex flex-col gap-4 py-6 tracking-wider text-lg">
                        <NuxtLink to="#catalogo" class="font-medium relative pb-1.5">
                            Productos
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
                        <NuxtLink to="#why-us" class="font-medium relative pb-1.5">
                            Nosotros
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
                        <NuxtLink to="#contacto" class="font-medium relative pb-1.5">
                            Contacto
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
    
                    </nav>

                </div>
            </template>
        </UHeader>
    
    <NuxtPage />
    </UApp>
</template>