
<script setup lang="ts">
const { totalItems, recargarCarrito } = useCarrito()

const mostrarBanner = ref(true)

onMounted(() => {
    recargarCarrito()
})
</script>

<template>
    <UApp>
        <!-- Banner envío gratis -->
        <div v-if="mostrarBanner" class="top-bar">
            <div class="top-bar-track">
                <div class="top-bar-content">
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                </div>
                <div class="top-bar-content" aria-hidden="true">
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                    <Icon name="ph:truck" size="16" />
                    <span>Envío gratis en pedidos mayores a $1,199 MXN</span>
                </div>
            </div>
    <button @click="mostrarBanner = false" class="top-bar-close">✕</button>
</div>
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
                            <NuxtLink to="/contacto" class="font-medium nav-contacto self-start">
                                Contacto
                            </NuxtLink>
                        </nav>

                    </div>
                </template>
            </UHeader>
        
        <NuxtPage />
        <footer class="footer">
            <div class="footer-copyright">
                <p>© 2026 Catálogo de JM Taller. Productos 100% hechos a mano en México. Todos los derechos reservados.</p>
                <p class="footer-copyright-sub">Piel premium curtida artesanalmente en Jalisco, incentivando el comercio local.</p>
            </div>
        </footer>
    </UApp>
</template>
<style>
nav a.router-link-active span {
    width: 100%;
}
.top-bar {
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 0.5rem 0;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
}

.top-bar-track {
    display: flex;
    width: max-content;
    animation: marquee 60s linear infinite;
}

.top-bar-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-right: 1.5rem;
    white-space: nowrap;
}

.top-bar-close {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 1rem;
    background: linear-gradient(to right, transparent, #1a1a1a 30%);
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 0.9rem;
    opacity: 0.9;
    transition: opacity 0.2s;
    z-index: 1;
    display: flex;
    align-items: center;
}

.top-bar-close:hover {
    opacity: 1;
}

@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
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