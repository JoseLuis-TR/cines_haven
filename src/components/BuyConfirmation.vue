<template>
    <Transition name="menuBackground">
        <article v-if="confirmBuy" @click.self="$emit('close-confirmation')" class="menuContainer">
            <section class="menuContainer__confirmation">
                <p>¡Entradas compradas!</p>
            </section>
        </article>
    </Transition>
</template>

<script>
/**
 * @file BuyConfirmation.vue - Componente que muestra un mensaje de confirmación de compra
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @property {Object} emits - Eventos que emite el componente
 * @property {Object} emits.close-confirmation - Evento que emite el componente para cerrar la confirmación
 * @vue-prop {boolean} [confirmBuy = false] - Indica si se muestra el mensaje de confirmación
 */
export default {
    name: "BuyConfirmation",
    emits: ['close-confirmation'],
    props: {
        confirmBuy: {
            type: Boolean,
            default: false
        }
    }
}
</script>