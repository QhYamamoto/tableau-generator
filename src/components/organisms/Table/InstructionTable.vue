<script setup lang="ts">
  import InstructionTableHeadingRow from '../../molecules/Table/InstructionTableHeadingRow.vue'
  import InstructionTableRow from '../../molecules/Table/InstructionTableRow.vue'

  interface InstructionTableProps {
    headDataArr: string[]
    dataArrs: string[][]
  }
  defineProps<InstructionTableProps>()
</script>

<template>
  <table class="instruction-table">
    <InstructionTableHeadingRow :data-arr="headDataArr" />
    <InstructionTableRow v-for="dataArr in dataArrs" :data-arr="dataArr" />
  </table>
</template>

<style lang="scss">
  .instruction-table {
    table-layout: fixed;
    max-width: calc(100% - 2em);
    margin: 20px 0 20px 2em;
  }
</style>
