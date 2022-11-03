<script setup lang="ts">
  interface TheHeaderProps {
    text: string
  }
  defineProps<TheHeaderProps>()
</script>

<template>
  <p class="the-header">{{ text }}</p>
</template>

<style lang="scss">
  .the-header {
    font-size: $fz-large;
  }
</style>
