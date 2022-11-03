<script setup lang="ts">
  import FeatureTableHeadingRow from '../../molecules/Table/FeatureTableHeadingRow.vue'
  import FeatureTableRow from '../../molecules/Table/FeatureTableRow.vue'
  import { inject } from 'vue'
  import { configStoreKey } from '../../../store/storeKeys'
  import { PHONETIC_ELEMENTS } from '../../../consts/phonetic-elements'
  import { ConfigStore } from '../../../store/config'
  import { DISTINCTIVE_FEATURES } from '../../../consts/phonetic-elements/utils'

  interface FeatureTableProps {
    elementType: string
    phoneticEls: PhoneticElement[]
  }
  defineProps<FeatureTableProps>()

  const { $updatePhoneticElData } = inject(configStoreKey) as ConfigStore
  const border = DISTINCTIVE_FEATURES.indexOf('implos')
  const firstHalfOfFeatures = DISTINCTIVE_FEATURES.filter((_, i) => i <= border)
  const lastHalfOfFeatures = DISTINCTIVE_FEATURES.filter((_, i) => i > border)

  const changeValue = (
    currentValue: string | null,
    el: PhoneticElement,
    feature: DistinctiveFeature
  ) => {
    let newValue: TernaryOptions = '+'
    if (currentValue === '+') newValue = '-'
    if (currentValue === '-') newValue = '0'

    $updatePhoneticElData(el.name, feature, newValue)
  }

  const isShaded = (
    el: PhoneticElement,
    feature: DistinctiveFeature
  ): boolean => {
    const defaultEl = PHONETIC_ELEMENTS.find((defEl) => defEl.name === el.name)
    const defaultVal = defaultEl ? defaultEl[feature] : undefined
    return !(el[feature] === defaultVal)
  }
</script>

<template>
  <table class="feature-table">
    <FeatureTableHeadingRow :phonetic-els="phoneticEls" />
    <FeatureTableRow
      v-for="feature in firstHalfOfFeatures"
      :phonetic-els="phoneticEls"
      :feature="feature"
      :clicked="(target, el) => changeValue(target.textContent, el, feature)"
      :is-shaded="(el) => isShaded(el, feature)"
    />
    <FeatureTableHeadingRow :phonetic-els="phoneticEls" :is-center="true" />
    <FeatureTableRow
      v-for="feature in lastHalfOfFeatures"
      :phonetic-els="phoneticEls"
      :feature="feature"
      :clicked="(target, el) => changeValue(target.textContent, el, feature)"
      :is-shaded="(el) => isShaded(el, feature)"
    />
  </table>
</template>

<style lang="scss">
  .feature-table {
    width: fit-content;
    margin: 0 auto 20px;
  }
</style>
