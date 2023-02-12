<template>
  <section class="carousel__controls">
    <transition-group name="indicators">
      <button
          class="carousel__controls--indicators"
          :class="{activeIndicator : currentIndex === index}"
          v-for="(item,index) in total"
          :key="index"
          @click="$emit('changeMovie', index)"
      >
      </button>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: "CarouselIndicators",
  emits: ['changeMovie'],
  props: ["total", "currentIndex"]
}
</script>