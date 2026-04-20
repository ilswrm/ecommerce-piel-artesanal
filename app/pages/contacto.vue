<script setup>
useHead({
    title: 'Contacto | Piel Artesanal',
})
</script>

<template>
    <main class="contacto">
        <section class="contacto-section">

            <div class="contacto-left">
                <h1 class="contacto-titulo">Contacto</h1>
            </div>

            <div class="contacto-right">
                <div class="contacto-intro">
                    <p>¿Tienes dudas sobre un pedido, quieres personalizar una pieza o simplemente quieres saber más sobre nuestro proceso artesanal? Escríbenos.</p>
                </div>
                <div class="contacto-info">
                    <p class="contacto-label">Correo</p>
                    <a href="mailto:piel.jm.estudio@gmail.com" class="contacto-valor contacto-link">
                        piel.jm.estudio@gmail.com
                    </a>
                </div>

                <div class="contacto-info">
                    <p class="contacto-label">Horario</p>
                    <p class="contacto-valor">Lunes a Viernes · 9:00 AM — 6:00 PM</p>
                </div>

                <div class="contacto-info">
                    <p class="contacto-label">Ubicación</p>
                    <p class="contacto-valor">Estado de México · Piel curtida en Jalisco</p>
                </div>

                <div class="contacto-social">
                    <a href="https://www.facebook.com/share/1U322WEaNS/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="social-link">
                        <UIcon name="i-simple-icons-facebook" class="social-icon" />
                    </a>
                </div>
            </div>

        </section>
    </main>
</template>

<style scoped>
.contacto {
    padding-top: 0;
    min-height: 82vh;
    display: flex;
    align-items: center;
}

.contacto-section {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.contacto-titulo {
    font-family: var(--font-title);
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    margin: 0;
}
.contacto-intro {
    margin-bottom: 2rem;
}

.contacto-intro p {
    font-size: 1rem;
    line-height: 1.8;
    margin: 0;
}
.contacto-info {
    margin-bottom: 2rem;
}

.contacto-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 2px;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
}

.contacto-valor {
    font-size: 1.1rem;
    color: var(--color-text);
    margin: 0;
}

.contacto-link {
    font-size: 1.1rem;
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid #1a1a1a;
    padding-bottom: 1px;
    transition: opacity 0.2s ease;
}

.contacto-link:hover {
    opacity: 0.5;
}

.contacto-social {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
}

.social-link {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--color-text);
    text-decoration: none;
    text-transform: lowercase;
    transition: opacity 0.2s ease;
}

.social-link:hover {
    opacity: 0.4;
}
.social-icon {
    width: 1.4rem;
    height: 1.4rem;
}

@media (min-width: 768px) {
    .contacto-section {
        flex-direction: row;
        align-items: center; /* cambia esto a: */
        align-items: flex-start;
        gap: 6rem;
        padding: calc(var(--space-lg) * 1.5);
    }

    .contacto-titulo {
        font-size: 3rem;
    }

    .contacto-left {
        flex: 1;
        padding-top: 7rem;
    }

    .contacto-right {
        flex: 1;
    }
}

@media (min-width: 1024px) {
    .contacto-section {
        padding: calc(var(--space-lg) * 2);
    }

    .contacto-titulo {
        font-size: 4rem;
    }
}
</style>