<script setup lang="ts">
const { 
  items, 
  subtotal, 
  costoEnvio, 
  total, 
  estaVacio,
  recargarCarrito,
  vaciarCarrito,
  calcularCostoEnvio,   // Para llamar a la API cuando el usuario escriba su codigo postal
  calculandoEnvio 
} = useCarrito()

// Recargar carrito
onMounted(() => {
  recargarCarrito()
})

// Redirigir si el carrito está vacío SOLO al montar el componente
// No redirigir después porque el carrito se vacía antes de ir a Stripe
onMounted(() => {
  if (estaVacio.value) {
    navigateTo('/carrito')
  }
})
// Datos del formulario
const datosCliente = ref({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  estado: '',
  codigoPostal: '',
  notas: '',
  seguroEnvio: true
})

// Estados de México para el select
const estadosMexico = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

// Validación del formulario
const errores = ref<Record<string, string>>({})
const procesando = ref(false)

const calcularCostoSeguro = () => {
  if (!datosCliente.value.seguroEnvio) return 0
  const seguro = subtotal.value * 0.01 // 1% del valor
  const conIVA = seguro * 1.16 // + IVA
  return Math.round(conIVA)
}

// Calcular el envío automáticamente cuando el usuario escribe su codigo postal
// Se ejecuta cada vez que cambia datosCliente.codigoPostal
// Solo llama a la API cuando tiene los 5 dígitos completos
// Calcular envío cuando cambian los datos relevantes
watch(
  () => [
    datosCliente.value.codigoPostal,
    datosCliente.value.ciudad,
    datosCliente.value.estado,
    datosCliente.value.direccion,
    datosCliente.value.seguroEnvio
  ],
  async () => {
    const cp = datosCliente.value.codigoPostal
    
    if (cp && cp.length === 5) {
      await calcularCostoEnvio(
        cp,
        datosCliente.value.ciudad,
        datosCliente.value.estado,
        datosCliente.value.direccion,
        datosCliente.value.seguroEnvio
      )
    }
  },
  { deep: true }
)

const validarFormulario = () => {
  errores.value = {}
  
  if (!datosCliente.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es requerido'
  }
  
  if (!datosCliente.value.apellido.trim()) {
    errores.value.apellido = 'El apellido es requerido'
  }
  
  if (!datosCliente.value.email.trim()) {
    errores.value.email = 'El email es requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosCliente.value.email)) {
    errores.value.email = 'Email inválido'
  }
  
  if (!datosCliente.value.telefono.trim()) {
    errores.value.telefono = 'El teléfono es requerido'
  } else if (!/^\d{10}$/.test(datosCliente.value.telefono.replace(/\s/g, ''))) {
    errores.value.telefono = 'Teléfono debe tener 10 dígitos'
  }
  
  if (!datosCliente.value.direccion.trim()) {
    errores.value.direccion = 'La dirección es requerida'
  }
  
  if (!datosCliente.value.ciudad.trim()) {
    errores.value.ciudad = 'La ciudad es requerida'
  }
  
  if (!datosCliente.value.estado) {
    errores.value.estado = 'El estado es requerido'
  }
  
  if (!datosCliente.value.codigoPostal.trim()) {
    errores.value.codigoPostal = 'El código postal es requerido'
  } else if (!/^\d{5}$/.test(datosCliente.value.codigoPostal)) {
    errores.value.codigoPostal = 'Código postal debe tener 5 dígitos'
  }
  
  return Object.keys(errores.value).length === 0
}

// Formatear precio
const formatearPrecio = (precio: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(precio)
}

