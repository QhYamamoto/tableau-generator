<script setup lang="ts">
  type SelectorOption = {
    value: string
    label: string
  }

  interface TheSelectorProps {
    options: SelectorOption[]
    onChange: (target: HTMLSelectElement) => void
  }
  defineProps<TheSelectorProps>()
</script>

<template>
  <select
    class="feature-table-selector"
    @change="onChange($event.target as HTMLSelectElement)"
  >
    <option v-for="option in options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style lang="scss">
  .feature-table-selector {
    background-color: $c-gray--dark;
    border-radius: 2px;
  }
</style>
