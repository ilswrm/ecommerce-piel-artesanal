# Documentación Zapier - Automatización Piel Artesanal

## 📋 Resumen

Este Zap automatiza el proceso completo desde el pago hasta el envío:
1. Detecta pago en Stripe
2. Crea guía en Envía.com
3. Envía email al cliente con tracking
4. Registra pedido en Google Sheets

---

## 🔗 Estructura del Zap

```
Trigger: Stripe - New Payment
  ↓
Action 1: Code by Zapier - Formatear datos
  ↓
Action 2: Code by Zapier - Crear guía en Envía
  ↓
Action 3: Gmail - Enviar email confirmación
  ↓
Action 4: Google Sheets - Registrar pedido
```

---

## ⚙️ Configuración Paso a Paso

### Step 1: Trigger - Stripe New Payment

**App:** Stripe
**Event:** New Payment
**Configuración:**
- Use test mode data: True (en desarrollo) / False (en producción)
- Allow test mode events: True (en desarrollo) / False (en producción)

**Campos relevantes que se obtienen:**
- Amount Total
- Customer Email
- Metadata (todos los campos personalizados)
- Created (timestamp)
- ID (Stripe payment ID)

---

### Step 2: Code by Zapier - Formatear Productos y CP

**Event:** Run Python

**Input Data:**
```
items_json → Metadata Items Json
codigo_postal → Metadata Cliente Codigo Postal
```

**Código Python:**

```python
import json

# Obtener datos
items_json = input_data.get('items_json', '[]')
cp = input_data.get('codigo_postal', '')

# Formatear productos
items = json.loads(items_json)
lineas = []
for item in items:
    linea = f"{item['nombre']} - {item['color']} ({item['tipo']}) x{item['cantidad']}"
    lineas.append(linea)

productos_formateados = ', '.join(lineas)

# Formatear código postal (forzar texto con 5 dígitos)
cp_formateado = "'" + str(cp).zfill(5)

output = {
    'productos': productos_formateados,
    'codigo_postal': cp_formateado
}
```

**Output esperado:**
- `productos`: "Guardacables - Negro (Paquete de 3) x1"
- `codigo_postal`: "'07090"

---

### Step 3: Code by Zapier - Crear Guía en Envía

**Event:** Run Python

**Input Data:**
```
metadata__cliente_nombre → Metadata Cliente Nombre
metadata__cliente_direccion → Metadata Cliente Direccion
metadata__cliente_ciudad → Metadata Cliente Ciudad
metadata__cliente_estado → Metadata Cliente Estado
metadata__cliente_codigo_postal → Metadata Cliente Codigo Postal
metadata__cliente_telefono → Metadata Cliente Telefono
metadata__orden_numero → Metadata Orden Numero
amount_received → Amount Total
```

**Código Python Completo:**

