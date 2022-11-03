<script setup lang="ts">
  interface PageTitleProps {
    text: string
  }
  defineProps<PageTitleProps>()
</script>

<template>
  <p class="page-title">{{ text }}</p>
</template>

<style lang="scss">
  .page-title {
    font-size: $fz-largest;
    text-align: center;
  }
</style>