// Procesar pago
const procesarPago = async () => {
  if (!validarFormulario()) {
    // Scroll al primer error
    const primerError = document.querySelector('.input-error')
    if (primerError) {
      primerError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }
  
  procesando.value = true
  
  try {
    const ordenData = {
      cliente: datosCliente.value,
      items: items.value.map(item => ({
        producto: {
          id: item.producto.id,
          nombre: item.producto.nombre,
          imgs: item.producto.imgs
        },
        variante: {
          id: item.variante.id,
          precio: item.variante.precio
        },
        cantidad: item.cantidad,
        color: item.color,
        tipo: item.tipo
      })),
      subtotal: subtotal.value,
      costoEnvio: costoEnvio.value,
      total: total.value
    }
    
    // Llamada al backend para crear sesión de Stripe
    const response = await $fetch('/api/crear-sesion-stripe', {
      method: 'POST',
      body: ordenData
    })
    console.log('Respuesta crear sesión:', response)
    
    if (response.success && (response as any).url) {
        //Vaciar carrito local
          vaciarCarrito()
      
      // Redirigir a Stripe Checkout
    window.location.href = (response as any).url
    } else {
    throw new Error((response as any).error || 'Error al crear sesión de pago')
    }
    
  } catch (error: any) {
    console.error('Error al procesar pago:', error)
    alert(`Hubo un error al procesar tu pedido: ${error.message}\nPor favor intenta nuevamente.`)
  } finally {
    procesando.value = false
  }
}

// Costo de envío sin el seguro
const costoEnvioBase = computed(() => {
  if (!costoEnvio.value) return 0
  const seguro = datosCliente.value.seguroEnvio ? calcularCostoSeguro() : 0
  return costoEnvio.value - seguro
})

// Meta tags
useHead({
  title: 'Checkout - Finalizar Compra',
  meta: [
    { name: 'description', content: 'Completa tu compra' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink 
          to="/carrito" 
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <Icon name="ph:arrow-left" size="16" />
          Volver al carrito
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          Finalizar Compra
        </h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Columna izquierda: Formulario -->
        <div class="lg:col-span-2">
          <form @submit.prevent="procesarPago" class="space-y-6">
            <!-- Información personal -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h2 class="text-xl font-bold text-gray-900 mb-6">
                Información Personal
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nombre -->
                <div>
                  <label for="nombre" class="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    v-model="datosCliente.nombre"
                    type="text"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                      errores.nombre 
                        ? 'border-red-500 focus:border-red-600 input-error' 
                        : 'border-gray-300 focus:border-gray-900'
                    ]"
                    placeholder="Juan"
                  />
                  <p v-if="errores.nombre" class="text-red-600 text-sm mt-1">
                    {{ errores.nombre }}
                  </p>
                </div>

                <!-- Apellido -->
                <div>
                  <label for="apellido" class="block text-sm font-semibold text-gray-900 mb-2">
                    Apellido *
                  </label>
                  <input
                    id="apellido"
                    v-model="datosCliente.apellido"
                    type="text"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                      errores.apellido 
                        ? 'border-red-500 focus:border-red-600 input-error' 
                        : 'border-gray-300 focus:border-gray-900'
                    ]"
                    placeholder="Pérez"
                  />
                  <p v-if="errores.apellido" class="text-red-600 text-sm mt-1">
                    {{ errores.apellido }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    v-model="datosCliente.email"
                    type="email"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                      errores.email 
                        ? 'border-red-500 focus:border-red-600 input-error' 
                        : 'border-gray-300 focus:border-gray-900'
                    ]"
                    placeholder="juan@ejemplo.com"
                  />
                  <p v-if="errores.email" class="text-red-600 text-sm mt-1">
                    {{ errores.email }}
                  </p>
                </div>

                <!-- Teléfono -->
                <div>
                  <label for="telefono" class="block text-sm font-semibold text-gray-900 mb-2">
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    v-model="datosCliente.telefono"
                    type="tel"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                      errores.telefono 
                        ? 'border-red-500 focus:border-red-600 input-error' 
                        : 'border-gray-300 focus:border-gray-900'
                    ]"
                    placeholder="5512345678"
                  />
                  <p v-if="errores.telefono" class="text-red-600 text-sm mt-1">
                    {{ errores.telefono }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Dirección de envío -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h2 class="text-xl font-bold text-gray-900 mb-6">
                Dirección de Envío
              </h2>
              
              <div class="space-y-4">
                <!-- Dirección -->
                <div>
                  <label for="direccion" class="block text-sm font-semibold text-gray-900 mb-2">
                    Calle y número *
                  </label>
                  <input
                    id="direccion"
                    v-model="datosCliente.direccion"
                    type="text"
                    :class="[
                      'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                      errores.direccion 
                        ? 'border-red-500 focus:border-red-600 input-error' 
                        : 'border-gray-300 focus:border-gray-900'
                    ]"
                    placeholder="Av. Reforma 123, Col. Centro"
                  />
                  <p v-if="errores.direccion" class="text-red-600 text-sm mt-1">
                    {{ errores.direccion }}
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Ciudad -->
                  <div>
                    <label for="ciudad" class="block text-sm font-semibold text-gray-900 mb-2">
                      Ciudad *
                    </label>
                    <input
                      id="ciudad"
                      v-model="datosCliente.ciudad"
                      type="text"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errores.ciudad 
                          ? 'border-red-500 focus:border-red-600 input-error' 
                          : 'border-gray-300 focus:border-gray-900'
                      ]"
                      placeholder="Ciudad de México"
                    />
                    <p v-if="errores.ciudad" class="text-red-600 text-sm mt-1">
                      {{ errores.ciudad }}
                    </p>
                  </div>

                  <!-- Estado -->
                  <div>
                    <label for="estado" class="block text-sm font-semibold text-gray-900 mb-2">
                      Estado *
                    </label>
                    <select
                      id="estado"
                      v-model="datosCliente.estado"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errores.estado 
                          ? 'border-red-500 focus:border-red-600 input-error' 
                          : 'border-gray-300 focus:border-gray-900'
                      ]"
                    >
                      <option value="">Selecciona...</option>
                      <option v-for="estado in estadosMexico" :key="estado" :value="estado">
                        {{ estado }}
                      </option>
                    </select>
                    <p v-if="errores.estado" class="text-red-600 text-sm mt-1">
                      {{ errores.estado }}
                    </p>
                  </div>

                  <!-- Código Postal -->
                  <div>
                    <label for="codigoPostal" class="block text-sm font-semibold text-gray-900 mb-2">
                      C.P. *
                    </label>
                    <input
                      id="codigoPostal"
                      v-model="datosCliente.codigoPostal"
                      type="text"
                      inputmode="numeric"
                      maxlength="5"
                      placeholder="01000"
                      @keydown="$event.key.match(/[^0-9]/) && !['Backspace','Tab','ArrowLeft','ArrowRight','Delete'].includes($event.key) && $event.preventDefault()"
                      :class="[
                        'w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors',
                        errores.codigoPostal 
                          ? 'border-red-500 focus:border-red-600 input-error' 
                          : 'border-gray-300 focus:border-gray-900'
                      ]"
                    />
                    <p v-if="errores.codigoPostal" class="text-red-600 text-sm mt-1">
                      {{ errores.codigoPostal }}
                    </p>
                  </div>
                </div>

                <!-- Notas adicionales -->
                <div>
                  <label for="notas" class="block text-sm font-semibold text-gray-900 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    id="notas"
                    v-model="datosCliente.notas"
                    rows="3"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    placeholder="Instrucciones especiales de entrega, referencias, etc."
                  />
                </div>
                <!-- Seguro de envío (opcional) -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <input
                      id="seguroEnvio"
                      v-model="datosCliente.seguroEnvio"
                      type="checkbox"
                      class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div class="flex-1">
                      <label for="seguroEnvio" class="text-sm font-semibold text-gray-900 cursor-pointer">
                        Proteger mi pedido con Envía Seguro
                      </label>
                      <p class="text-xs text-gray-600 mt-1">
                        Recomendado. Tu pedido estará asegurado contra pérdida o daño durante el envío. 
                        Costo: 1% del valor de tu pedido + IVA (aproximadamente ${{ calcularCostoSeguro() }} MXN).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón submit (mobile) -->
            <button
              type="submit"
              :disabled="procesando"
              class="lg:hidden w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <span v-if="!procesando">Proceder al pago</span>
              <span v-else class="flex items-center justify-center gap-2">
                <Icon name="ph:spinner" size="20" class="animate-spin" />
                Procesando...
              </span>
            </button>
          </form>
        </div>

        <!-- Columna derecha: Resumen del pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl p-6 shadow-sm sticky top-4">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              Resumen del pedido
            </h2>

            <!-- Items -->
            <div class="space-y-3 mb-6 max-h-64 overflow-y-auto">
              <div
                v-for="item in items"
                :key="`${item.producto.id}-${item.variante.id}`"
                class="flex gap-3"
              >
                <img
                  :src="item.producto.imgs[0]"
                  :alt="item.producto.nombre"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 truncate">
                    {{ item.producto.nombre }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ item.color }} {{ item.tipo ? `- ${item.tipo}` : '' }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ item.cantidad }} x {{ formatearPrecio(item.variante.precio) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Desglose -->
          <div class="space-y-3 mb-6 pt-4 border-t">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{{ formatearPrecio(subtotal) }}</span>
            </div>
            
            <div class="flex justify-between text-gray-600">
              <span>Envío</span>
              <!-- Tres estados posibles: pendiente, calculando, calculado -->
              <span v-if="!datosCliente.codigoPostal" class="text-gray-400 text-sm italic">
                Se calcula con tu CP
              </span>
              <span v-else-if="calculandoEnvio" class="text-blue-600 text-sm flex items-center gap-1">
                <Icon name="ph:spinner" size="14" class="animate-spin" />
                Calculando...
              </span>
              <span v-else>
                {{ formatearPrecio(costoEnvioBase) }}
              </span>
            </div>
            
            <!-- Seguro (solo si está activado) -->
            <div 
              v-if="datosCliente.seguroEnvio && costoEnvio > 0" 
              class="flex justify-between text-green-600 text-sm font-medium"
            >
              <span class="flex items-center gap-1">
                <Icon name="ph:shield-check-fill" size="16" />
                Envía Seguro
              </span>
              <span>+{{ formatearPrecio(calcularCostoSeguro()) }}</span>
            </div>
            
            <div class="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <!-- Si aún no tiene CP, solo muestra el subtotal -->
              <span v-if="!datosCliente.codigoPostal || calculandoEnvio">
                {{ formatearPrecio(subtotal) }}+
              </span>
              <span v-else>
                {{ formatearPrecio(total) }}
              </span>
            </div>
          </div>

          <!-- Botón submit (desktop) -->
          <button
            @click="procesarPago"
            :disabled="procesando"
            class="hidden lg:block w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            <span v-if="!procesando">Proceder al pago</span>
            <span v-else class="flex items-center justify-center gap-2">
              <Icon name="ph:spinner" size="20" class="animate-spin" />
              Procesando...
            </span>
          </button>

            <!-- Info de seguridad -->
            <div class="mt-6 space-y-2 text-xs text-gray-600">
              <div class="flex items-center gap-2">
                <Icon name="ph:lock" size="16" class="text-green-600" />
                <span>Pago 100% seguro con Stripe</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="ph:shield-check" size="16" class="text-blue-600" />
                <span>Tus datos están protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación del spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>