
export const stripePriceMapeo: Record<string, string> = {
  // Tarjetero #1
  "1-1": "price_1SxXDGLvsh0tZvGv1b7ezVej",   // Tarjetero #1 - Negro - $170
  "1-2": "price_1SxXDMLvsh0tZvGvuow4J4av",   // Tarjetero #1 - Café  - $170

  // Tarjetero #2
  "2-3": "price_1SxXDOLvsh0tZvGvO2Dsq7EG",   // Tarjetero #2 - Negro - $220
  "2-4": "price_1SxXDQLvsh0tZvGvmRPTWdEO",   // Tarjetero #2 - Café  - $220

  // Billetera #1
  "3-5": "price_1SxXDSLvsh0tZvGv3NwoieOZ",   // Billetera #1 - Negro - $220
  "3-6": "price_1SxXDULvsh0tZvGvvBQrUj3C",   // Billetera #1 - Café  - $220

  // Billetera #2
  "4-7": "price_1SxXDeLvsh0tZvGv4WfrKAoR",   // Billetera #2 - Negro - $270
  "4-8": "price_1SxXDgLvsh0tZvGvcp6ohihx",   // Billetera #2 - Café  - $270

  // Cartera #1
  "5-9":  "price_1SxXDiLvsh0tZvGv0iQTRh70",  // Cartera #1 - Negro - $470
  "5-10": "price_1SxXDkLvsh0tZvGvKQaxYQO7",  // Cartera #1 - Café  - $470

  // Estuche de Lentes
  "6-11": "price_1SxXDmLvsh0tZvGvQ9Hijq0h",  // Estuche de Lentes - Negro - $190
  "6-12": "price_1SxXDuLvsh0tZvGvmwUn5kF7",  // Estuche de Lentes - Café  - $190

  // Llavero
  "7-13": "price_1SxXE3Lvsh0tZvGvqk4LISdG",  // Llavero - Negro - Gancho  - $80
  "7-14": "price_1SxXE5Lvsh0tZvGvRoMGWHOo",  // Llavero - Negro - Argolla - $70
  "7-15": "price_1SxXE7Lvsh0tZvGv5lXoNOq2",  // Llavero - Café  - Gancho  - $80
  "7-16": "price_1SxXE9Lvsh0tZvGvG7497Zwd",  // Llavero - Café  - Argolla - $70

  // Guardacables
  "8-17": "price_1SxXECLvsh0tZvGvvKYJDgvt",  // Guardacables - Negro - Paquete de 3 - $50
  "8-18": "price_1SxXEELvsh0tZvGv8dcBYfqh",  // Guardacables - Negro - Paquete de 7 - $100
  "8-19": "price_1SxXEFLvsh0tZvGvHJQrOK4h",  // Guardacables - Café  - Paquete de 3 - $50
  "8-20": "price_1SxXEILvsh0tZvGvmLVcnJ2g",  // Guardacables - Café  - Paquete de 7 - $100

  // Monedero #1
  "9-21": "price_1SxXELLvsh0tZvGvurCq4XmE",  // Monedero #1 - Negro - $70
  "9-22": "price_1SxXEMLvsh0tZvGvv1PQ3Q70",  // Monedero #1 - Café  - $70

  // Neceser #1
  "10-23": "price_1SxXEQLvsh0tZvGvku5epHbC", // Neceser #1 - Negro - $370
  "10-24": "price_1SxXETLvsh0tZvGveoxaZYbh", // Neceser #1 - Café  - $370

  // Cinturón
  "11-25": "price_1SxXEWLvsh0tZvGv6rPhwE1X", // Cinturón - Negro - $490
  "11-26": "price_1SxXEXLvsh0tZvGvWxO0C9ZG"  // Cinturón - Café  - $490
}

// Función para obtener el Price ID de Stripe
export function obtenerStripePriceId(productoId: number, varianteId: number): string {
    const key = `${productoId}-${varianteId}`
    const priceId = stripePriceMapeo[key]
    
    if (!priceId || priceId === "price_XXXXX") {
        throw new Error(`No se encontró price_id para producto ${productoId}, variante ${varianteId}. Verifica que hayas configurado el mapeo en server/utils/stripe-mapeo.ts`)
    }
    
    return priceId
}



