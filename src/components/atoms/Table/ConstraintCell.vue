<script setup lang="ts">
  interface ConstraintCellProps {
    columnNum: number
    tableauNum: number
    dashedRightBorder: boolean
  }
  defineProps<ConstraintCellProps>()
</script>

<template>
  <td
    :class="[
      'constraint-cell',
      `tableau__cell`,
      { 'dashed-right-border': dashedRightBorder },
    ]"
  >
    <slot />
  </td>
</template>

<style lang="scss">
  .constraint-cell {
    text-align: center;
  }
</style>
