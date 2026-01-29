export interface Variante {
    id: number;
    color?: string;
    tipo?: string; 
    precio: number; 
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
    imgs: string[];
    variantes: Variante[]; 
}

const productos: Producto[] = [
    {
    id: 1,
    slug: 'tarjetero-1',
    tipo: 'Tarjeteros',
    nombre: 'Tarjetero #1',
    descripcion: 'Un esencial en todos los aspectos. Nuestro tarjetero #1 cuenta con el espacio suficiente para tus básicos de diario como tarjetas, identificaciones o incluso billetes. Su diseño y confección minimalista lo hacen perfecto para guardar en cualquier bolsillo.',
    materiales: 'Elaborada en una sola pieza de piel 100% hecha a mano y un broche de latón oculto que ayuda a mantener la billetera cerrada dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
    capacidad: 'Capacidad para 4 a 6 tarjetas bancarias y de presentación',
    dimensiones: '7cm x 10cm x 1cm',
            imgs: ['/productos/1-tarjetero-1.webp','/productos/1-tarjetero-1-vista-1.webp','/productos/1-tarjetero-1-vista-2.webp'],
    variantes: [
        {id: 1, color: 'Negro', precio: 170},
        {id: 2, color: 'Café',precio: 170}
    ]
    },
    {
    id: 2,
    slug:'tarjetero-2',
    tipo: 'Tarjeteros',
    nombre: 'Tarjetero #2',
    descripcion: 'Tarjetero clásico atemporal compacto. Nuestro tarjetero #2 cuenta con el espacio suficiente para tus básicos de diario como tarjetas, billetes e identificación. Su diseño y confección minimalista lo hacen perfecto para guardar en cualquier bolsillo.',
    materiales: 'Elaborada en piel 100% hecha a mano. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
    capacidad: 'Capacidad para 3 a 5 tarjetas bancarias y de presentación, con un slot para efectivo doblado en el centro',
    dimensiones: '7cm x 10cm x 0.5cm',
            imgs: ['/productos/2-tarjetero-2.webp','/productos/2-tarjetero-2-vista-1.webp','/productos/2-tarjetero-2-vista-2.webp'],
    variantes: [
        {id: 3, color: 'Negro', precio: 220},
        {id: 4, color: 'Café', precio: 220}
    ]
    },
    {
    id: 3,
    slug:'billetera-1',
    tipo: 'Billeteras',
    nombre: 'Billetera #1',
    descripcion: 'Billetera compacta atemporal y única. Nuestra billetera #1 confeccionada completamente en piel con diseño estilo bifold permite guardar billetes de todos tamaños y su fácil acceso deslizando a través de su ranura central. Cuenta con ranuras para colocar tarjetas de uso frecuente.',
    materiales: 'Elaborada en piel 100% hecha a mano. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
    capacidad: 'Capacidad para 4 a 6 tarjetas bancarias y de presentación, con un slot para efectivo',
    dimensiones: '7.3cm x 10cm x 0.5cm',
            imgs: ['/productos/3-billetera-1.webp','/productos/3-billetera-1-vista-1.webp','/productos/3-billetera-1-vista-2.webp','/productos/3-billetera-1-vista-3.webp'],
    variantes: [
        {id: 5, color: 'Negro', precio: 220},
        {id: 6, color: 'Café', precio: 220}
    ]
    },
    {
    id: 4,
    slug:'billetera-2',
    tipo: 'Billeteras',
    nombre: 'Billetera #2',
    descripcion: 'Billetera trifold atemporal y única en su diseño. Nuestra billetera #2 confeccionada completamente en piel con diseño estilo trifold permite guardar billetes de todos tamaños con un fácil acceso y seguro por diseño. Cuenta con dos compartimentos con una gran capacidad de tarjetas en comparación a su grosor. Cuenta con ranuras para colocar tarjetas de uso frecuente en el primer slot.',
    materiales: 'Elaborada en piel 100% hecha a mano. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
    capacidad: 'Capacidad para 6 a 12 tarjetas bancarias y de presentación, con un slot para efectivo',
    dimensiones: '7.7cm x 9.5cm x 0.8cm',
            imgs: ['/productos/4-billetera-2.webp','/productos/4-billetera-2-vista-1.webp','/productos/4-billetera-2-vista-2.webp'],
    variantes: [
        {id: 7, color: 'Negro', precio: 270},
        {id: 8, color: 'Café', precio: 270}
    ]
    },
    {
    id: 5,
    slug:'cartera-1',
    tipo: 'Carteras',
    nombre: 'Cartera #1',
    descripcion: 'Con su silueta alargada y su diseño elegante, funcional y ligera, esta elegante cartera de piel puede albergar toda una serie de objetos personales esenciales para acompañarte todos los días.',
    materiales: 'Elaborada en piel 100% hecha a mano. Incluye broche de latón sólido oculto que ayuda a mantener la cartera cerrada, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario.',
    capacidad: 'Capacidad para 3 a 12 tarjetas, 1 compartimento para billetes, 1 para monedas y uno extra para celular',
    dimensiones: '10.5cm x 21.5cm x 1.1cm',
            imgs: ['/productos/5-cartera-1.webp','/productos/5-cartera-1-vista-1.webp','/productos/5-cartera-1-vista-2.webp'],
    variantes: [
        { id: 9, color: 'Negro', precio: 470},
        { id: 10, color: 'Café', precio: 470}
    ]
    },
    {
    id: 6,
    slug:'estuche-1',
    tipo: 'Estuches',
    nombre: 'Estuche de Lentes',
    descripcion: 'Está diseñado para ser el protector perfecto para tus gafas: ligero y elegante, hace que proteger tus lentes sea simple y cómodo. Fabricado en una sola pieza de material, se adapta perfectamente a todas tus gafas, combinando funcionalidad con un diseño refinado.',
    materiales: 'Elaborado en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el estuche cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irá tomando más carácter y adaptándose a tu uso diario',
    dimensiones: '16.5cm x 6cm x 1cm',
            imgs: ['/productos/6-estuche-lentes-1.webp', '/productos/6-estuche-lentes-vista-1.webp'],
    variantes: [
        { id: 11, color: 'Negro', precio: 190},
        {id: 12, color: 'Café', precio: 190}
    ]
    },
    {
    id: 7,
    slug:'llavero-1',
    tipo: 'Llaveros',
    nombre: 'Llavero',
    descripcion: 'Minimalista, útil y duradero. Nuestros llaveros de tipo correa quedan perfecto con múltiples objetos como llaves, memorias, accesorios, otras piezas, entre otros.',
    materiales: 'Elaborados en piel 100% hecha a mano. Incluye gancho o argolla sólida que ayuda a cumplir su propósito en tu día a día. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
    dimensiones: '8cm x 2cm x 0.3cm',
            imgs: ['/productos/7-llavero-1.webp', '/productos/7-llavero-1-vista-1.webp'],
    variantes: [
        {id: 13, color: 'Negro', tipo: 'Gancho',precio: 80},
        {id: 14, color: 'Negro', tipo: 'Argolla',precio: 70},
        {id: 15, color: 'Café', tipo: 'Gancho', precio: 80},
        {id: 16, color: 'Café', tipo: 'Argolla',precio: 70}
    ]
    },
    {
    id: 8,
    slug:'guardacables-1',
    tipo: 'Organizadores',
    nombre: 'Guardacables',
    descripcion: 'Mantén tus cables ordenados y libres de enredos con nuestros guardacables de piel. Diseño compacto, discreto y duradero. Ideal para organizar tu espacio de trabajo, mochila o estuche de viaje.',
    materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el broche cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
    dimensiones: '9cm x 2cm x 0.2cm',
    imgs: ['/productos/8-guardacables-1.webp','/productos/8-guardacables-1-vista-1.webp','/productos/8-guardacables-1-vista-2.webp','/productos/8-guardacables-1-vista-3.webp'],
    variantes: [
        {id: 17, color: 'Negro', precio: 50, tipo: 'Paquete de 3'},
        {id: 18, color: 'Negro', precio: 100, tipo: 'Paquete de 7'},
        {id: 19, color: 'Café', precio: 50, tipo: 'Paquete de 3'},
        {id: 20, color: 'Café', precio: 100, tipo: 'Paquete de 7'}
    ]
    },
    {
    id: 9,
    slug:'monedero-1',
    tipo: 'Monederos',
    nombre: 'Monedero #1',
    descripcion: 'Discreto y compacto, ideal para monedas, está diseñado para guardarlo discretamente en el bolsillo y que no sea excesivamente grande.',
    materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido y remache sólido que ayuda a mantener el monedero cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
    dimensiones: '8cm x 5cm x 0.8cm',
    imgs: ['/productos/9-monedero-1.webp', '/productos/9-monedero-1-vista-1.webp'],
    variantes: [
        {id: 21, color: 'Negro',precio: 70},
        {id: 22, color: 'Café', precio: 70}
    ]
    },
    {
    id: 10,
    slug:'neceser-1',
    tipo: 'Neceseres',
    nombre: 'Neceser #1',
    descripcion: 'Perfecto para viajar, gimnasio, maquillaje, documentos. Nuestro clásico neceser ha sido rediseñado para fácil acceso y mayor espacio para guardar tus productos de aseo personal, cosméticos y más, con el tamaño y forma ideal para acomodarse en cualquier maleta, bolso o mochila.',
    materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el neceser cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
    dimensiones: '23.9cm x 17.5cm x 0.3cm',
    imgs: ['/productos/10-neceser-1.webp', '/productos/10-neceser-1-vista-1.webp'],
    variantes: [
        {id: 23, color: 'Negro', precio: 370},
        {id: 24, color: 'Café', precio: 370}
    ]
    },
    {
    id: 11,
    slug:'cinturon-1',
    tipo: 'Cinturones',
    nombre: 'Cinturón',
    descripcion: 'Cinturón de piel confeccionado completamente a mano con técnicas tradicionales. Cada detalle está cuidadosamente elaborado, asegurando durabilidad, estilo y un acabado único que mejora con el uso diario.',
    materiales: 'Elaborados en piel 100% hecha a mano. Incluye broche de latón sólido que ayuda a mantener el cinturón cerrado, dándole más firmeza. Piel premium curtida artesanalmente. Con el paso del tiempo, notarás que irán tomando más carácter y adaptándose a tu uso diario.',
    dimensiones: 'CH: 74-82cm, M: 82-90cm, G: 90-98.5cm',
    imgs: ['/productos/11-cinturon-1.webp', '/productos/11-cinturon-1-vista-1.webp'],
    variantes: [
        {id: 25, color: 'Negro',precio: 490},
        {id: 26, color: 'Café',precio: 490}
    ]
    }

]


export default productos;