/*// Mapeo de productos a Price IDs TEST de Stripe

export const stripePriceMapeo: Record<string, string> = {
  // Tarjetero #1
  "1-1": "price_1SxAqhLG6hYYV4rMd9sYzIyT",   // Tarjetero #1 - Negro - $170
  "1-2": "price_1SxAuWLG6hYYV4rMeRq0shAd",   // Tarjetero #1 - Café  - $170

  // Tarjetero #2
  "2-3": "price_1SxAw0LG6hYYV4rM03ebv5Yn",   // Tarjetero #2 - Negro - $220
  "2-4": "price_1SxAxDLG6hYYV4rMwlKhpw8C",   // Tarjetero #2 - Café  - $220

  // Billetera #1
  "3-5": "price_1SxB0YLG6hYYV4rMEgLC6eqQ",   // Billetera #1 - Negro - $220
  "3-6": "price_1SxB20LG6hYYV4rMy3DDODQL",   // Billetera #1 - Café  - $220

  // Billetera #2
  "4-7": "price_1SxB3nLG6hYYV4rMsNprtDSN",   // Billetera #2 - Negro - $270
  "4-8": "price_1SxB5CLG6hYYV4rMMqU08aVB",   // Billetera #2 - Café  - $270

  // Cartera #1
  "5-9":  "price_1SxB7aLG6hYYV4rM40PgWxCd",  // Cartera #1 - Negro - $470
  "5-10": "price_1SxB9LLG6hYYV4rM6anbGRgj",  // Cartera #1 - Café  - $470

  // Estuche de Lentes
  "6-11": "price_1SxBApLG6hYYV4rM2o7gH8n8",  // Estuche de Lentes - Negro - $190
  "6-12": "price_1SxBCALG6hYYV4rMkPQMh2XI",  // Estuche de Lentes - Café  - $190

  // Llavero
  "7-13": "price_1SxBECLG6hYYV4rM2336ZtSX",  // Llavero - Negro - Gancho  - $80
  "7-14": "price_1SxBFhLG6hYYV4rMtbMjOqFG",  // Llavero - Negro - Argolla - $70
  "7-15": "price_1SxBHDLG6hYYV4rMLcsMCGEh",  // Llavero - Café  - Gancho  - $80
  "7-16": "price_1SxBImLG6hYYV4rMFQh6VNBc",  // Llavero - Café  - Argolla - $70

  // Guardacables
  "8-17": "price_1SxBLRLG6hYYV4rM1IVHQPAW",  // Guardacables - Negro - Paquete de 3 - $50
  "8-18": "price_1SxBNaLG6hYYV4rM1QWLcFv4",  // Guardacables - Negro - Paquete de 7 - $100
  "8-19": "price_1SxBRpLG6hYYV4rMopXB3YSF",  // Guardacables - Café  - Paquete de 3 - $50
  "8-20": "price_1SxBTZLG6hYYV4rMubwv6th7",  // Guardacables - Café  - Paquete de 7 - $100

  // Monedero #1
  "9-21": "price_1SxBUuLG6hYYV4rMpqXzw7eE",  // Monedero #1 - Negro - $70
  "9-22": "price_1SxBWNLG6hYYV4rM4MFTRIO1",  // Monedero #1 - Café  - $70

  // Neceser #1
  "10-23": "price_1SxBXmLG6hYYV4rMCPyGigUb", // Neceser #1 - Negro - $370
  "10-24": "price_1SxBaZLG6hYYV4rMn0mdot3U", // Neceser #1 - Café  - $370

  // Cinturón
  "11-25": "price_1SxBc7LG6hYYV4rMokwLGenE", // Cinturón - Negro - $490
  "11-26": "price_1SxBdkLG6hYYV4rMA75rX7Os"  // Cinturón - Café  - $490
}

// Función para obtener el Price ID de Stripe
export function obtenerStripePriceId(productoId: number, varianteId: number): string {
    const key = `${productoId}-${varianteId}`
    const priceId = stripePriceMapeo[key]
    
    if (!priceId || priceId === "price_XXXXX") {
        throw new Error(`No se encontró price_id para producto ${productoId}, variante ${varianteId}. Verifica que hayas configurado el mapeo en server/utils/stripe-mapeo.ts`)
    }
    
    return priceId
}
    */