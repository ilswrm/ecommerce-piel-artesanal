//Estructurasdel producto y variante

export interface Variante {
    id: number;
    color?: string;         //"Negro"  | "Café"
    textura?: string;       //"Lisa" | "Texturizada"
    tipo?: string;          // Para talla, modelo o paquete
    precio: number; 
}

export interface ImagenesProducto {
    'negro-lisa': string[];
    'negro-texturizada': string[];
    'cafe-lisa': string[] | null;
    'cafe-texturizada': string[] | null;
}

export interface Producto {
    id: number;
    slug: string;
    tipo: string;
    nombre: string;
    descripcion: string;
    materiales?: string;
    capacidad?: string;
    dimensiones?: string;
    imgs: ImagenesProducto;
    variantes: Variante[]; 
}

//Catálogo de los productos:  productos en total

const productos: Producto[] = [

    // ─── 1. CLUTCH ───────────────────────────────────────────────────────────
    {
        id: 1,
        slug: 'clutch',
        tipo: 'Clutch',
        nombre: 'Clutch',
        descripcion: 'Lleva tus esenciales con sofisticación. Este clutch ha sido diseñado para quienes aprecian la estética depurada y la artesanía impecable. Fabricado en piel de vacuno de primera calidad, es el accesorio definitivo para transitar del día a la noche con estilo.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '24cm x 13.5cm',
        imgs: {
    'negro-texturizada': [
        '/productos/clutch/clutch-negro-texturizada-1.webp',
        '/productos/clutch/clutch-negro-texturizada-2.webp',
        '/productos/clutch/clutch-negro-texturizada-3.webp',
        '/productos/clutch/clutch-negro-texturizada-4.webp',
    ],
    'negro-lisa': [
        '/productos/clutch/clutch-negro-lisa-1.webp',
        '/productos/clutch/clutch-negro-lisa-2.webp',
        '/productos/clutch/clutch-negro-lisa-3.webp',
    ],
    'cafe-texturizada': null,
    'cafe-lisa': null,
},
        variantes: [
            { id: 1,  color: 'Negro', textura: 'Lisa',        precio: 549 },
            { id: 2,  color: 'Café',  textura: 'Lisa',        precio: 549 },
            { id: 3,  color: 'Negro', textura: 'Texturizada', precio: 549 },
            { id: 4,  color: 'Café',  textura: 'Texturizada', precio: 549 },
        ]
    },

    // ─── 2. PORTA LAPTOP ─────────────────────────────────────────────────────
    {
        id: 2,
        slug: 'porta-laptop',
        tipo: 'Porta Laptop',
        nombre: 'Porta Laptop',
        descripcion: 'Este porta laptop ha sido diseñado para el profesional moderno que valora el minimalismo sin sacrificar la protección. Confeccionado en piel genuina de grano fino, es la combinación perfecta entre una funda protectora y un maletín ligero.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '24cm x 13.5cm',
        imgs: ['/productos/porta-laptop.webp', '/productos/porta-laptop-vista-1.webp'],
        variantes: [
            { id: 5,  color: 'Negro', textura: 'Lisa',        precio: 1149 },
            { id: 6,  color: 'Café',  textura: 'Lisa',        precio: 1149 },
            { id: 7,  color: 'Negro', textura: 'Texturizada', precio: 1149 },
            { id: 8,  color: 'Café',  textura: 'Texturizada', precio: 1149 },
        ]
    },

    // ─── 3. TRAY ─────────────────────────────────────────────────────────────
    {
        id: 3,
        slug: 'tray',
        tipo: 'Tray',
        nombre: 'Tray',
        descripcion: 'Este Valet Tray es la solución minimalista para mantener tus objetos personales en un solo lugar, ya sea en el recibidor de casa, en la mesa de noche o sobre tu escritorio de trabajo.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '17cm x 17cm',
        imgs: ['/productos/tray.webp', '/productos/tray-vista-1.webp', '/productos/tray-vista-2.webp'],
        variantes: [
            { id: 9,  color: 'Negro', textura: 'Lisa',        precio: 199 },
            { id: 10, color: 'Café',  textura: 'Lisa',        precio: 199 },
            { id: 11, color: 'Negro', textura: 'Texturizada', precio: 199 },
            { id: 12, color: 'Café',  textura: 'Texturizada', precio: 199 },
        ]
    },

    // ─── 4. SET PARA CUBIERTOS ───────────────────────────────────────────────
    {
        id: 4,
        slug: 'set-cubiertos',
        tipo: 'Set para Cubiertos',
        nombre: 'Set para Cubiertos',
        descripcion: 'Transforma una comida ordinaria en una experiencia de alta gama. Este portacubiertos artesanal es el accesorio definitivo para eventos exclusivos, picnics de lujo o para el profesional que prefiere llevar sus propios utensilios con estilo y pulcritud.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '22.5cm x 12.5cm',
        imgs: ['/productos/set-cubiertos.webp', '/productos/set-cubiertos-vista-1.webp'],
        variantes: [
            { id: 13, color: 'Negro', textura: 'Lisa',        precio: 100 },
            { id: 14, color: 'Café',  textura: 'Lisa',        precio: 100 },
            { id: 15, color: 'Negro', textura: 'Texturizada', precio: 100 },
            { id: 16, color: 'Café',  textura: 'Texturizada', precio: 100 },
        ]
    },

    // ─── 5. LLAVERO ──────────────────────────────────────────────────────────
    {
        id: 5,
        slug: 'llavero',
        tipo: 'Llaveros',
        nombre: 'Llavero',
        descripcion: 'Minimalista, útil y duradero. Nuestro llavero de piel vacuna queda perfecto con múltiples objetos como llaves, memorias y accesorios.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '12cm x 2cm',
        imgs: ['/productos/llavero.webp', '/productos/llavero-vista-1.webp'],
        variantes: [
            { id: 17, color: 'Negro', textura: 'Lisa',        precio: 49 },
            { id: 18, color: 'Café',  textura: 'Lisa',        precio: 49 },
            { id: 19, color: 'Negro', textura: 'Texturizada', precio: 49 },
            { id: 20, color: 'Café',  textura: 'Texturizada', precio: 49 },
        ]
    },

    // ─── 6. DESKMAT ──────────────────────────────────────────────────────────
    {
        id: 6,
        slug: 'deskmat',
        tipo: 'Deskmat',
        nombre: 'Deskmat',
        descripcion: 'Eleva tu espacio de trabajo con este desk mat de piel premium, diseñado para ofrecer una superficie suave y sofisticada que protege tu escritorio con estilo. Su estética minimalista y textura antideslizante proporcionan el equilibrio perfecto entre funcionalidad y elegancia.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: 'Grande: 55cm x 35cm | Pequeña: 35cm x 35cm',
        imgs: ['/productos/deskmat.webp', '/productos/deskmat-vista-1.webp', '/productos/deskmat-vista-2.webp'],
        variantes: [
            { id: 21, color: 'Negro', textura: 'Lisa',        tipo: '55cm x 35cm', precio: 699 },
            { id: 22, color: 'Café',  textura: 'Lisa',        tipo: '55cm x 35cm', precio: 699 },
            { id: 23, color: 'Negro', textura: 'Texturizada', tipo: '55cm x 35cm', precio: 699 },
            { id: 24, color: 'Café',  textura: 'Texturizada', tipo: '55cm x 35cm', precio: 699 },
            { id: 25, color: 'Negro', textura: 'Lisa',        tipo: '35cm x 35cm', precio: 469 },
            { id: 26, color: 'Café',  textura: 'Lisa',        tipo: '35cm x 35cm', precio: 469 },
            { id: 27, color: 'Negro', textura: 'Texturizada', tipo: '35cm x 35cm', precio: 469 },
            { id: 28, color: 'Café',  textura: 'Texturizada', tipo: '35cm x 35cm', precio: 469 },
        ]
    },

    // ─── 7. TOTES ────────────────────────────────────────────────────────────
    {
        id: 7,
        slug: 'totes',
        tipo: 'Totes',
        nombre: 'Totes',
        descripcion: 'Este tote bag fue diseñado para practicidad y un buen espacio para tus objetos incluyendo un bolsillo interno. Su silueta y acabados lo convierten en el accesorio perfecto para llevar todo lo esencial con un toque de distinción.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: 'Grande: 42cm x 35cm x 10cm | Pequeña: 33cm x 31cm x 8cm',
        imgs: ['/productos/totes.webp', '/productos/totes-vista-1.webp'],
        variantes: [
            { id: 29, color: 'Negro', textura: 'Lisa',        tipo: 'Grande',  precio: 1549 },
            { id: 30, color: 'Café',  textura: 'Lisa',        tipo: 'Grande',  precio: 1549 },
            { id: 31, color: 'Negro', textura: 'Texturizada', tipo: 'Grande',  precio: 1549 },
            { id: 32, color: 'Café',  textura: 'Texturizada', tipo: 'Grande',  precio: 1549 },
            { id: 33, color: 'Negro', textura: 'Lisa',        tipo: 'Pequeña', precio: 1149 },
            { id: 34, color: 'Café',  textura: 'Lisa',        tipo: 'Pequeña', precio: 1149 },
            { id: 35, color: 'Negro', textura: 'Texturizada', tipo: 'Pequeña', precio: 1149 },
            { id: 36, color: 'Café',  textura: 'Texturizada', tipo: 'Pequeña', precio: 1149 },
        ]
    },

    // ─── 8. FUNDA CELULAR ────────────────────────────────────────────────────
    {
        id: 8,
        slug: 'funda-celular',
        tipo: 'Funda Celular',
        nombre: 'Funda Celular',
        descripcion: 'Protege tu smartphone con elegancia gracias a esta funda de piel, que no solo resguarda tu dispositivo, sino que también se transforma en un práctico stand para disfrutar de contenido multimedia cómodamente.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        imgs: ['/productos/funda-celular.webp', '/productos/funda-celular-vista-1.webp'],
        variantes: [
            { id: 37, color: 'Negro', textura: 'Lisa',        tipo: 'iPhone 17 y similares',         precio: 159 },
            { id: 38, color: 'Café',  textura: 'Lisa',        tipo: 'iPhone 17 y similares',         precio: 159 },
            { id: 39, color: 'Negro', textura: 'Texturizada', tipo: 'iPhone 17 y similares',         precio: 159 },
            { id: 40, color: 'Café',  textura: 'Texturizada', tipo: 'iPhone 17 y similares',         precio: 159 },
            { id: 41, color: 'Negro', textura: 'Lisa',        tipo: 'iPhone 17 Pro Max y similares', precio: 159 },
            { id: 42, color: 'Café',  textura: 'Lisa',        tipo: 'iPhone 17 Pro Max y similares', precio: 159 },
            { id: 43, color: 'Negro', textura: 'Texturizada', tipo: 'iPhone 17 Pro Max y similares', precio: 159 },
            { id: 44, color: 'Café',  textura: 'Texturizada', tipo: 'iPhone 17 Pro Max y similares', precio: 159 },
        ]
    },

    // ─── 9. CINTURÓN ─────────────────────────────────────────────────────────
    {
        id: 9,
        slug: 'cinturon',
        tipo: 'Cinturones',
        nombre: 'Cinturón',
        descripcion: 'Cinturón de piel confeccionado completamente a mano con técnicas tradicionales. Cada detalle está cuidadosamente elaborado, asegurando durabilidad, estilo y un acabado único que mejora con el uso diario.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '3.7cm de ancho',
        imgs: ['/productos/cinturon.webp', '/productos/cinturon-vista-1.webp'],
        variantes: [
        { id: 45, color: 'Negro', textura: 'Lisa',        tipo: 'Chica',   precio: 649 },
        { id: 46, color: 'Negro', textura: 'Lisa',        tipo: 'Mediana', precio: 649 },
        { id: 47, color: 'Negro', textura: 'Lisa',        tipo: 'Grande',  precio: 649 },
        { id: 48, color: 'Café',  textura: 'Lisa',        tipo: 'Chica',   precio: 649 },
        { id: 49, color: 'Café',  textura: 'Lisa',        tipo: 'Mediana', precio: 649 },
        { id: 50, color: 'Café',  textura: 'Lisa',        tipo: 'Grande',  precio: 649 },
        { id: 51, color: 'Negro', textura: 'Texturizada', tipo: 'Chica',   precio: 649 },
        { id: 52, color: 'Negro', textura: 'Texturizada', tipo: 'Mediana', precio: 649 },
        { id: 53, color: 'Negro', textura: 'Texturizada', tipo: 'Grande',  precio: 649 },
        { id: 54, color: 'Café',  textura: 'Texturizada', tipo: 'Chica',   precio: 649 },
        { id: 55, color: 'Café',  textura: 'Texturizada', tipo: 'Mediana', precio: 649 },
        { id: 56, color: 'Café',  textura: 'Texturizada', tipo: 'Grande',  precio: 649 },
    ]
    },

     // ─── 10. PORTA PASAPORTE ─────────────────────────────────────────────────
    {
        id: 10,
        slug: 'porta-pasaporte',
        tipo: 'Porta Pasaporte',
        nombre: 'Porta Pasaporte',
        descripcion: 'Viaja con sofisticación y mantén tus documentos esenciales organizados con este portapasaporte de piel. Su diseño incluye múltiples ranuras para tarjetas y un compartimento específico para el pasaporte.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: '5 tarjetas, papelería y 1 pasaporte',
        dimensiones: '23cm x 14cm',
        imgs: ['/productos/porta-pasaporte.webp', '/productos/porta-pasaporte-vista-1.webp'],
        variantes: [
            { id: 57, color: 'Negro', textura: 'Lisa',        precio: 529 },
            { id: 58, color: 'Café',  textura: 'Lisa',        precio: 529 },
            { id: 59, color: 'Negro', textura: 'Texturizada', precio: 529 },
            { id: 60, color: 'Café',  textura: 'Texturizada', precio: 529 },
        ]
    },

    // ─── 11. PORTA PLUMAS ────────────────────────────────────────────────────
    {
        id: 11,
        slug: 'porta-plumas',
        tipo: 'Porta Plumas',
        nombre: 'Porta Plumas',
        descripcion: 'Organiza tus instrumentos de escritura con distinción en este portaplumas de piel genuina, diseñado con dos compartimentos individuales que evitan el roce y protegen cada pieza.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: '2 bolígrafos',
        dimensiones: '18cm x 7.5cm',
        imgs: ['/productos/porta-plumas.webp', '/productos/porta-plumas-vista-1.webp'],
        variantes: [
            { id: 61, color: 'Negro', textura: 'Lisa',        precio: 149 },
            { id: 62, color: 'Café',  textura: 'Lisa',        precio: 149 },
            { id: 63, color: 'Negro', textura: 'Texturizada', precio: 149 },
            { id: 64, color: 'Café',  textura: 'Texturizada', precio: 149 },
        ]
    },

    // ─── 12. NECESER 1 ───────────────────────────────────────────────────────
    {
        id: 12,
        slug: 'neceser-1',
        tipo: 'Neceseres',
        nombre: 'Neceser 1',
        descripcion: 'Organiza tus artículos esenciales con este neceser minimalista de piel con un bolsillo interno. Su estructura ligera lo convierte en el accesorio versátil ideal para mantener el orden en tu día a día.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '24cm x 17.5cm',
        imgs: ['/productos/neceser-1.webp', '/productos/neceser-1-vista-1.webp'],
        variantes: [
            { id: 65, color: 'Negro', textura: 'Lisa',        precio: 449 },
            { id: 66, color: 'Café',  textura: 'Lisa',        precio: 449 },
            { id: 67, color: 'Negro', textura: 'Texturizada', precio: 449 },
            { id: 68, color: 'Café',  textura: 'Texturizada', precio: 449 },
        ]
    },

    // ─── 13. NECESER 2 ───────────────────────────────────────────────────────
    {
        id: 13,
        slug: 'neceser-2',
        tipo: 'Neceseres',
        nombre: 'Neceser 2',
        descripcion: 'Organiza tus artículos esenciales con este neceser minimalista de piel con un bolsillo interno. Su estructura ligera lo convierte en el accesorio versátil ideal para mantener el orden en tu día a día con un toque de distinción.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '26cm x 20cm',
        imgs: ['/productos/neceser-2.webp', '/productos/neceser-2-vista-1.webp'],
        variantes: [
            { id: 69, color: 'Negro', textura: 'Lisa',        precio: 649 },
            { id: 70, color: 'Café',  textura: 'Lisa',        precio: 649 },
            { id: 71, color: 'Negro', textura: 'Texturizada', precio: 649 },
            { id: 72, color: 'Café',  textura: 'Texturizada', precio: 649 },
        ]
    },

    // ─── 14. MONEDERO 1 ──────────────────────────────────────────────────────
    {
        id: 14,
        slug: 'monedero-1',
        tipo: 'Monederos',
        nombre: 'Monedero 1',
        descripcion: 'Discreto y compacto, diseñado para guardarlo fácilmente en el bolsillo. Su forma triangular única lo convierte en una pieza artesanal con carácter propio.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '7cm x lado',
        imgs: ['/productos/monedero-1.webp', '/productos/monedero-1-vista-1.webp', '/productos/monedero-1-vista-2.webp'],
        variantes: [
            { id: 73, color: 'Negro', textura: 'Lisa',        precio: 70 },
            { id: 74, color: 'Café',  textura: 'Lisa',        precio: 70 },
            { id: 75, color: 'Negro', textura: 'Texturizada', precio: 70 },
            { id: 76, color: 'Café',  textura: 'Texturizada', precio: 70 },
        ]
    },

    // ─── 15. MONEDERO 2 ──────────────────────────────────────────────────────
    {
        id: 15,
        slug: 'monedero-2',
        tipo: 'Monederos',
        nombre: 'Monedero 2',
        descripcion: 'Simplifica tu día con este monedero, diseñado con un formato compacto y un broche de seguridad para mantener tus monedas y billetes organizados.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '10cm x 9cm',
        imgs: ['/productos/monedero-2.webp', '/productos/monedero-2-vista-1.webp', '/productos/monedero-2-vista-1.webp'],
        variantes: [
            { id: 77, color: 'Negro', textura: 'Lisa',        precio: 149 },
            { id: 78, color: 'Café',  textura: 'Lisa',        precio: 149 },
            { id: 79, color: 'Negro', textura: 'Texturizada', precio: 149 },
            { id: 80, color: 'Café',  textura: 'Texturizada', precio: 149 },
        ]
    },

    // ─── 16. JOYERO ──────────────────────────────────────────────────────────
    {
        id: 16,
        slug: 'joyero',
        tipo: 'Joyero',
        nombre: 'Joyero',
        descripcion: 'Protege y organiza tus piezas favoritas con este joyero de viaje tipo roll, confeccionado en piel con compartimentos especializados para anillos, aretes y collares.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '36.5cm x 18cm',
        imgs: ['/productos/joyero.webp', '/productos/joyero-vista-1.webp'],
        variantes: [
            { id: 81, color: 'Negro', textura: 'Lisa',        precio: 519 },
            { id: 82, color: 'Café',  textura: 'Lisa',        precio: 519 },
            { id: 83, color: 'Negro', textura: 'Texturizada', precio: 519 },
            { id: 84, color: 'Café',  textura: 'Texturizada', precio: 519 },
        ]
    },

    // ─── 17. BROCHES ─────────────────────────────────────────────────────────
    {
        id: 17,
        slug: 'broches',
        tipo: 'Organizadores',
        nombre: 'Broches',
        descripcion: 'Mantén tus cables ordenados y libres de enredos con nuestros broches de piel. Diseño compacto, discreto y duradero. Ideal para organizar tu espacio de trabajo, mochila o estuche de viaje.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '9cm x 2cm',
        imgs: ['/productos/broches.webp', '/productos/broches-vista-1.webp', '/productos/broches-vista-2.webp'],
        variantes: [
            { id: 85, color: 'Negro', textura: 'Lisa',        tipo: '3 unidades', precio: 50  },
            { id: 86, color: 'Café',  textura: 'Lisa',        tipo: '3 unidades', precio: 50  },
            { id: 87, color: 'Negro', textura: 'Texturizada', tipo: '3 unidades', precio: 50  },
            { id: 88, color: 'Café',  textura: 'Texturizada', tipo: '3 unidades', precio: 50  },
            { id: 89, color: 'Negro', textura: 'Lisa',        tipo: '7 unidades', precio: 100 },
            { id: 90, color: 'Café',  textura: 'Lisa',        tipo: '7 unidades', precio: 100 },
            { id: 91, color: 'Negro', textura: 'Texturizada', tipo: '7 unidades', precio: 100 },
            { id: 92, color: 'Café',  textura: 'Texturizada', tipo: '7 unidades', precio: 100 },
        ]
    },

    // ─── 18. ESTUCHE DE LENTES ───────────────────────────────────────────────
    {
        id: 18,
        slug: 'estuche-lentes',
        tipo: 'Estuches',
        nombre: 'Estuche de Lentes',
        descripcion: 'Diseñado para ser el protector perfecto para tus gafas: ligero y elegante, hace que proteger tus lentes sea simple y cómodo. Fabricado en piel vacuna, se adapta perfectamente a todas tus gafas.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '17cm x 7cm',
        imgs: ['/productos/estuche-lentes.webp', '/productos/estuche-lentes-vista-1.webp', '/productos/estuche-lentes-vista-2.webp'],
        variantes: [
            { id: 93,  color: 'Negro', textura: 'Lisa',        precio: 169 },
            { id: 94,  color: 'Café',  textura: 'Lisa',        precio: 169 },
            { id: 95,  color: 'Negro', textura: 'Texturizada', precio: 169 },
            { id: 96,  color: 'Café',  textura: 'Texturizada', precio: 169 },
        ]
    },

    // ─── 19. BILLETERA 1 ─────────────────────────────────────────────────────
    {
        id: 19,
        slug: 'billetera-1',
        tipo: 'Billeteras',
        nombre: 'Billetera 1',
        descripcion: 'Billetera compacta atemporal y única. Nuestra billetera confeccionada completamente en piel con diseño estilo bifold permite guardar billetes de todos tamaños y su fácil acceso deslizando a través de su ranura central. Cuenta con ranuras para colocar tarjetas de uso frecuente.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: 'Capacidad para 4 a 6 tarjetas bancarias y de presentación, con un slot para efectivo',
        dimensiones: '10cm x 7.3cm',
        imgs: ['/productos/billetera-1.webp', '/productos/billetera-1-vista-1.webp', '/productos/billetera-1-vista-2.webp'],
        variantes: [
            { id: 97,  color: 'Negro', textura: 'Lisa',        precio: 199 },
            { id: 98,  color: 'Café',  textura: 'Lisa',        precio: 199 },
            { id: 99,  color: 'Negro', textura: 'Texturizada', precio: 199 },
            { id: 100, color: 'Café',  textura: 'Texturizada', precio: 199 },
        ]
    },

    // ─── 20. BILLETERA 2 ─────────────────────────────────────────────────────
    {
        id: 20,
        slug: 'billetera-2',
        tipo: 'Billeteras',
        nombre: 'Billetera 2',
        descripcion: 'Billetera trifold atemporal y única en su diseño. Confeccionada completamente en piel con diseño estilo trifold permite guardar billetes de todos tamaños con un fácil acceso y seguro por diseño. Cuenta con dos compartimentos con una gran capacidad de tarjetas en comparación a su grosor. Cuenta con ranuras para colocar tarjetas de uso frecuente en el primer slot.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: 'Capacidad para 6 a 12 tarjetas bancarias y de presentación, con un slot para efectivo',
        dimensiones: '10cm x 7.5cm',
        imgs: ['/productos/billetera-2.webp', '/productos/billetera-2-vista-1.webp', '/productos/billetera-2-vista-2.webp'],
        variantes: [
            { id: 101, color: 'Negro', textura: 'Lisa',        precio: 269 },
            { id: 102, color: 'Café',  textura: 'Lisa',        precio: 269 },
            { id: 103, color: 'Negro', textura: 'Texturizada', precio: 269 },
            { id: 104, color: 'Café',  textura: 'Texturizada', precio: 269 },
        ]
    },

    // ─── 21. BILLETERA 3 ─────────────────────────────────────────────────────
    {
        id: 21,
        slug: 'billetera-3',
        tipo: 'Billeteras',
        nombre: 'Billetera 3',
        descripcion: 'Esta cartera fusiona la elegancia minimalista con la máxima funcionalidad, ofreciendo múltiples ranuras para tarjetas y un compartimento para billetes.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: '6 tarjetas y billetes',
        dimensiones: '10cm x 9.5cm',
        imgs: ['/productos/billetera-3.webp', '/productos/billetera-3-vista-1.webp'],
        variantes: [
            { id: 105, color: 'Negro', textura: 'Lisa',        precio: 299 },
            { id: 106, color: 'Café',  textura: 'Lisa',        precio: 299 },
            { id: 107, color: 'Negro', textura: 'Texturizada', precio: 299 },
            { id: 108, color: 'Café',  textura: 'Texturizada', precio: 299 },
        ]
    },

    // ─── 22. BILLETERA 4 ─────────────────────────────────────────────────────
    {
        id: 22,
        slug: 'billetera-4',
        tipo: 'Billeteras',
        nombre: 'Billetera 4',
        descripcion: 'Optimiza tu día a día con esta cartera. Un accesorio esencial de diseño atemporal y costuras reforzadas, ideal para quienes buscan durabilidad artesanal y un estilo impecable.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: '6 tarjetas y billetes',
        dimensiones: '10cm x 9.5cm',
        imgs: ['/productos/billetera-4.webp', '/productos/billetera-4-vista-1.webp', '/productos/billetera-4-vista-1.webp'],
        variantes: [
            { id: 109, color: 'Negro', textura: 'Lisa',        precio: 349 },
            { id: 110, color: 'Café',  textura: 'Lisa',        precio: 349 },
            { id: 111, color: 'Negro', textura: 'Texturizada', precio: 349 },
            { id: 112, color: 'Café',  textura: 'Texturizada', precio: 349 },
        ]
    },

    // ─── 23. TARJETERO 1 ─────────────────────────────────────────────────────
    {
        id: 23,
        slug: 'tarjetero-1',
        tipo: 'Tarjeteros',
        nombre: 'Tarjetero 1',
        descripcion: 'Un esencial en todos los aspectos. Cuenta con el espacio suficiente para tus básicos de diario como tarjetas e identificaciones. Su diseño y confección minimalista lo hacen perfecto para guardar en cualquier bolsillo.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '10cm x 6cm',
        imgs: ['/productos/tarjetero-1.webp', '/productos/tarjetero-1-vista-1.webp', '/productos/tarjetero-1-vista-1.webp'],
        variantes: [
            { id: 113, color: 'Negro', textura: 'Lisa',        precio: 149 },
            { id: 114, color: 'Café',  textura: 'Lisa',        precio: 149 },
            { id: 115, color: 'Negro', textura: 'Texturizada', precio: 149 },
            { id: 116, color: 'Café',  textura: 'Texturizada', precio: 149 },
        ]
    },

    // ─── 24. TARJETERO 2 ─────────────────────────────────────────────────────
    {
        id: 24,
        slug: 'tarjetero-2',
        tipo: 'Tarjeteros',
        nombre: 'Tarjetero 2',
        descripcion: 'Tarjetero clásico atemporal compacto. Cuenta con el espacio suficiente para tus básicos de diario como tarjetas y billetes. Su diseño y confección minimalista lo hacen perfecto para guardar en cualquier bolsillo.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '10cm x 7.3cm',
        imgs: ['/productos/tarjetero-2.webp', '/productos/tarjetero-2-vista-1.webp', '/productos/tarjetero-2-vista-2.webp'],
        variantes: [
            { id: 117, color: 'Negro', textura: 'Lisa',        precio: 219 },
            { id: 118, color: 'Café',  textura: 'Lisa',        precio: 219 },
            { id: 119, color: 'Negro', textura: 'Texturizada', precio: 219 },
            { id: 120, color: 'Café',  textura: 'Texturizada', precio: 219 },
        ]
    },

    // ─── 25. CARTERA 1 ───────────────────────────────────────────────────────
    {
        id: 25,
        slug: 'cartera-1',
        tipo: 'Carteras',
        nombre: 'Cartera 1',
        descripcion: 'Con su silueta alargada y diseño elegante, funcional y ligera, esta cartera de piel puede albergar toda una serie de objetos personales esenciales para acompañarte todos los días.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        dimensiones: '21.5cm x 10.3cm',
        imgs: ['/productos/cartera-1.webp', '/productos/cartera-1-vista-1.webp'],
        variantes: [
            { id: 121, color: 'Negro', textura: 'Lisa',        precio: 499 },
            { id: 122, color: 'Café',  textura: 'Lisa',        precio: 499 },
            { id: 123, color: 'Negro', textura: 'Texturizada', precio: 499 },
            { id: 124, color: 'Café',  textura: 'Texturizada', precio: 499 },
        ]
    },

    // ─── 26. CARTERA 2 ───────────────────────────────────────────────────────
    {
        id: 26,
        slug: 'cartera-2',
        tipo: 'Carteras',
        nombre: 'Cartera 2',
        descripcion: 'Lleva tus esenciales con total seguridad en esta cartera de piel diseñada con un sistema de broche para asegurar tu efectivo y ranuras de acceso rápido para tus tarjetas más importantes.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: 'Tarjeta y billetes',
        dimensiones: '18cm x 10.5cm',
        imgs: ['/productos/cartera-2.webp', '/productos/cartera-2-vista-1.webp', '/productos/cartera-2-vista-2.webp'],
        variantes: [
            { id: 125, color: 'Negro', textura: 'Lisa',        precio: 269 },
            { id: 126, color: 'Café',  textura: 'Lisa',        precio: 269 },
            { id: 127, color: 'Negro', textura: 'Texturizada', precio: 269 },
            { id: 128, color: 'Café',  textura: 'Texturizada', precio: 269 },
        ]
    },

    // ─── 27. CARTERA 3 ───────────────────────────────────────────────────────
    {
        id: 27,
        slug: 'cartera-3',
        tipo: 'Carteras',
        nombre: 'Cartera 3',
        descripcion: 'Lleva tus esenciales con total seguridad en esta cartera de piel diseñada con un sistema de broche para asegurar tu efectivo y ranuras de acceso rápido para tus tarjetas, además de un espacio para papelería.',
        materiales: 'Elaborado con piel vacuna 100% hecha a mano. Piel premium curtida artesanalmente.',
        capacidad: '2 a 4 tarjetas, billetes y papelería',
        dimensiones: '18cm x 10.5cm',
        imgs: ['/productos/cartera-3.webp', '/productos/cartera-3-vista-1.webp'],
        variantes: [
            { id: 129, color: 'Negro', textura: 'Lisa',        precio: 269 },
            { id: 130, color: 'Café',  textura: 'Lisa',        precio: 269 },
            { id: 131, color: 'Negro', textura: 'Texturizada', precio: 269 },
            { id: 132, color: 'Café',  textura: 'Texturizada', precio: 269 },
        ]
    },

]

