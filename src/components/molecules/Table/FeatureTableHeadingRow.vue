<script setup lang="ts">
  import FeatureTableCell from '../../atoms/Table/FeatureTableCell.vue'

  interface FeatureTableHeadingRowProps {
    phoneticEls: PhoneticElement[]
    isCenter?: boolean
  }
  defineProps<FeatureTableHeadingRowProps>()
</script>

<template>
  <tr
    :class="[
      'feature-table-heading-row',
      { 'feature-table-heading-row--center': isCenter },
    ]"
  >
    <FeatureTableCell
      class="feature-table-heading-row__cell feature-table-heading-row__cell--first-column"
      data=""
    />
    <FeatureTableCell
      v-for="el in phoneticEls"
      class="feature-table-heading-row__cell"
      :data="el.symbol"
    />
  </tr>
</template>

<style lang="scss">
  .feature-table-heading-row {
    &__cell {
      border-bottom: 3px double $c-gray--light;
      background-color: $c-black;

      &--first-column {
        border-right: 3px double $c-gray--light;
      }
    }

    &--center &__cell {
      border-top: 3px double $c-gray--light;
    }
  }
</style>
