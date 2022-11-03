<script setup lang="ts">
  import FeatureTableCell from '../../atoms/Table/FeatureTableCell.vue'

  interface FeatureTableRowProps {
    phoneticEls: PhoneticElement[]
    feature: DistinctiveFeature
    clicked: (target: HTMLElement, el: PhoneticElement) => void
    isShaded: (el: PhoneticElement) => boolean
  }
  defineProps<FeatureTableRowProps>()
</script>

<template>
  <tr class="feature-table-row">
    <FeatureTableCell
      class="feature-table-row__cell feature-table-row__cell--first"
      :data="feature"
      :align="'left'"
    />
    <FeatureTableCell
      v-for="el in phoneticEls"
      class="feature-table-row__cell"
      :data="el[feature]"
      :clicked="($event: Event) => clicked($event.target as HTMLElement, el)"
      :clickable="true"
      :is-shaded="isShaded(el)"
    />
  </tr>
</template>

<style lang="scss">
  .feature-table-row {
    &__cell--first {
      border-right: 3px double $c-gray--lighter;
      background-color: $c-black;
    }
  }
</style>
