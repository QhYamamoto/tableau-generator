<script setup lang="ts">
  interface InputCellProps {
    tableauNum: number
  }
  defineProps<InputCellProps>()
</script>

<template>
  <td :class="['input-cell', `tableau__cell`, `tableau__column-1`]">
    <slot />
  </td>
</template>
