<script setup lang="ts">
  interface MarkCellProps {
    isShaded: boolean
    dashedRightBorder: boolean
  }
  defineProps<MarkCellProps>()
</script>

<template>
  <td
    :class="[
      'mark-cell',
      `tableau__cell`,
      { 'is-shaded': isShaded },
      { 'dashed-right-border': dashedRightBorder },
    ]"
  >
    <slot />
  </td>
</template>

<style lang="scss">
  .mark-cell {
    text-align: center;
  }
</style>
