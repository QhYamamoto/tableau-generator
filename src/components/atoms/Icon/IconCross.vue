<script setup lang="ts">
  interface IconCrossProps {
    clicked: AnyFunction
  }

  defineProps<IconCrossProps>()
</script>

<template>
  <span class="cross" @click="clicked">×</span>
</template>

<style lang="scss">
  .cross {
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    transition: all 0.4s ease;
    user-select: none;

    &:hover {
      background-color: $c-gray;
    }
  }
</style>
