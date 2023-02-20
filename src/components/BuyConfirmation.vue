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