<script setup lang="ts">
  interface CandidateCellProps {
    rowNum: number
    tableauNum: number
  }
  defineProps<CandidateCellProps>()
</script>

<template>
  <td :class="['candidate-cell', `tableau__cell`, `tableau__column-1`]">
    <slot />
  </td>
</template>

<style lang="scss">
  .candidate-cell {
    text-align: right;
  }
</style>
