<script setup>
import Catalogo from '~/components/catalogo.vue'
useHead({
    title: 'Piel Artesanal | Catálogo',
})
</script>

<template>
    <div>
        
        <header>
        <section id="hero">
            <h1 class="title">Piel Artesanal Mexicana 100% Hecha a Mano</h1>
            <p>Descubre nuestra exclusiva colección de productos de piel premium elaborados por artesanos jaliscienses. Cada pieza es única, con carácter que se adapta a tu uso diario.</p>
        </section>
        </header>

    <main>
        
        <Catalogo/>

        <section id="why-us">
            <h3>Nuestro compromiso</h3>
            <h2 class="title">¿Por qué nuestros productos?</h2>
            <div class="w-16 h-1 bg-white my-8 mx-auto"></div>
            <div class="beneficios-card">
                <article>
                    <h3>Artesanía Jalisciense</h3>
                    <p>Piel elaborada en tenerías jaliscienses, incentivando el comercio local y preservando técnicas tradicionales mexicanas.</p>
                </article>
                <article>
                    <h3>100% Hecho a mano</h3>
                    <p>Cada producto es elaborado completamente a mano, asegurando atención meticulosa a cada detalle y costura.</p>
                </article>
                <article>
                    <h3>Piel con Carácter</h3>
                    <p>Con el paso del tiempo, notarás que cada pieza irá tomando más carácter y adaptándose a tu uso diario, haciéndose única.</p>
                </article>
            </div>
        </section>
    </main>
        
    <footer id="contacto">
    <article>
        <h3 class="title">Contacto</h3>
        <div class="w-16 h-1 bg-black my-8"></div>
        <p>
            <a href="https://wa.me/525569360654" target="_blank" rel="noopener noreferrer" class="whatsapp-link">
                Contáctanos en whatsapp!
            </a>
        </p>
        <a class="mail" href="mailto:piel.mj.estudio@gmail.com
        ?subject=Consulta%20sobre%20productos
        &body=Hola,%20me%20interesa%20saber%20más%20sobre%20sus%20productos.">
        piel.mj.estudio@gmail.com
        </a>
        <p>Jalisco, México</p>
    </article>
    <article>
        <h3 class="title">Información Importante</h3>
        <div class="w-16 h-1 bg-black my-8"></div>
        <p>Envíos 100% seguros</p>
        <p>Hecho 100% a mano</p>
        <p>Productos únicos</p>
    </article>
    <div class="footer-texto">
        <p>© 2026 Catálogo de Piel Artesanal. Productos 100% hechos a mano en México. Todos los derechos reservados.</p>
        <p>Piel premium curtida artesanalmente en Jalisco, incentivando el comercio local.</p>
    </div>
</footer>
    </div>
</template>

<style scoped>
#hero{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 60vh;
    padding: var(--space-lg);
    background-color: #FAF6F3;
    position: relative;

}

#hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 0;
}

#hero > * {
    position: relative;
    z-index: 1;
}

#hero .title {
    margin: var(--space-sm) 0;
}

#why-us{
    background-color: var(--color-text);
    text-align: center;
    color: var(--color-background);
}

.beneficios-card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}
.beneficios-card article {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px); 
    border-radius: 1.5rem;
    padding: 2rem 1.5rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    transition: transform 0.3s, box-shadow 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.2)
}
.beneficios-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.beneficios-card p {
    line-height: 1.6;
}

footer#contacto {
    background-color: #FAF6F4;
    padding: 3rem 1rem;
}
footer#contacto article {
    margin-bottom: 2rem; 
}
footer#contacto p {
    margin: 0.25rem 0; 
}
footer .mail{
    font-weight: bold;
}
footer .whatsapp-link {
    color: #25D366; 
    font-weight: bold;
    text-decoration: none;
}

footer#contacto a:hover {
    text-decoration: underline;
}

.footer-texto {
    border-top: 1px solid #555555; 
}
.footer-texto p{
    font-size: .65rem;
}

footer#contacto > * {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    #hero {
        background-attachment: fixed;
    }
    footer#contacto {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 4rem 2rem;
    }

    footer#contacto article {
        flex: 0 0 45%;
    }

    .footer-texto {
        flex: 0 0 100%;
        border-top: 1px solid #444; 
        padding-top: 1rem;
        margin-top: 2rem;
        color: #666;
    
}
}



</style>