```python
import requests
import json
import re
import unicodedata

# ============================================
# FUNCIONES AUXILIARES
# ============================================

def separar_direccion(direccion):
    """Separa calle y número de una dirección"""
    match = re.search(r'^(.+?)\s+(\d+[A-Za-z]*)$', direccion.strip())
    if match:
        return match.group(1), match.group(2)
    else:
        return direccion, "S/N"

def obtener_codigo_estado(estado_nombre):
    """Convierte nombre de estado a código de 2 letras (FedEx)"""
    estados = {
        'aguascalientes': 'AG',
        'baja california': 'BC',
        'baja california sur': 'BS',
        'campeche': 'CM',
        'chiapas': 'CS',
        'chihuahua': 'CH',
        'ciudad de méxico': 'DF',
        'cdmx': 'DF',
        'coahuila': 'CO',
        'colima': 'CL',
        'durango': 'DG',
        'guanajuato': 'GT',
        'guerrero': 'GR',
        'hidalgo': 'HG',
        'jalisco': 'JA',
        'estado de méxico': 'EM',
        'méxico': 'EM',
        'michoacán': 'MI',
        'morelos': 'MO',
        'nayarit': 'NA',
        'nuevo león': 'NL',
        'oaxaca': 'OA',
        'puebla': 'PU',
        'querétaro': 'QE',
        'quintana roo': 'QR',
        'san luis potosí': 'SL',
        'sinaloa': 'SI',
        'sonora': 'SO',
        'tabasco': 'TB',
        'tamaulipas': 'TM',
        'tlaxcala': 'TL',
        'veracruz': 'VE',
        'yucatán': 'YU',
        'zacatecas': 'ZA'
    }
    
    estado_lower = estado_nombre.lower().strip()
    return estados.get(estado_lower, estado_lower[:2].upper())

def quitar_acentos(texto):
    """Elimina acentos y caracteres especiales"""
    if not texto:
        return texto
    texto_normalizado = unicodedata.normalize('NFD', texto)
    texto_sin_acentos = ''.join(c for c in texto_normalizado if unicodedata.category(c) != 'Mn')
    return texto_sin_acentos

# ============================================
# CONFIGURACIÓN
# ============================================

ENVIA_TOKEN = "TU_TOKEN_DE_ENVIA_AQUI"  # ← REEMPLAZAR

url = "https://api.envia.com/ship/generate/"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {ENVIA_TOKEN}"
}

# ============================================
# PROCESAMIENTO DE DATOS
# ============================================

# Construir metadata desde campos individuales
metadata = {
    'cliente_nombre': input_data.get('metadata__cliente_nombre', 'Cliente'),
    'cliente_direccion': input_data.get('metadata__cliente_direccion', 'Dirección'),
    'cliente_ciudad': input_data.get('metadata__cliente_ciudad', 'Ciudad'),
    'cliente_estado': input_data.get('metadata__cliente_estado', 'EST'),
    'cliente_codigo_postal': input_data.get('metadata__cliente_codigo_postal', '00000'),
    'cliente_telefono': input_data.get('metadata__cliente_telefono', '5500000000'),
    'orden_numero': input_data.get('metadata__orden_numero', 'N/A')
}

# Separar calle y número del destino
calle, numero = separar_direccion(metadata['cliente_direccion'])

# Convertir estado a código de 2 letras
estado_codigo = obtener_codigo_estado(metadata['cliente_estado'])

# Calcular monto total (Stripe envía en pesos, no centavos)
amount = int(input_data.get('amount_received', 0))

# ============================================
# CONSTRUIR PAYLOAD PARA ENVÍA
# ============================================

payload = {
    "origin": {
        "name": "Piel Artesanal",
        "company": "Piel Artesanal",
        "street": "Crater 17",
        "number": "S/N",
        "district": "Ampliacion Vista Hermosa",
        "city": "Tlalnepantla",
        "state": "EM",
        "postalCode": "54080",
        "country": "MX",
        "phone": "5569360654"
    },
    "destination": {
        "name": quitar_acentos(metadata['cliente_nombre']),
        "street": quitar_acentos(calle),
        "number": numero,
        "city": quitar_acentos(metadata['cliente_ciudad']),
        "state": estado_codigo,
        "postalCode": metadata['cliente_codigo_postal'],
        "country": "MX",
        "phone": metadata['cliente_telefono']
    },
    "packages": [{
        "type": "envelope",
        "content": "Productos de piel",
        "amount": 1,
        "declaredValue": amount,
        "weightUnit": "KG",
        "lengthUnit": "CM",
        "weight": 1,
        "dimensions": {
            "length": 35,
            "width": 25,
            "height": 2
        },
        "additionalServices": [
            {
                "service": "envia_insurance",
                "data": {
                    "amount": amount
                }
            }
        ]
    }],
    "shipment": {
        "carrier": "fedex",
        "service": "ground"
    },
    "settings": {
        "printFormat": "PDF",
        "printSize": "STOCK_4X6",
        "comments": "Pedido " + metadata['orden_numero']
    }
}

# ============================================
# ENVIAR REQUEST A ENVÍA
# ============================================

response = requests.post(url, headers=headers, json=payload)
envia_response = response.json()

# Extraer tracking (data es una lista, no un dict)
try:
    data = envia_response.get('data', [])
    
    if isinstance(data, list) and len(data) > 0:
        # data es una lista, tomar el primer elemento
        tracking_number = data[0].get('trackingNumber', 'N/A')
    elif isinstance(data, dict):
        # data es un dict (por si cambia el formato)
        tracking_number = data.get('trackingNumber', 'N/A')
    else:
        tracking_number = 'N/A'
        
except Exception as e:
    print(f"Error extrayendo tracking: {e}")
    tracking_number = 'N/A'

# ============================================
# OUTPUT
# ============================================

output = {
    'tracking_number': tracking_number,
    'envia_response': json.dumps(envia_response),
    'direccion_separada': f"Calle: {calle}, Número: {numero}",
    'estado_codigo': estado_codigo
}
```

**IMPORTANTE:** 
- Reemplazar `TU_TOKEN_DE_ENVIA_AQUI` con el token real
- Actualizar teléfono de origen si es necesario

**Output esperado:**
- `tracking_number`: "784512369875"
- `envia_response`: JSON completo de Envía
- `direccion_separada`: "Calle: Luis Yuren, Número: 20"
- `estado_codigo`: "DF"

---

### Step 4: Gmail - Send Email

**App:** Gmail
**Event:** Send Email

**Configuración:**

**To:**
```
Metadata Cliente Email
```

