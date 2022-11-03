<script setup lang="ts">
  interface ClickableSpanProps {
    text: string
    clicked: AnyFunction
  }
  defineProps<ClickableSpanProps>()
</script>

<template>
  <span class="clickable-span" @click="clicked">{{ text }}</span>
</template>

<style lang="scss">
  .clickable-span {
    cursor: pointer;
  }
</style>
