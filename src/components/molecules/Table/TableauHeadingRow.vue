<script setup lang="ts">
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import InputCell from '../../atoms/Table/InputCell.vue'
  import ConstraintCell from '../../atoms/Table/ConstraintCell.vue'

  interface TableauHeadingRowProps {
    input: InputInterface
    constraints: ConstraintInterface[]
    tableauNum: number
  }
  defineProps<TableauHeadingRowProps>()
</script>

<template>
  <!-- TODO: Implement setting option to decide the presence or absence of brackets -->
  <tr :class="`tableau-heading-row`">
    <InputCell :tableau-num="tableauNum">
      <TheSpan :text="'/ '" />
      <TheSpan
        v-for="fragment in input.valueFragments"
        :text="fragment.str"
        :style="{
          verticalAlign: fragment.sub ? 'sub' : undefined,
          fontSize: fragment.sub ? '0.5em' : undefined,
        }"
      />
      <TheSpan :text="' /'" />
    </InputCell>
    <ConstraintCell
      v-for="(cons, consI) in constraints"
      :column-num="consI + 2"
      :tableau-num="tableauNum"
      :dashed-right-border="cons.rightDash"
    >
      <TheSpan
        v-for="fragment in cons.nameFragments"
        :text="fragment.str"
        :style="{ fontVariant: fragment.smallCaps ? 'small-caps' : 'default' }"
      />
    </ConstraintCell>
  </tr>
</template>

<style lang="scss">
  .tableau-heading-row {
    border-bottom: 3px double $c-gray--light;
  }
</style>
