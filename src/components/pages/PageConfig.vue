<script setup lang="ts">
  import FeatureTable from '../organisms/Table/FeatureTable.vue'
  import TemplateConfig from '../templates/TemplateConfig.vue'
  import PageTitle from '../atoms/Text/PageTitle.vue'
  import TheHeader from '../atoms/Text/TheHeader.vue'
  import TheSelector from '../atoms/Form/TheSelector.vue'
  import { inject, ref } from 'vue'
  import { configStoreKey } from '../../store/storeKeys'
  import { ConfigStore } from '../../store/config'
  import { $hideEl, $showEl } from '../../utils'

  const { $phoneticElsData } = inject(configStoreKey) as ConfigStore

  const els = $phoneticElsData.value
  const vowels = els.filter((el) => el.category === 'vowel')
  const labials = els.filter((el) => el.category === 'labial')
  const coronals = els.filter((el) => el.category === 'coronal')
  const dorsals = els.filter((el) => el.category === 'dorsal')
  const others = els.filter((el) => el.category === 'other')

  const selectorOptions = [
    {
      value: 'vowels',
      label: 'Vowels',
    },
    {
      value: 'labials',
      label: 'Labial consonants',
    },
    {
      value: 'coronals',
      label: 'Coronal consonants',
    },
    {
      value: 'dorsals',
      label: 'Dorsal consonants',
    },
    {
      value: 'others',
      label: 'Other consonants',
    },
  ]

  const tableSelector = ref('.feature-table--vowels')

  const changeTable = (target: HTMLSelectElement): void => {
    $hideEl(tableSelector.value)
    tableSelector.value = `.feature-table--${target.value}`
    $showEl(tableSelector.value)
  }
</script>

<template>
  <TemplateConfig>
    <template #page-title>
      <PageTitle text="OT Tableau Generator" />
    </template>
    <template #header>
      <TheHeader text="― Feature Configuration ―" />
    </template>
    <template #selector>
      <TheSelector :options="selectorOptions" :on-change="changeTable" />
    </template>
    <template #feature-table-list>
      <FeatureTable
        class="feature-table--vowels is-shown"
        :element-type="'Vowels'"
        :phonetic-els="vowels"
      />
      <FeatureTable
        class="feature-table--labials"
        :element-type="'Labial consonants'"
        :phonetic-els="labials"
      />
      <FeatureTable
        class="feature-table--coronals"
        :element-type="'Coronal consonants'"
        :phonetic-els="coronals"
      />
      <FeatureTable
        class="feature-table--dorsals"
        :element-type="'Dorsal consonants'"
        :phonetic-els="dorsals"
      />
      <FeatureTable
        class="feature-table--others"
        :element-type="'Other consonants'"
        :phonetic-els="others"
      />
    </template>
  </TemplateConfig>
</template>

<style lang="scss">
  .feature-table {
    display: none;

    &.is-shown {
      display: block;
      animation: show 1s ease;
      @keyframes show {
        0% {
          opacity: 0;
          visibility: hidden;
        }
        100% {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
</style>
