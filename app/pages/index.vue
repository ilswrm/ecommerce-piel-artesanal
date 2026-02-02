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
            <div class="hero-content">
                <h1 class="title">Piel Artesanal Mexicana 100% Hecha a Mano</h1>
                <p>Descubre nuestra exclusiva colección de productos de piel premium elaborados por artesanos jaliscienses. Cada pieza es única, con carácter que se adapta a tu uso diario.</p>
            </div>
        </section>
        </header>

    <main>
        
        <Catalogo/>

        <section id="why-us">
            <h3>NUESTRO COMPROMISO</h3>
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

        <section id="contacto" class="contact-section">
            <div class="contact-container">
                <div class="contact-card">
                <div class="contact-header">
                    <h3><span class="contact-subtitle">COMPRAS Y PEDIDOS</span></h3>
                    <h2 class="contact-title">Información de Contacto</h2>
                    <p class="contact-description">¿Interesado en nuestros productos de piel artesanal o tienes preguntas sobre personalización? Contáctanos directamente por WhatsApp.</p>
                </div>

                <div class="contact-materials">
                    <strong>Materiales:</strong> Todos nuestros productos están elaborados en piel 100% hecha a mano. Piel premium curtida artesanalmente en Jalisco.
                </div>

                <div class="contact-button-wrap">
                    <a
                        href="https://wa.me/5215569360654?text=Hola%2C%20estoy%20interesado%20en%20los%20productos%20de%20piel%20artesanal%20mexicana%20hechos%20a%20mano"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="whatsapp-btn"
                    >
                        <span class="whatsapp-btn-icon">💬</span>
                        Contactar por WhatsApp
                    </a>
                </div>

                <p class="contact-horario">Horario de atención: Lunes a Viernes de 9:00 AM a 6:00 PM</p>
                </div>
            </div>
        </section>
    </main>

    <footer id="footer" class="footer">
        <div class="footer-container">
            <div class="footer-grid">

                <div class="footer-section">
                    <h3 class="footer-title">Piel Artesanal Mexicana</h3>
                    <p>Cada pieza se fabrica individualmente a mano con materiales de la más alta calidad y durabilidad. Los detalles y colores pueden variar entre cada pieza como resultado de su proceso de manufactura, lo que la hace única.</p>
                    <div class="footer-social">
                        <a href="https://wa.me/5215569360654" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Contactar por WhatsApp">
                            💬
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">Contacto</h3>
                    <ul class="footer-list">
                        <li>
                            <span class="footer-list-icon">💬</span>
                            Contacto por WhatsApp
                        </li>
                        <li>
                            <span class="footer-list-icon">📍</span>
                            Piel de Jalisco, México
                        </li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3 class="footer-title">Información Importante</h3>
                    <ul class="footer-list">
                        <li>
                            <span class="footer-list-icon">✓</span>
                            Envíos 100% seguros
                        </li>
                        <li>
                            <span class="footer-list-icon">✓</span>
                            Hecho 100% a mano
                        </li>
                        <li>
                            <span class="footer-list-icon">✓</span>
                            Productos únicos
                        </li>
                    </ul>
                </div>

            </div>

            <div class="footer-copyright">
                <p>© 2026 Catálogo de Piel Artesanal. Productos 100% hechos a mano en México. Todos los derechos reservados.</p>
                <p class="footer-copyright-sub">Piel premium curtida artesanalmente en Jalisco, incentivando el comercio local.</p>
            </div>
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
    color: #FFFFFF;
    text-shadow: 5px 5px 20px #000000;
    min-height: 50vh;
    padding: var(--space-lg);
    background-image: url('~/assets/images/piel-artesanal-hero-1.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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

.hero-content {
    max-width: 700px;
    margin: 0 auto;
}

#hero .title {
    margin: var(--space-sm) 0;
}

#why-us{
    background-color: var(--color-text);
    text-align: center;
    color: var(--color-background);
}
#why-us h3 :nth-child(1){
        letter-spacing: 2px;
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
    margin-bottom: 1rem;
    font-family: var(--font-title);
}

.beneficios-card p {
    line-height: 1.6;
}

.contact-section {
    padding: 4rem 1.5rem;
}

.contact-container {
    max-width: 580px;
    margin: 0 auto;
    text-align: center;
}

.contact-card {
    background: #ffffff;
    border-radius: 1.25rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid #ebe6e1;
    padding: 2.75rem 2rem 2rem;
}

.contact-subtitle {
    display: inline-flex;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
}

.contact-title {
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
}

.contact-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 48px;
    height: 3px;
    background-color: #1a1a1a;
    border-radius: 2px;
}

.contact-description {
    color: #555;
    line-height: 1.7;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;
}

.contact-materials {
    background: #fff;
    border: 1px solid #e5e0dc;
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.75rem;
    text-align: left;
    font-size: 0.9rem;
    color: #444;
    line-height: 1.6;
}

.contact-materials strong {
    color: #1a1a1a;
}

.contact-button-wrap {
    margin-bottom: 1.25rem;
}

.whatsapp-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #25D366;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    padding: 0.75rem 1.75rem;
    border-radius: 9999px;
    text-decoration: none;
    transition: background-color 0.2s ease, transform 0.15s ease;
}

.whatsapp-btn:hover {
    background-color: #1ead59;
    transform: translateY(-1px);
}

.whatsapp-btn-icon {
    font-size: 1.2rem;
}

.contact-horario {
    font-size: 0.85rem;
    color: #888;
    margin-top: 0.25rem;
}

.footer {
    background-color: #111111;
    color: #ffffff;
    padding: 3rem 1.5rem 2rem;
}

.footer-container {
    max-width: 1100px;
    margin: 0 auto;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
}

@media (min-width: 640px) {
    .footer-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }
}

.footer-title {
    font-weight: 700;
    color: #fff;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.6rem;
}

.footer-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 36px;
    height: 2px;
    background-color: #FFFFFF;
    border-radius: 1px;
}

.footer-section p {
    font-size: 1rem;
    line-height: 1.7;
}

.footer-social {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
}

.footer-social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
    transition: background 0.2s ease;
}

.footer-social-link:hover {
    background: #25D366;
}

.footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-list li {
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1rem;
    padding: 0.35rem 0;
}

.footer-list-icon {
    font-size: 0.9rem;
    flex-shrink: 0;
}

.footer-copyright {
    border-top: 1px solid rgba(255,255,255,0.1);
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    text-align: center;
}

.footer-copyright p {
    font-size: 0.7rem;
    color: #FFFFFF99;
    line-height: 1.6;
}

.footer-copyright-sub {
    margin-top: 0.4rem;
    opacity: 0.6;
}



</style>