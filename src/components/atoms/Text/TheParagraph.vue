<script setup lang="ts">
  interface TheParagraphProps {
    text: string
  }
  defineProps<TheParagraphProps>()
</script>

<template>
  <p>
    {{ text }}
    <slot />
  </p>
</template>
