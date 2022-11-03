<script setup lang="ts">
  interface ErrorSpanProps {
    errorMessage: string
  }
  defineProps<ErrorSpanProps>()
</script>

<template>
  <span class="error">{{ `Error: ${errorMessage}` }}</span>
</template>

<style lang="scss">
  .error {
    color: $c-red;
  }
</style>
