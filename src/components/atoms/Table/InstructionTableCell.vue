<script setup lang="ts">
  interface InstructionTableCellProps {
    data: string[]
    centering?: boolean
  }
  defineProps<InstructionTableCellProps>()
</script>

<template>
  <td
    class="instruction-table-cell"
    :style="{ textAlign: centering ? 'center' : 'left' }"
  >
    <span
      v-for="str in data"
      :style="{
        fontSize: str.substring(0, 2) === '__' ? '0.5em' : undefined,
        verticalAlign: str.substring(0, 2) === '__' ? 'sub' : undefined,
        fontVariant: str.substring(0, 4) === '(sc)' ? 'small-caps' : undefined,
      }"
    >
      {{ str.replace('__', '').replace('(sc)', '') }}
    </span>
  </td>
</template>

<style lang="scss">
  .instruction-table-cell {
    width: auto;
    max-width: calc(
      (100vw - (2em + 60px)) / 3
    ); /* 2em = tableのmargin, 60px = アプリ全体のpadding, 4 = tableの最大列数(予定) */
    padding: 0.5em 1em;
    border: 1px solid $c-gray--light;
    white-space: pre-line;
    vertical-align: middle;
    line-height: 1.4em;
  }
</style>
