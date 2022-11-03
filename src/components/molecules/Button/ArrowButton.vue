<script setup lang="ts">
  import { computed } from 'vue'
  import arrowIconUp from '/src/assets/images/icon-arrow-up.png'
  import arrowIconDown from '/src/assets/images/icon-arrow-down.png'
  import TheButton from '../../atoms/Button/TheButton.vue'

  interface ArrowButtonProps {
    clicked: AnyFunction
    direction: 'up' | 'down'
  }

  const props = defineProps<ArrowButtonProps>()

  const arrowIcon = computed(() => {
    return props.direction === 'up'
      ? new URL(arrowIconUp, import.meta.url).href
      : new URL(arrowIconDown, import.meta.url).href
  })
</script>

<template>
  <TheButton size="small" class="arrow-button" :clicked="clicked">
    <img class="arrow-button__img" :src="arrowIcon" alt="↑" />
  </TheButton>
</template>

<style lang="scss">
  .arrow-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12px;

    &__img {
      width: 10px;
      height: 5px;
    }
  }
</style>
