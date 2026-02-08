// Mapeo de nombres de estados a códigos que Envía acepta
function obtenerCodigoEstado(estado: string): string {
  const mapeo: Record<string, string> = {
    'Aguascalientes': 'AGU',
    'Baja California': 'BCN',
    'Baja California Sur': 'BCS',
    'Campeche': 'CAM',
    'Chiapas': 'CHP',
    'Chihuahua': 'CHH',
    'Ciudad de México': 'CMX',
    'CDMX': 'CMX',
    'Coahuila': 'COA',
    'Colima': 'COL',
    'Durango': 'DUR',
    'Estado de México': 'MEX',
    'Guanajuato': 'GUA',
    'Guerrero': 'GRO',
    'Hidalgo': 'HID',
    'Jalisco': 'JAL',
    'Michoacán': 'MIC',
    'Morelos': 'MOR',
    'Nayarit': 'NAY',
    'Nuevo León': 'NLE',
    'Oaxaca': 'OAX',
    'Puebla': 'PUE',
    'Querétaro': 'QUE',
    'Quintana Roo': 'ROO',
    'San Luis Potosí': 'SLP',
    'Sinaloa': 'SIN',
    'Sonora': 'SON',
    'Tabasco': 'TAB',
    'Tamaulipas': 'TAM',
    'Tlaxcala': 'TLA',
    'Veracruz': 'VER',
    'Yucatán': 'YUC',
    'Zacatecas': 'ZAC'
  }
  
  return mapeo[estado] || estado
}

// 1. Validar CP con Geocodes API
async function validarCP(codigoPostal: string) {
  const response = await $fetch(`https://geocodes.envia.com/zipcode/MX/${codigoPostal}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.ENVIA_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  return response
}

// 2. Obtener cotización con Shipping API (solo FedEx)
async function cotizarEnvio(destino: any, subtotal: number, conSeguro: boolean) {
  const requestBody = {
  origin: {
    name: 'Piel Artesanal',
    company: 'Piel Artesanal',
    address1: 'Cráter 17, Ampliación Vista Hermosa',
    city: 'Tlalnepantla',
    state: 'MEX',
    postalCode: '54080',
    country: 'MX',
    phone: '5569360654'
  },
  destination: destino,
  packages: [{
    type: 'envelope',                    // ← REQUERIDO
    content: 'Accesorios',   // ← REQUERIDO
    amount: 1,
    declaredValue: conSeguro ? subtotal : 0, 
    insurance: conSeguro ? subtotal : 0,                      
    weightUnit: 'KG',               // ← REQUERIDO
    lengthUnit: 'CM',               // ← REQUERIDO
    weight: 1.0,                    // ← REQUERIDO
    dimensions: {                   // ← REQUERIDO
      length: 35,
      width: 25,
      height: 2
    }
  }],
  shipment: {                       // ← REQUERIDO
    carrier: 'fedex'                // Aquí va el carrier, NO en el root
  }
}

  //console.log('📤 Request a Envía:', JSON.stringify(requestBody, null, 2))

  const response = await $fetch('https://api.envia.com/ship/rate/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.ENVIA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: requestBody
  })
  return response
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { codigoPostal, ciudad, estado, direccion, subtotal, conSeguro} = body

  // Validar formato del CP
  if (!codigoPostal || !/^\d{5}$/.test(codigoPostal)) {
    return {
      success: false,
      error: 'Código postal inválido. Debe tener 5 dígitos.',
      costoEnvio: 0
    }
  }

  // Si no tiene API key, retornar error
  if (!process.env.ENVIA_API_KEY) {
    console.error('❌ No hay ENVIA_API_KEY configurada')
    return {
      success: false,
      error: 'El servicio de cotización no está disponible. Por favor contacta al vendedor.',
      costoEnvio: 0
    }
  }

  try {
    // Paso 1: Validar que el CP existe
    //console.log('📍 Validando CP con Geocodes API...')
    const cpValido = await validarCP(codigoPostal)
    //console.log('✅ CP válido:', cpValido)

    // Construir destino con datos del cliente (si están disponibles) o datos del CP validado
    const destino = {
      name: 'Cliente',
      address1: direccion || 'Por confirmar',
      city: ciudad || (cpValido as any)?.city || 'Ciudad',
      state: obtenerCodigoEstado(estado || (cpValido as any)?.state || 'CMX'),
      postalCode: codigoPostal,
      country: 'MX',
      phone: '5512345678' // Placeholder, no afecta la cotización
    }

    // Paso 2: Cotizar envío
    //console.log('📦 Cotizando envío con Shipping API...')
    //console.log('📍 Destino:', destino)
    const cotizacion = await cotizarEnvio(destino, subtotal || 0, conSeguro ?? true)
    //console.log('📊 Cotización recibida:', JSON.stringify(cotizacion))

  // Extraer el precio más bajo de las opciones
  const opciones = (cotizacion as any).data || (cotizacion as any) || []

  if (Array.isArray(opciones) && opciones.length > 0) {
    const masBarata = opciones.reduce((min: any, actual: any) =>
      (actual.totalPrice || 999999) < (min.totalPrice || 999999) ? actual : min
    )
    
    const precioBase = masBarata.totalPrice || masBarata.price || masBarata.rate
    const servicio = masBarata.serviceDescription || masBarata.service_name || masBarata.service || 'Estándar'

    // Calcular seguro sobre el TOTAL del pedido (producto + envío), igual que Envía
    const totalPedido = subtotal + Math.round(precioBase)
    const costoSeguro = conSeguro ? Math.ceil((totalPedido * 0.01) * 1.16) : 0
    const precioFinal = Math.round(precioBase) + costoSeguro

    //console.log(`✅ Precio base: $${precioBase}`)
    //console.log(`🛡️ Seguro: $${costoSeguro} sobre $${totalPedido} (${conSeguro ? 'SÍ' : 'NO'})`)
    //console.log(`📊 Total: $${precioFinal} - Servicio: ${servicio}`)

    return {
      success: true,
      costoEnvio: precioFinal,
      servicio,
      codigoPostal
    }
  }

    // Si no hay opciones, usar fallback
    throw new Error('No se encontraron opciones de envío')

  } catch (error: any) {
    console.error('❌ Error con API de Envía:', error.message)
    console.error('Detalle:', error)

    return {
      success: false,
      error: 'No pudimos calcular el costo de envío en este momento. Por favor intenta de nuevo o contacta al vendedor.',
      costoEnvio: 0,
      codigoPostal
    }
  }
})

