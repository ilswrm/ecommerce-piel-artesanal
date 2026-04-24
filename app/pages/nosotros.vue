<script setup>
useHead({
    title: 'Nosotros | JM Taller',
})
</script>
<template>
    <main class="nosotros">
        <div class="page-header">
            <h1 class="page-titulo">Nosotros</h1>
        </div>
    <!-- Bloque 1: imagen izquierda, texto derecha -->
        <section class="bloque">
            <div class="bloque-inner">
                <div class="bloque-img">
                    <img src="/assets/images/nosotros/nosotros-1.webp" alt="Proceso artesanal de marroquinería" />
                </div>
                <div class="bloque-texto">
                    <p>
                        Creemos en la honestidad del oficio por encima del ruido de la industria.
                        Nuestro enfoque está en nuestros clientes y en la calidad técnica de los
                        artículos que fabricamos. Entendemos que el valor real de un producto
                        no reside en una etiqueta ni en la superficial cultura de marcas que hoy
                        abunda, sino en la dedicación, la funcionalidad y el respeto absoluto por
                        el trabajo mexicano.
                    </p>
                    <p>
                        Todo nuestro proceso de marroquinería se realiza íntegramente en
                        México. Utilizamos materiales cien por ciento nacionales y trabajamos el
                        cuero en su forma más auténtica, sin utilizar materiales sintéticos en lo
                        absoluto. Cada diseño, patrón y costura se elabora localmente,
                        garantizando una calidad superior y apoyando directamente a la industria
                        de nuestro país. Esta transparencia es el pilar de nuestra relación contigo,
                        ofreciendo artículos reales diseñados para resistir el uso diario y el paso
                        del tiempo.
                    </p>
                </div>
            </div>
        </section>

    <!-- Bloque 2: texto izquierda, imagen derecha -->
        <section class="bloque bloque--invertido">
            <div class="bloque-inner">
                <div class="bloque-img">
                    <img src="/assets/images/nosotros/nosotros-2.webp" alt="Artesano trabajando el cuero" />
                </div>
                <div class="bloque-texto">
                    <p>
                        Esta misma filosofía guía nuestra postura frente al impacto ambiental y el
                        greenwashing. Eliminamos por completo el uso de poliuretano y
                        microplásticos perjudiciales. Al crear piezas de alta resistencia con cuero
                        genuino, combatimos la cultura del consumo rápido. Un artículo bien
                        construido no es desechable; está hecho para durar, reduciendo
                        drásticamente los residuos y la huella de carbono al mantener nuestra
                        cadena de suministro dentro del territorio nacional.
                    </p>
                    <p>
                        Para respaldar este compromiso con la durabilidad, todos nuestros
                        productos cuentan con una garantía de por vida. Estamos tan
                        convencidos de nuestra manufactura y constante mejora, que
                        aseguramos que cada una de nuestras piezas sea cien por ciento
                        reparable. No queremos que deseches nada; si el uso intenso deja huella,
                        restauramos tu artículo para que siga contando tu historia. No te
                        ofrecemos una promesa vacía, sino la seguridad de un producto
                        funcional fabricado con total integridad para acompañarte siempre.
                    </p>
                </div>
            </div>  
        </section>
    </main>
</template>
<style scoped>
.nosotros {
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
.bloque{
    padding: var(--space-lg);
}
.bloque-inner{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
}
.bloque-img {
    width: 100%;
    flex-shrink: 0;
}
.bloque-img img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
}
.bloque-texto {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.bloque-texto p {
    text-align: justify;
    margin-bottom: var(--space-sm);
}
/* Tablet y desktop: layout horizontal */
@media (min-width: 768px) {
    .page-header {
        padding: calc(var(--space-lg) * 1.5) calc(var(--space-lg) * 1.5) 0;
    }
    .page-titulo {
        font-size: 2.8rem;
    }
    .bloque {
        padding: calc(var(--space-lg) * 1.5);
    }
    .bloque-inner {
        flex-direction: row;
        align-items: center;
        gap: 3rem;
    }
    .bloque--invertido .bloque-img {
        order: 2;
    }
    .bloque-img {
        width: 40%;
    }
    .bloque-img img {
        height: 480px;
    }
    .bloque-texto {
        flex: 1;
    }
}

@media (min-width: 1024px) {
    .page-header {
        padding: calc(var(--space-lg) * 2) calc(var(--space-lg) * 2) 0;
    }
    .bloque {
        padding: calc(var(--space-lg) * 2);
    }

    .bloque-img img {
        height: 600px;
    }
}

</style>