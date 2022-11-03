<script setup lang="ts">
  import { StyleValue } from 'vue'

  interface TheSpanProps {
    text: string
    style?: StyleValue
  }
  defineProps<TheSpanProps>()
</script>

<template>
  <span :style="style">{{ text }}</span>
</template>