**Subject:**
```
¡Tu guía de envío está lista! 📦
```

**Body Type:** HTML

**Body:**
```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  
  <!-- Header -->
  <div style="background-color: #1a1a1a; padding: 32px 24px; text-align: center;">
    <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #ffffff; font-size: 32px; margin: 0; font-weight: 700;">Piel Artesanal</h1>
  </div>
  
  <!-- Content -->
  <div style="padding: 40px 24px;">
    
    <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 24px;">
      Hola <strong style="color: #1a1a1a;">[Metadata Cliente Nombre]</strong>,
    </p>
    
    <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 32px;">
      ¡Buenas noticias! Hemos generado tu guía de envío.
    </p>
    
    <!-- Order Details -->
    <div style="background-color: #f9fafb; border-left: 4px solid #1a1a1a; padding: 20px; margin-bottom: 24px;">
      <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #1a1a1a; margin: 0 0 16px 0;">📦 Detalles del pedido</h3>
      <p style="margin: 8px 0; color: #374151; font-size: 15px;">
        <strong>Número de orden:</strong> [Metadata Orden Numero]
      </p>
      <p style="margin: 8px 0; color: #374151; font-size: 15px;">
        <strong>Total:</strong> $[Metadata Total] MXN
      </p>
    </div>
    
    <!-- Shipping Info -->
    <div style="background-color: #f9fafb; border-left: 4px solid #1a1a1a; padding: 20px; margin-bottom: 24px;">
      <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #1a1a1a; margin: 0 0 16px 0;">🚚 Información de envío</h3>
      <p style="margin: 8px 0; color: #374151; font-size: 15px;">
        <strong>Paquetería:</strong> FedEx
      </p>
      <p style="margin: 8px 0; color: #374151; font-size: 15px;">
        <strong>Número de guía:</strong> [Step 3 Code → Tracking Number]
      </p>
      <p style="margin: 8px 0; color: #374151; font-size: 15px;">
        <strong>Tiempo estimado:</strong> 3-7 días hábiles después del envío
      </p>
    </div>
    
    <!-- Status Message -->
    <div style="background-color: #dbeafe; border-radius: 8px; padding: 16px; margin-bottom: 32px; text-align: center;">
      <p style="color: #1e40af; font-size: 15px; margin: 0; font-weight: 600;">
        ⏳ Tu pedido será enviado en las próximas 24-48 horas
      </p>
    </div>
    
    <!-- Tracking Button -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="https://www.fedex.com/fedextrack/?tracknumbers=[Step 3 Code → Tracking Number]" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Ver rastreo en FedEx
      </a>
    </div>
    
    <p style="font-size: 14px; line-height: 1.6; color: #6b7280; text-align: center; margin-bottom: 32px;">
      El número de rastreo se activará cuando FedEx recoja el paquete.
    </p>
    
    <!-- WhatsApp Button -->
    <div style="text-align: center; margin-bottom: 32px;">
      <p style="font-size: 15px; color: #374151; margin-bottom: 12px;">
        ¿Necesitas ayuda?
      </p>
      <a href="https://wa.me/525569360654?text=Hola,%20tengo%20una%20pregunta%20sobre%20mi%20pedido%20[Metadata Orden Numero]" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
        💬 Contactar por WhatsApp
      </a>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
    <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px 0;">
      ¡Gracias por tu compra!
    </p>
    <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #1a1a1a; margin: 0; font-weight: 700;">
      Piel Artesanal
    </p>
  </div>
  
</div>
```

**IMPORTANTE:**
- Reemplazar número de WhatsApp con el del cliente
- Los campos `[...]` se mapean con los datos de Stripe/Code

---

### Step 5: Google Sheets - Create Spreadsheet Row

**App:** Google Sheets
**Event:** Create Spreadsheet Row

**Configuración:**

**Drive:** My Google Drive
**Spreadsheet:** Pedidos Piel Artesanal
**Worksheet:** Sheet1

**Mapeo de columnas:**

| Columna | Campo de Zapier |
|---------|----------------|
| Fecha | Created (formatted in timezone) |
| Orden | Metadata → Orden Numero |
| Cliente | Metadata → Cliente Nombre |
| Email | Metadata → Cliente Email |
| Teléfono | Metadata → Cliente Telefono |
| Dirección | Metadata → Cliente Direccion |
| Ciudad | Metadata → Cliente Ciudad |
| Estado | Metadata → Cliente Estado |
| CP | Step 2 Code → codigo_postal |
| Productos | Step 2 Code → productos |
| Subtotal | Metadata → Subtotal |
| Envío | Metadata → Costo Envio |
| Total | Metadata → Total |
| Stripe ID | ID |
| Tracking | Step 3 Code → Tracking Number |
| Estado | (vacío - llenado manualmente) |

