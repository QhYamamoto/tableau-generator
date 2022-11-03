<script setup lang="ts">
  interface InstructionParagraphProps {
    text: string
  }
  defineProps<InstructionParagraphProps>()
</script>

<template>
  <p class="instruction-paragraph">
    {{ text }}
  </p>
</template>

<style lang="scss">
  .instruction-paragraph {
    position: relative;
    text-indent: -1em;
    padding-left: 1em;
    margin: 10px 0;
    line-height: 1.4em;
    white-space: pre-line;
    &::before {
      content: '・';
    }
  }
</style>
