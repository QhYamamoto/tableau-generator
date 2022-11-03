<script setup lang="ts">
  interface FeatureTableCellProps {
    data: string
    clicked?: AnyFunction
    clickable?: boolean
    align?: 'center' | 'left' | 'right'
    isShaded?: boolean
  }
  defineProps<FeatureTableCellProps>()
</script>

<template>
  <td
    :class="[
      'feature-table-cell',
      { 'is-clickable': clickable },
      { 'is-shaded': isShaded },
    ]"
    :style="{
      cursor: clickable ? 'pointer' : 'default',
      userSelect: clickable ? 'none' : undefined,
      textAlign: align ?? 'center',
    }"
    @click="clicked"
  >
    {{ data }}
  </td>
</template>

<style lang="scss">
  .feature-table-cell {
    border: 1px solid $c-gray--light;
    padding: 7px;
    white-space: nowrap;
    transition: all 0.2s ease;

    &.is-clickable:hover {
      background-color: $c-gray--light;
    }

    &.is-shaded {
      background-color: $c-gray;
    }
  }
</style>