---

## 🔐 Variables de Entorno / Secretos

**Tokens necesarios:**

1. **Envía API Token:**
   - Ubicación: Code by Zapier Step 3
   - Variable: `ENVIA_TOKEN`
   - Formato: `Bearer eyJ...`
   - Dónde obtenerlo: Envía Dashboard → API

2. **Stripe Keys:**
   - Automáticamente conectadas vía OAuth
   - Test: `sk_test_...`
   - Producción: `sk_live_...`

3. **Gmail:**
   - Conectado vía OAuth
   - Sin API key manual necesaria

4. **Google Sheets:**
   - Conectado vía OAuth
   - Sin API key manual necesaria

---

## 📊 Google Sheet - Estructura

**Nombre:** Pedidos Piel Artesanal

**Headers (Fila 1):**
```
Fecha | Orden | Cliente | Email | Teléfono | Dirección | Ciudad | Estado | CP | Productos | Subtotal | Envío | Total | Stripe ID | Tracking | Estado
```

**Protección:**
- Columnas A-O: Protegidas (solo tú puedes editar)
- Columna P (Estado): Editable por el cliente

**Permisos:**
- Cliente: Viewer/Editor (solo columna Estado)
- Tú: Owner

---

## 🧪 Testing

### Test Completo del Flujo

1. **Hacer pago de prueba:**
   - Producto barato ($50-70)
   - Tarjeta real (se reembolsará después)
   - Completar checkout

2. **Verificar cada paso:**
   - ✅ Stripe detecta el pago
   - ✅ Code formatea datos correctamente
   - ✅ Envía crea guía con seguro
   - ✅ Gmail envía email
   - ✅ Google Sheets agrega fila

3. **Verificar outputs:**
   - Envía Dashboard → Debe aparecer guía
   - Email → Debe llegar con tracking
   - Google Sheet → Debe aparecer registro

4. **Limpiar:**
   - Stripe → Reembolsar pago
   - Envía → Cancelar guía (antes de 24h)

---

## 🚨 Troubleshooting

### Error: "Not Enough Money" en Envía
**Solución:** Recargar saldo en cuenta de Envía

### Error: "CITY.EMPTY" o "STREET.TOO.SHORT"
**Solución:** Verificar funciones `separar_direccion()` y `obtener_codigo_estado()`

### Error: Tracking Number = N/A
**Solución:** Revisar response de Envía, puede haber error en el request

### Email no llega
**Solución:** 
- Verificar spam/promociones
- Verificar que el email del cliente sea correcto
- Retest del paso de Gmail

### Google Sheet no se actualiza
**Solución:**
- Verificar permisos de la cuenta conectada
- Verificar que las columnas coincidan exactamente
- Retest del paso de Google Sheets

---

## 📈 Costos y Límites

### Zapier
- **Free:** 100 tareas/mes (~25 pedidos)
- **Starter:** $19.99/mes - 750 tareas (~180 pedidos)
- **Professional:** $49/mes - 2,000 tareas

### Envía
- **Por guía:** ~$165-200 MXN (envío)
- **Seguro:** ~1% del valor + IVA (~$2-5 MXN)
- **Sin comisión** por uso de API

### Conteo de tareas por pedido:
1. Trigger Stripe: 1 tarea
2. Code formatear: 1 tarea
3. Code crear guía: 1 tarea
4. Gmail: 1 tarea
5. Google Sheets: 1 tarea

**Total: 5 tareas por pedido**

---

## 🔄 Mantenimiento

### Actualizar dirección de origen:
Editar Step 3, sección `origin` del payload

### Cambiar servicio de envío:
Editar Step 3, cambiar `"service": "ground"` por `"express"`

### Actualizar template de email:
Editar Step 4, modificar HTML del body

### Agregar campos al Google Sheet:
1. Agregar columna en Sheet
2. Mapear en Step 5

---

## 📝 Notas Importantes

1. **Seguro:** Se activa vía `additionalServices` con `envia_insurance`
2. **Acentos:** Se eliminan automáticamente con `quitar_acentos()`
3. **Estados:** Se convierten a códigos de 2 letras (formato FedEx)
4. **Direcciones:** Se separan en calle/número automáticamente
5. **CP:** Se formatea con ceros iniciales ('07090)

---

## 🔗 Links Útiles

- **Zapier Dashboard:** https://zapier.com/app/dashboard
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Envía Dashboard:** https://envios.envia.com
- **Google Sheet:** [Link al sheet específico]
- **Envía API Docs:** https://api.envia.com/docs

---

## 📅 Última Actualización

**Fecha:** 6 de febrero de 2026
**Versión:** 1.0
**Estado:** Producción
