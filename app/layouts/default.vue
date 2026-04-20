
<script setup lang="ts">
const { totalItems, recargarCarrito } = useCarrito()

onMounted(() => {
    recargarCarrito()
})
</script>

<template>
    <UApp>
        <UHeader class="h-24">
            <template #title>
                <ULink to="/" nuxt>
            <img src="/assets/images/logo-jm.png" alt="JM Taller" class="h-16 w-auto" />
        </ULink>
            </template>

            <template #right>
                <div class="flex items-end gap-4">
                    <!-- NAV DESKTOP -->
                    <nav class="hidden lg:flex items-center gap-6">
                        <NuxtLink to="/" class="font-medium relative pb-1 group">
                            Home
                            <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </NuxtLink>
                        <NuxtLink to="/catalogo" class="font-medium relative pb-1 group">
                            Catálogo
                            <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </NuxtLink>
                        <NuxtLink to="/nosotros" class="font-medium relative pb-1 group">
                            Nosotros
                            <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </NuxtLink>
                        <NuxtLink to="/faqs" class="font-medium relative pb-1 group">
                            FAQ's
                            <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </NuxtLink>
                        <NuxtLink to="/contacto" class="font-medium relative group nav-contacto ml-6">
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
                        <NuxtLink to="/" class="font-medium relative pb-1.5">
                            Home
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
                        <NuxtLink to="/catalogo" class="font-medium relative pb-1.5">
                            Catálogo
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
                        <NuxtLink to="/nosotros" class="font-medium relative pb-1.5">
                            Nosotros
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
                        <NuxtLink to="/faqs" class="font-medium relative pb-1.5">
                            FAQ's
                            <span class="absolute bottom-0 left-0 h-[1px] w-full bg-black"></span>
                        </NuxtLink>
                        <div class="mt-2"></div>
                        <NuxtLink to="/contacto" class="font-medium relative pb-1 group nav-contacto ml-6">
                            Contacto
                            <span class="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </NuxtLink>
                    </nav>

                </div>
            </template>
        </UHeader>
    
    <NuxtPage />
    <footer class="footer">
        <div class="footer-copyright">
            <p>© 2026 Catálogo de Piel Artesanal. Productos 100% hechos a mano en México. Todos los derechos reservados.</p>
            <p class="footer-copyright-sub">Piel premium curtida artesanalmente en Jalisco, incentivando el comercio local.</p>
        </div>
    </footer>
    </UApp>
</template>
<style>
nav a.router-link-active span {
    width: 100%;
}
.nav-contacto {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 1rem;
    border-radius: 9999px;
    border: 1px solid #1a1a1a;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-contacto:hover {
    background-color: #1a1a1a;
    color: #ffffff;
}

.nav-contacto span {
    display: none;
    bottom: -4px;
}
.footer {
    background-color: #111111;
    color: #ffffff;
    padding: 2rem 1.5rem;
}

.footer-copyright {
    text-align: center;
}

.footer-copyright p {
    font-size: 0.7rem;
    color: #FFFFFF99;
    line-height: 1.6;
    margin: 0;
}

.footer-copyright-sub {
    margin-top: 0.4rem;
    opacity: 0.6;
}
</style>