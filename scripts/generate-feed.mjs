import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Importa los productos directamente
const { default: productos } = await import('../app/assets/data/products.ts')

const items = productos.map(p => {
    const imagenPrincipal = p.imgs['negro-texturizada']?.[0] 
        ?? p.imgs['negro-lisa']?.[0] 
        ?? ''
    
    const precioBase = p.variantes[0]?.precio ?? 0
    const imagenUrl = `https://jmtaller.com${imagenPrincipal}`
    const productoUrl = `https://jmtaller.com/products/${p.slug}`

    return `
    <item>
        <g:id>${p.id}</g:id>
        <g:title>${p.nombre}</g:title>
        <g:description>${p.descripcion}</g:description>
        <g:link>${productoUrl}</g:link>
        <g:image_link>${imagenUrl}</g:image_link>
        <g:price>${precioBase}.00 MXN</g:price>
        <g:availability>in stock</g:availability>
        <g:condition>new</g:condition>
        <g:brand>JM Taller</g:brand>
        <g:google_product_category>169</g:google_product_category>
    </item>`
}).join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
        <title>JM Taller</title>
        <link>https://jmtaller.com</link>
        <description>Accesorios artesanales de piel premium</description>
        ${items}
    </channel>
</rss>`

writeFileSync(resolve(__dirname, '../public/feed.xml'), xml)
console.log('✅ feed.xml generado correctamente')