// Exporta el catálogo de productos para ser utilizado por las páginas y los componentes
export default productos







//Catálogo de los productos: 11 productos en total
// const productos: Producto[] = [
//     {
//     id: 1,
//     slug: 'tarjetero-1',
//     tipo: 'Tarjeteros',
//     nombre: 'Tarjetero #1',
//     descripcion: 'Un esencial en todos los aspectos. Nuestro tarjetero #1 cuenta con el espacio suficiente para tus básicos de diario como tarjetas, identificaciones o incluso billetes. Su diseño y confección minimalista lo hacen perfecto para guardar en cualquier bolsillo.',
//     materiales: 'Elaborada en una sola pieza de piel 100% hecha a mano y un broche de latón oculto que ayuda a mantener la billetera cerrada dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
//     capacidad: 'Capacidad para 4 a 6 tarjetas bancarias y de presentación',
//     dimensiones: '7cm x 10cm x 1cm',
//             imgs: ['/productos/1-tarjetero-1.webp','/productos/1-tarjetero-1-vista-1.webp','/productos/1-tarjetero-1-vista-2.webp'],
//     variantes: [
//         {id: 1, color: 'Negro', precio: 170},
//         {id: 2, color: 'Café',precio: 170}
//     ]
//     },
//     {
//     id: 2,
//     slug:'tarjetero-2',
//     tipo: 'Tarjeteros',
//     nombre: 'Tarjetero #2',
//     descripcion: 'Tarjetero clásico atemporal compacto. Nuestro tarjetero #2 cuenta con el espacio suficiente para tus básicos de diario como tarjetas, billetes e identificación. Su diseño y confección minimalista lo hacen perfecto para guardar en cualquier bolsillo.',
//     materiales: 'Elaborada en piel 100% hecha a mano. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
//     capacidad: 'Capacidad para 3 a 5 tarjetas bancarias y de presentación, con un slot para efectivo doblado en el centro',
//     dimensiones: '7cm x 10cm x 0.5cm',
//             imgs: ['/productos/2-tarjetero-2.webp','/productos/2-tarjetero-2-vista-1.webp','/productos/2-tarjetero-2-vista-2.webp'],
//     variantes: [
//         {id: 3, color: 'Negro', precio: 220},
//         {id: 4, color: 'Café', precio: 220}
//     ]
//     },
//     {
//     id: 3,
//     slug:'billetera-1',
//     tipo: 'Billeteras',
//     nombre: 'Billetera #1',
//     descripcion: 'Billetera compacta atemporal y única. Nuestra billetera #1 confeccionada completamente en piel con diseño estilo bifold permite guardar billetes de todos tamaños y su fácil acceso deslizando a través de su ranura central. Cuenta con ranuras para colocar tarjetas de uso frecuente.',
//     materiales: 'Elaborada en piel 100% hecha a mano. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
//     capacidad: 'Capacidad para 4 a 6 tarjetas bancarias y de presentación, con un slot para efectivo',
//     dimensiones: '7.3cm x 10cm x 0.5cm',
//             imgs: ['/productos/3-billetera-1.webp','/productos/3-billetera-1-vista-1.webp','/productos/3-billetera-1-vista-2.webp','/productos/3-billetera-1-vista-3.webp'],
//     variantes: [
//         {id: 5, color: 'Negro', precio: 220},
//         {id: 6, color: 'Café', precio: 220}
//     ]
//     },
//     {
//     id: 4,
//     slug:'billetera-2',
//     tipo: 'Billeteras',
//     nombre: 'Billetera #2',
//     descripcion: 'Billetera trifold atemporal y única en su diseño. Nuestra billetera #2 confeccionada completamente en piel con diseño estilo trifold permite guardar billetes de todos tamaños con un fácil acceso y seguro por diseño. Cuenta con dos compartimentos con una gran capacidad de tarjetas en comparación a su grosor. Cuenta con ranuras para colocar tarjetas de uso frecuente en el primer slot.',
//     materiales: 'Elaborada en piel 100% hecha a mano. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
//     capacidad: 'Capacidad para 6 a 12 tarjetas bancarias y de presentación, con un slot para efectivo',
//     dimensiones: '7.7cm x 9.5cm x 0.8cm',
//             imgs: ['/productos/4-billetera-2.webp','/productos/4-billetera-2-vista-1.webp','/productos/4-billetera-2-vista-2.webp'],
//     variantes: [
//         {id: 7, color: 'Negro', precio: 270},
//         {id: 8, color: 'Café', precio: 270}
//     ]
//     },
//     {
//     id: 5,
//     slug:'cartera-1',
//     tipo: 'Carteras',
//     nombre: 'Cartera #1',
//     descripcion: 'Con su silueta alargada y su diseño elegante, funcional y ligera, esta elegante cartera de piel puede albergar toda una serie de objetos personales esenciales para acompañarte todos los días.',
//     materiales: 'Elaborada en piel 100% hecha a mano. Incluye broche de latón sólido oculto que ayuda a mantener la cartera cerrada, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
//     capacidad: 'Capacidad para 3 a 12 tarjetas, 1 compartimento para billetes, 1 para monedas y uno extra para celular',
//     dimensiones: '10.5cm x 21.5cm x 1.1cm',
//             imgs: ['/productos/5-cartera-1.webp','/productos/5-cartera-1-vista-1.webp','/productos/5-cartera-1-vista-2.webp'],
//     variantes: [
//         { id: 9, color: 'Negro', precio: 470},
//         { id: 10, color: 'Café', precio: 470}
//     ]
//     },
//     {
//     id: 6,
//     slug:'estuche-1',
//     tipo: 'Estuches',
//     nombre: 'Estuche de Lentes',
//     descripcion: 'Está diseñado para ser el protector perfecto para tus gafas: ligero y elegante, hace que proteger tus lentes sea simple y cómodo. Fabricado en una sola pieza de material, se adapta perfectamente a todas tus gafas, combinando funcionalidad con un diseño refinado.',
//     materiales: 'Elaborado en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el estuche cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario',
//     dimensiones: '16.5cm x 6cm x 1cm',
//             imgs: ['/productos/6-estuche-lentes-1.webp', '/productos/6-estuche-lentes-vista-1.webp'],
//     variantes: [
//         { id: 11, color: 'Negro', precio: 190},
//         {id: 12, color: 'Café', precio: 190}
//     ]
//     },
//     {
//     id: 7,
//     slug:'llavero-1',
//     tipo: 'Llaveros',
//     nombre: 'Llavero',
//     descripcion: 'Minimalista, útil y duradero. Nuestros llaveros de tipo correa quedan perfecto con múltiples objetos como llaves, memorias, accesorios, otras piezas, entre otros.',
//     materiales: 'Elaborados en piel 100% hecha a mano. Incluye gancho o argolla sólida que ayuda a cumplir su propósito en tu día a día. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
//     dimensiones: '8cm x 2cm x 0.3cm',
//             imgs: ['/productos/7-llavero-1.webp', '/productos/7-llavero-1-vista-1.webp'],
//     variantes: [
//         {id: 13, color: 'Negro', tipo: 'Gancho',precio: 80},
//         {id: 14, color: 'Negro', tipo: 'Argolla',precio: 70},
//         {id: 15, color: 'Café', tipo: 'Gancho', precio: 80},
//         {id: 16, color: 'Café', tipo: 'Argolla',precio: 70}
//     ]
//     },
//     {
//     id: 8,
//     slug:'guardacables-1',
//     tipo: 'Organizadores',
//     nombre: 'Guardacables',
//     descripcion: 'Mantén tus cables ordenados y libres de enredos con nuestros guardacables de piel. Diseño compacto, discreto y duradero. Ideal para organizar tu espacio de trabajo, mochila o estuche de viaje.',
//     materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el broche cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
//     dimensiones: '9cm x 2cm x 0.2cm',
//     imgs: ['/productos/8-guardacables-1.webp','/productos/8-guardacables-1-vista-1.webp','/productos/8-guardacables-1-vista-2.webp','/productos/8-guardacables-1-vista-3.webp'],
//     variantes: [
//         {id: 17, color: 'Negro', precio: 50, tipo: 'Paquete de 3'},
//         {id: 18, color: 'Negro', precio: 100, tipo: 'Paquete de 7'},
//         {id: 19, color: 'Café', precio: 50, tipo: 'Paquete de 3'},
//         {id: 20, color: 'Café', precio: 100, tipo: 'Paquete de 7'}
//     ]
//     },
//     {
//     id: 9,
//     slug:'monedero-1',
//     tipo: 'Monederos',
//     nombre: 'Monedero #1',
//     descripcion: 'Discreto y compacto, ideal para monedas, está diseñado para guardarlo discretamente en el bolsillo y que no sea excesivamente grande.',
//     materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido y remache sólido que ayuda a mantener el monedero cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
//     dimensiones: '8cm x 5cm x 0.8cm',
//     imgs: ['/productos/9-monedero-1.webp', '/productos/9-monedero-1-vista-1.webp'],
//     variantes: [
//         {id: 21, color: 'Negro',precio: 70},
//         {id: 22, color: 'Café', precio: 70}
//     ]
//     },
//     {
//     id: 10,
//     slug:'neceser-1',
//     tipo: 'Neceseres',
//     nombre: 'Neceser #1',
//     descripcion: 'Perfecto para viajar, gimnasio, maquillaje, documentos. Nuestro clásico neceser ha sido rediseñado para fácil acceso y mayor espacio para guardar tus productos de aseo personal, cosméticos y más, con el tamaño y forma ideal para acomodarse en cualquier maleta, bolso o mochila.',
//     materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el neceser cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
//     dimensiones: '23.9cm x 17.5cm x 0.3cm',
//     imgs: ['/productos/10-neceser-1.webp', '/productos/10-neceser-1-vista-1.webp'],
//     variantes: [
//         {id: 23, color: 'Negro', precio: 370},
//         {id: 24, color: 'Café', precio: 370}
//     ]
//     },
//     {
//     id: 11,
//     slug:'cinturon-1',
//     tipo: 'Cinturones',
//     nombre: 'Cinturón',
//     descripcion: 'Cinturón de piel confeccionado completamente a mano con técnicas tradicionales. Cada detalle está cuidadosamente elaborado, asegurando durabilidad, estilo y un acabado único que mejora con el uso diario.',
//     materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el cinturón cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
//     imgs: ['/productos/11-cinturon-1.webp', '/productos/11-cinturon-1-vista-1.webp'],
//     variantes: [
//         {id: 25, color: 'Negro', tipo: 'Chica', precio: 490},
//         {id: 26, color: 'Negro', tipo: 'Mediana', precio: 490},
//         {id: 27, color: 'Negro', tipo: 'Grande', precio: 490},
//         {id: 28, color: 'Café', tipo: 'Chica', precio: 490},
//         {id: 29, color: 'Café', tipo: 'Mediana', precio: 490},
//         {id: 30, color: 'Café', tipo: 'Grande', precio: 490}
//     ]
// }

// ]

// // Exporta el catálogo de productos para ser utilizado por las páginas y los componentes 
// export default productos;