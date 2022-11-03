<script setup lang="ts">
  interface InstructionLeadProps {
    text: string
  }
  defineProps<InstructionLeadProps>()
</script>

<template>
  <p class="instruction-lead">
    {{ text }}
  </p>
</template>

<style lang="scss">
  .instruction-lead {
    margin-bottom: 15px;
    font-size: $fz-mid-large;
    font-weight: bold;
  }
</style>
