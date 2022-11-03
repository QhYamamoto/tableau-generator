<script setup lang="ts">
  import InstructionTableCell from '../../atoms/Table/InstructionTableCell.vue'

  interface InstructionTableRow {
    dataArr: string[]
  }
  defineProps<InstructionTableRow>()
</script>

<template>
  <tr class="instruction-table-row">
    <InstructionTableCell
      v-for="(data, dataI) in dataArr"
      :data="data.split('|').map((str) => str.trim())"
      :centering="dataI === 0 ? true : false"
    />
  </tr>
</template>
