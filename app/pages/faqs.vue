<script setup>
useHead({
    title: "FAQ's | Piel Artesanal",
})
</script>

<template>
    <main class="faqs">
        <div class="page-header">
            <h1 class="page-titulo">Preguntas Frecuentes</h1>
        </div>

        <section class="faqs-section">
            <article class="faq-item">
                <h3 class="faq-pregunta">¿Cuánto tiempo tarda la producción y el envío?</h3>
                <p class="faq-respuesta">Los tiempos de entrega pueden variar entre 7 y 15 días hábiles, dependiendo del destino. Cada producto está hecho a mano y requiere hasta 5 días hábiles de elaboración antes de estar listo para su envío. Una vez que tu pedido haya sido enviado, recibirás la información de seguimiento por correo electrónico.</p>
                <p class="faq-respuesta">Cada pieza es artesanal, por lo que agradecemos tu paciencia.</p>
            </article>

            <article class="faq-item">
                <h3 class="faq-pregunta">¿Dónde se fabrican sus artículos?</h3>
                <p class="faq-respuesta">Todos nuestros artículos se producen en México. Contamos con un taller en el Estado de México. Cada etapa, desde el curtido, corte y ensamblaje hasta los acabados finales, es realizada por nuestro propio equipo, siguiendo técnicas tradicionales mexicanas de marroquinería.</p>
            </article>

            <article class="faq-item">
                <h3 class="faq-pregunta">¿Cómo aborda JM la sostenibilidad y el abastecimiento responsable?</h3>
                <p class="faq-respuesta">El cuero que utilizamos es un subproducto de la industria alimentaria. No se obtienen animales específicamente para nuestros productos. Al trabajar con materiales ya existentes, ayudamos a reducir el desperdicio y promovemos un ciclo de producción más responsable.</p>
                <p class="faq-respuesta">Utilizamos cuero natural y priorizamos procesos conscientes con el medio ambiente siempre que sea posible, incluyendo tratamientos químicos mínimos y métodos de teñido ecológicos.</p>
            </article>

            <article class="faq-item">
                <h3 class="faq-pregunta">¿Por qué el color de mi artículo puede verse ligeramente diferente al de las fotos?</h3>
                <p class="faq-respuesta">Cada artículo está elaborado con cuero natural, que posee su propia textura, tono y vetas. Debido al uso de materiales naturales y procesos artesanales, pueden existir ligeras variaciones en el color y acabado respecto a las imágenes mostradas. Estas diferencias no son defectos, sino parte de lo que hace que cada pieza sea única. No hay dos artículos exactamente iguales.</p>
            </article>

            <article class="faq-item">
                <h3 class="faq-pregunta">¿Cómo debo cuidar mi artículo de cuero?</h3>
                <p class="faq-respuesta">Nuestros artículos están hechos de cuero natural, un material duradero diseñado para el uso diario. Con el tiempo, el cuero se suaviza y desarrolla su propia figura.</p>
                <p class="faq-respuesta">Para mantener su calidad:</p>
                <ul class="faq-lista">
                    <li>Evita la exposición prolongada al agua y a la luz solar directa</li>
                    <li>Guárdalo en un lugar fresco y seco</li>
                    <li>Límpialo suavemente con un paño suave y ligeramente húmedo</li>
                    <li>Aplica acondicionador para cuero ocasionalmente para mantener el material nutrido</li>
                </ul>
                <p class="faq-respuesta">Con el cuidado adecuado, tus artículos te acompañarán durante muchos años.</p>
            </article>
        </section>
    </main>
</template>

<style scoped>
.faqs {
    padding-top: 0;
}
.page-header {
    padding: var(--space-lg) var(--space-lg) 0;
    max-width: 1100px;
    margin: 0 auto;
}

.page-titulo {
    font-family: var(--font-title);
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
}

.faqs-section {
    max-width: 760px;
    margin: 0 auto;
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
}

.faq-item {
    border-bottom: 1px solid #e5e0dc;
    padding-bottom: var(--space-lg);
}

.faq-item:last-child {
    border-bottom: none;
}

.faq-pregunta {
    font-family: var(--font-main);
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: var(--space-xs);
    color: var(--color-text);
}

.faq-respuesta {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #444;
    margin-bottom: var(--space-xs);
}

.faq-lista {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: var(--space-xs);
}

.faq-lista li {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #444;
    margin-bottom: 0.25rem;
}

@media (min-width: 768px) {
    .faqs-section {
        padding: calc(var(--space-lg) * 1.5);
    }

    .page-header {
        padding: calc(var(--space-lg) * 1.5) calc(var(--space-lg) * 1.5) 0;
    }

    .faq-pregunta {
        font-size: 1.1rem;
    }
}

@media (min-width: 1024px) {
    .page-header {
        padding: calc(var(--space-lg) * 2) calc(var(--space-lg) * 2) 0;
    }
    .faqs-section {
        padding: calc(var(--space-lg) * 2);
    }
}
</style>