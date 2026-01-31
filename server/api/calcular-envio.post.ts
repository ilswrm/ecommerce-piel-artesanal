/**
 * ENDPOINT: Calcular costo de envío
 * 
 * Recibe: Código postal del cliente
 * Devuelve: Costo de envío calculado por envios.com
 * 
 * Uso desde frontend:
 * const costo = await $fetch('/api/calcular-envio', {
 *   method: 'POST',
 *   body: { codigoPostal: '01000' }
 * })
 */

// especificar tipo para la respuesta de envios.com
interface EnviosComResponse {
    costo?: number
    precio?: number
    servicio?: string
  [key: string]: any // Permitir otras propiedades
}

export default defineEventHandler(async (event) => {
  // 1. Leer el código postal que envió el frontend
    const body = await readBody(event)
    const { codigoPostal } = body

  // 2. Validar que se recibió un código postal
    if (!codigoPostal) {
    throw createError({
        statusCode: 400,
        message: 'Código postal es requerido'
    })
    }

  // 3. Validar formato (5 dígitos para México)
    if (!/^\d{5}$/.test(codigoPostal)) {
    throw createError({
        statusCode: 400,
        message: 'Código postal inválido. Debe tener 5 dígitos.'
    })
}

  // 4. POR AHORA: Retornar costo fijo hasta que se configure envios.com
  // IMPORTANTE Descomentar cuando esté la API key de envios.com

    console.log('📦 Calculando envío para CP:', codigoPostal)

return {
    success: true,
    costoEnvio: 150, // Costo fijo por el momento
    codigoPostal: codigoPostal,
    servicio: 'Estándar'
    }

    /* 
  // 5. DESCOMENTAR ESTO cuando se tenga la API key de envios.com:

    try {
    const response = await $fetch<EnviosComResponse>('https://api.envios.com/v1/cotizar', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${process.env.ENVIOS_API_KEY}`,
        'Content-Type': 'application/json'
        },
        body: {
        origen: {
            codigo_postal: process.env.CODIGO_POSTAL_ORIGEN || '55010'
        },
        destino: {
            codigo_postal: codigoPostal
        },
        paquete: {
            peso: 0.5,
            largo: 20,
            ancho: 15,
            alto: 5
        }
        }
    })
    
    // Extraer el costo (ajusta según la respuesta real de envios.com)
    const costoEnvio = response.costo || response.precio || 150
    
    return {
        success: true,
        costoEnvio: costoEnvio,
        codigoPostal: codigoPostal,
        servicio: response.servicio || 'Estándar'
    }
    
    } catch (error: any) {
    console.error('Error al calcular envío:', error)
    
    // Fallback: costo fijo si falla
    return {
        success: false,
        costoEnvio: 150,
        error: 'No se pudo calcular el envío, se usará tarifa estándar',
        codigoPostal: codigoPostal
    }
    }
  */
})
