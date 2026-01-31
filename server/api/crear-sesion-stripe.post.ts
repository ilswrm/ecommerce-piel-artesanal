import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover'
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const { cliente, items, subtotal, costoEnvio, total } = body

  // Generar número de orden único
    const ordenNumero = `PA-${Date.now()}`

    // Validaciones que serán removidas en produccion
    if (!items || items.length === 0) {
        throw createError({
            statusCode: 400,
            message: 'El carrito está vacío'
        })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        throw createError({
            statusCode: 500,
            message: 'STRIPE_SECRET_KEY no configurada'
        })
    }

    // Logging para debug
    console.log('🔐 Creando sesión de Stripe...')
    console.log('📧 Email:', cliente.email)
    console.log('💰 Total:', total, 'MXN')
    console.log('🧪 Modo:', process.env.STRIPE_SECRET_KEY.includes('test') ? 'TEST' : 'PRODUCCIÓN')
    
    try {
    // Crear sesión de Stripe con TODA la metadata
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        
      // Items del carrito
        line_items: items.map((item: any) => ({
        price_data: {
            currency: 'mxn',
            product_data: {
            name: item.producto.nombre,
            description: `${item.color || ''} ${item.tipo || ''}`.trim()
            },
          unit_amount: Math.round(item.variante.precio * 100) // Centavos
        },
        quantity: item.cantidad
        })),
        
      // Costo de envío
        shipping_options: [{
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
            amount: Math.round(costoEnvio * 100),
            currency: 'mxn'
            },
            display_name: 'Envío estándar',
            delivery_estimate: {
            minimum: {
                unit: 'business_day',
                value: 3
            },
            maximum: {
                unit: 'business_day',
                value: 7
            }
            }
        }
        }],
        
        mode: 'payment',
        
// URLs SIEMPRE incluidas (requeridas por Stripe)
success_url: process.env.STRIPE_SECRET_KEY?.includes('test') 
    ? `${process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/confirmacion`
    : `${process.env.NUXT_PUBLIC_SITE_URL}/confirmacion?session_id={CHECKOUT_SESSION_ID}&orden=${ordenNumero}`,
cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,

// Formulario de dirección - 'auto' es menos restrictivo en modo test
    billing_address_collection: 'auto',
// shipping_address_collection removido - ya tienes la dirección en tu formulario
        
      // Pre-llenar email
        customer_email: cliente.email,
        
      // METADATA - Aquí guardamos TODO para Zapier
        metadata: {
        orden_numero: ordenNumero,
        // Datos del cliente (respaldo)
        cliente_nombre: `${cliente.nombre} ${cliente.apellido}`,
        cliente_email: cliente.email,
        cliente_telefono: cliente.telefono,
        cliente_direccion: cliente.direccion,
        cliente_ciudad: cliente.ciudad,
        cliente_estado: cliente.estado,
        cliente_codigo_postal: cliente.codigoPostal,
        cliente_notas: cliente.notas || '',
        // Resumen del pedido
        items_json: JSON.stringify(items.map((item: any) => ({
            nombre: item.producto.nombre,
            cantidad: item.cantidad,
            precio: item.variante.precio,
            color: item.color,
            tipo: item.tipo
        }))),
        subtotal: subtotal.toString(),
        costo_envio: costoEnvio.toString(),
        total: total.toString()
        }
    })
    
    return {
        success: true,
        sessionId: session.id,
        url: session.url,
        ordenNumero
    }
    
        } catch (error: any) {
        console.error('❌ Error Stripe:', error.message)
        
        // Mensajes de error más descriptivos
        let errorMsg = error.message
        
        if (error.message.includes('Not a valid URL')) {
            errorMsg = 'Error de configuración: URLs de redirect inválidas (normal en modo TEST)'
        } else if (error.message.includes('API key')) {
            errorMsg = 'Error: Verifica tu STRIPE_SECRET_KEY en .env'
        }
        
        return {
            success: false,
            error: errorMsg
        }
    }
})