import Stripe from 'stripe'
import { obtenerStripePriceId } from '../utils/stripe-mapeo'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover'
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const { cliente, items, subtotal, costoEnvio, total } = body

    // Generar número de orden único
    const ordenNumero = `PA-${Date.now()}`

    // Validaciones
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
    //console.log('🔐 Creando sesión de Stripe...')
    //console.log('📧 Email:', cliente.email)
    //console.log('💰 Total:', total, 'MXN')
    //console.log('🧪 Modo:', process.env.STRIPE_SECRET_KEY.includes('test') ? 'TEST' : 'PRODUCCIÓN')
    
    try {
        // Mapear items del carrito a Price IDs de Stripe
        const line_items = items.map((item: any) => {
            const priceId = obtenerStripePriceId(item.producto.id, item.variante.id)
            
            //console.log(`📦 Producto: ${item.producto.nombre} (${item.producto.id}-${item.variante.id}) → ${priceId}`)
            
            return {
                price: priceId,
                quantity: item.cantidad
            }
        })

        // Agregar envío como line item separado
        line_items.push({
            price_data: {
                currency: 'mxn',
                product_data: {
                    name: 'Envío',
                    description: 'Envío a domicilio con FedEx'
                },
                unit_amount: Math.round(costoEnvio * 100) // en centavos
            },
            quantity: 1
        })

        // Crear sesión de Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            
            // Items del carrito (usando Price IDs del catálogo)
            line_items,
            
            mode: 'payment',
            
            // URLs de redirección
            success_url: process.env.STRIPE_SECRET_KEY?.includes('test') 
                ? `${process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/confirmacion?session_id={CHECKOUT_SESSION_ID}&orden=${ordenNumero}`
                : `${process.env.NUXT_PUBLIC_SITE_URL}/confirmacion?session_id={CHECKOUT_SESSION_ID}&orden=${ordenNumero}`,
            cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,

            // Formulario de dirección
            billing_address_collection: 'auto',
            
            // Pre-llenar email
            customer_email: cliente.email,
            
            // METADATA - Para Zapier y tracking
            metadata: {
                orden_numero: ordenNumero,
                // Datos del cliente
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
                    producto_id: item.producto.id,
                    variante_id: item.variante.id,
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
        
        //console.log('✅ Sesión creada:', session.id)
        
        return {
            success: true,
            sessionId: session.id,
            url: session.url,
            ordenNumero
        }
        
    } catch (error: any) {
        //console.error('❌ Error Stripe:', error.message)
        
        // Mensajes de error más descriptivos
        let errorMsg = error.message
        
        if (error.message.includes('price') || error.message.includes('Price')) {
            errorMsg = 'Error: Verifica que todos los Price IDs en stripe-mapeo.ts sean correctos'
        } else if (error.message.includes('Not a valid URL')) {
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