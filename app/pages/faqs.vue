<script setup>
useHead({
    title: "FAQ's | JM Taller",
})

const mostrarPolitica = ref(false)
const tabActiva = ref('politica')

</script>

<template>
    <main class="faqs">
        <div class="page-header">
            <h1 class="page-titulo">Información</h1>

            <div class="tabs">
                <button
                    class="tab-btn"
                    :class="{ activa: tabActiva === 'politica' }"
                    @click="tabActiva = 'politica'"
                >
                    Política de Cambios y Garantía
                </button>
                <button
                    class="tab-btn"
                    :class="{ activa: tabActiva === 'faqs' }"
                    @click="tabActiva = 'faqs'"
                >
                    Preguntas Frecuentes
                </button>
            </div>
        </div>

        <!-- POLÍTICA DE CAMBIOS Y GARANTÍA -->
        <section
            v-if="tabActiva === 'politica'"
            class="faqs-section"
            :class="{ 'politica-centrada': !mostrarPolitica }"
        >
            <article class="faq-item" :class="{ 'resumen-centrado': !mostrarPolitica }">
                <p class="faq-respuesta">
                    En JM Taller trabajamos con dedicación para ofrecerte piezas hechas a mano de la mejor
                    manera posible. Sabemos que cada detalle cuenta, por lo que respaldamos nuestro trabajo.</p>
                <p class="faq-respuesta">
                    Todas nuestras piezas adquiridas en
                    <a href="https://jmtaller.com" class="resumen-link">jmtaller.com</a>
                    cuentan con garantía contra cualquier defecto de materiales y manufactura.
                    (Las cualidades naturales o variaciones distintivas que puede llegar a tener el material
                    por su naturaleza no aplican como un defecto de fabricación).</p>
                <p class="faq-respuesta">
                    Debido a que cada artículo se elabora cuidadosamente a mano,
                    <span class="resumen-enfasis">no realizamos devoluciones monetarias.</span>
                    Las devoluciones aplican únicamente como
                    <span class="resumen-enfasis">cambio por el mismo producto o por otra pieza de nuestro catálogo.</span>
                </p>
                <p class="faq-respuesta">A continuación, te compartimos nuestra política detallada:</p>
                
                <button
                    v-if="!mostrarPolitica"
                    class="leer-mas-btn"
                    @click="mostrarPolitica = true"
                >
                    Leer más...
                </button>
            </article>

            <template v-if="mostrarPolitica">
                <article class="faq-item">
                    <h3 class="faq-pregunta">Garantía por Defectos de Fabricación</h3>
                    <p class="faq-respuesta">Solo aceptamos devoluciones para reemplazo en casos donde las piezas presenten errores de fábrica. Si tu pieza llega con algún defecto, por favor:</p>
                    <ul class="faq-lista">
                        <li>
                            Escríbenos a nuestro 
                            <a href="/contacto" class="politica-link">correo de contacto</a> 
                            especificando tu número de orden dentro de los 5 días hábiles posteriores a la recepción de tu pedido.
                        </li>
                        <li>Incluye una descripción del defecto junto con fotografías claras.</li>
                        <li>Nuestro taller evaluará la situación y, si corresponde, coordinaremos el cambio por la misma pieza sin costo adicional para ti.</li>
                    </ul>
                    <p class="faq-respuesta faq-nota">Nota: Las garantías aplican únicamente contra defectos de fabricación, y no aplican por desgaste natural, uso inadecuado, retrasos de entrega, malos manejos de paqueterías, cambios de opinión u otros factores fuera de nuestro control. En piezas con iniciales o completamente personalizadas, no aplican cambios.</p>
                </article>

                <article class="faq-item">
                    <h3 class="faq-pregunta">Cambios por Preferencia</h3>
                    <p class="faq-respuesta">
                        Si la pieza que adquiriste no fue lo que esperabas y te gustaría cambiarla por otra de 
                        <a href="/catalogo" class="politica-link">nuestro catálogo</a>, ¡claro que podemos ayudarte!
                    </p>
                    <ul class="faq-lista">
                        <li>Cuentas con 5 días hábiles a partir de la recepción de tu paquete para solicitar un cambio.</li>
                        <li>Puedes elegir otra pieza de igual o mayor valor, cubriendo la diferencia si es necesario.</li>
                        <li>Los gastos de envío asociados a este tipo de cambio (tanto de regreso al taller como de envío del nuevo producto) corren por cuenta del cliente.</li>
                        <li>Las devoluciones no aplican por insatisfacción personal para reembolso de dinero, solo para cambio de mercancía.</li>
                    </ul>
                </article>

                <article class="faq-item">
                    <h3 class="faq-pregunta">Condiciones Generales</h3>
                    <p class="faq-respuesta">Para que un cambio o reemplazo de garantía sea válido:</p>
                    <ul class="faq-lista">
                        <li>La pieza debe estar sin usar, en su empaque original y con todas sus etiquetas intactas.</li>
                        <li>Es indispensable presentar tu comprobante de compra.</li>
                    </ul>
                </article>

                <article class="faq-item">
                    <h3 class="faq-pregunta">Cancelaciones</h3>
                    <p class="faq-respuesta">Tu pedido pudo haber sido cancelado por alguna de estas razones:</p>
                    <ul class="faq-lista">
                        <li>Solicitaste la cancelación de tu pedido antes de su elaboración.</li>
                        <li>No pudimos encontrarte en la dirección de entrega.</li>
                        <li>Debido a la alta demanda, lamentablemente nos quedamos sin existencias de los materiales necesarios.</li>
                        <li>Tu pedido no fue aceptado, ya que no fue aprobado por nuestros filtros de seguridad, los mismos son una herramienta que implementamos para cuidar a nuestros clientes. Algunas razones de esto son:
                            <ul class="faq-lista faq-sublista">
                                <li>Los datos de la tarjeta no coinciden y el banco o la pasarela de pago declinaron el pago por seguridad.</li>
                                <li>La tarjeta pueda tener algún tipo de restricción para compras por Internet; te recomendamos siempre utilizar la versión virtual/digital de tu tarjeta para asegurar que tu banco apruebe la compra en línea.</li>
                                <li>Los fondos de la tarjeta son insuficientes.</li>
                            </ul>
                        </li>
                    </ul>
                </article>
            </template>
        </section>

        <!-- PREGUNTAS FRECUENTES -->
        <section v-if="tabActiva === 'faqs'" class="faqs-section">

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
    margin: 0 0 var(--space-lg) 0;
}

