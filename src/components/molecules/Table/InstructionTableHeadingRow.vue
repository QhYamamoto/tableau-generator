<script setup lang="ts">
  import InstructionTableCell from '../../atoms/Table/InstructionTableCell.vue'

  interface InstructionTableHeadingRow {
    dataArr: string[]
  }
  defineProps<InstructionTableHeadingRow>()
</script>

<template>
  <tr class="instruction-table-row">
    <InstructionTableCell
      v-for="data in dataArr"
      :data="data.split('|').map((str) => str.trim())"
      :centering="true"
    />
  </tr>
</template>
