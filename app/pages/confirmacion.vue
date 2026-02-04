<script setup lang="ts">
const route = useRoute()
const sessionId = route.query.session_id as string
const ordenNumero = route.query.orden as string

// En modo TEST, puede que no tengamos session_id
// pero aún así mostramos la confirmación
const modoTest = !sessionId

// Computed seguro para mostrar sessionId (evita errores SSR)
const sessionIdDisplay = computed(() => {
    if (!sessionId) return ''
    return sessionId.length > 20 ? `${sessionId.substring(0, 20)}...` : sessionId
})


// Limpiar carrito
const { vaciarCarrito } = useCarrito()
vaciarCarrito()

useHead({
    title: '¡Pedido Confirmado! - Gracias por tu compra',
})

</script>

<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
        <!-- Icono de éxito -->
        <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Icon name="ph:check-circle" size="48" class="text-green-600" />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            ¡Pedido Confirmado!
        </h1>
        <p class="text-lg text-gray-600">
            Gracias por tu compra
        </p>
        </div>

        <!-- Detalles del pedido -->
        <div class="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">
            Resumen del Pedido
        </h2>
        
        <div class="space-y-3 text-gray-600">
            <div class="flex justify-between">
            <span class="font-semibold">Número de orden:</span>
            <span class="font-mono text-gray-900">{{ ordenNumero }}</span>
            </div>
            <div class="flex justify-between">
            <span class="font-semibold">ID de pago:</span>
            <span class="font-mono text-sm text-gray-900">{{ sessionIdDisplay }}</span>
            </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <div class="flex gap-3">
            <Icon name="ph:info" size="24" class="text-blue-600 flex-shrink-0" />
            <div class="text-sm text-blue-900">
                <p class="font-semibold mb-1">¿Qué sigue?</p>
                <ul class="list-disc list-inside space-y-1">
                <li>Recibirás un email de confirmación con los detalles de tu pedido</li>
                <li>Tu guía de rastreo será enviada por email en las próximas horas</li>
                <li>El envío toma de 3 a 7 días hábiles</li>
                </ul>
            </div>
            </div>
        </div>
        </div>

        <!-- Información de contacto -->
        <div class="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda?
        </h3>
        <div class="space-y-3 text-gray-600">
            <div class="flex items-center gap-3">
            <Icon name="ph:envelope" size="20" class="text-gray-400" />
            <a href="mailto:hola@pielartesanal.com" class="hover:text-gray-900">
                piel.mj.estudio@gmail.com
            </a>
            </div>
            <div class="flex items-center gap-3">
            <Icon name="ph:whatsapp-logo" size="20" class="text-gray-400" />
            <a href="https://wa.me/525569360654" target="_blank" class="hover:text-gray-900">
                WhatsApp: 55 6936 0654
            </a>
            </div>
        </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink 
            to="/#catalogo" 
            class="flex-1 text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
            Seguir comprando
        </NuxtLink>
        <NuxtLink 
            to="/" 
            class="flex-1 text-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
        >
            Volver al inicio
        </NuxtLink>
        </div>
    </div>
    </div>
</template>