/* TABS */
.tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid #e5e0dc;
    margin-bottom: 0;
}

.tab-btn {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0.75rem 1.25rem;
    font-family: var(--font-main);
    font-size: 0.95rem;
    font-weight: 500;
    color: #888;
    cursor: pointer;
    margin-bottom: -1px;
    transition: color 0.2s, border-color 0.2s;
}

.tab-btn:hover {
    color: var(--color-text);
}

.tab-btn.activa {
    color: var(--color-text);
    border-bottom-color: var(--color-text);
    font-weight: 600;
}

/* CONTENIDO */
.resumen-link {
    font-weight: 600;
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s;
}

.resumen-link:hover {
    color: #444;
}

.resumen-enfasis {
    font-weight: 600;
    color: var(--color-text);
}
.politica-centrada {
    min-height: 60vh;
    justify-content: center;
}

.resumen-centrado {
    border-bottom: none;
    max-width: 760px;
    margin: 0 auto;
    text-align: left;
}
.resumen-centrado .faq-respuesta {
    font-size: 1rem;
    color: #555;
}

.leer-mas-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    border-bottom: 1px solid currentColor;
    font-family: var(--font-main);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text);
    cursor: pointer;
    padding: 0 0 0.25rem 0;
    margin-top: calc(var(--space-lg) * 0.75);
    transition: opacity 0.2s;
}
.leer-mas-btn::after {
    content: '↓';
    font-size: 0.75rem;
    transition: transform 0.2s;
}
.leer-mas-btn:hover {
    opacity: 0.6;
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

.faq-nota {
    color: #888;
    font-size: 0.875rem;
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
.faq-sublista {
    margin-top: 0.5rem;
}

.politica-link {
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid #ccc;
    transition: border-color 0.2s;
}

.politica-link:hover {
    border-color: var(--color-text);
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