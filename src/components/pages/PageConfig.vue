<script setup lang="ts">
  import FeatureTable from '../organisms/Table/FeatureTable.vue'
  import TemplateConfig from '../templates/TemplateConfig.vue'
  import PageTitle from '../atoms/Text/PageTitle.vue'
  import TheHeader from '../atoms/Text/TheHeader.vue'
  import TheSelector from '../atoms/Form/TheSelector.vue'
  import { inject } from 'vue'
  import { configStoreKey } from '../../store/storeKeys'
  import { ConfigStore } from '../../store/config'

  const { $phoneticElsData } = inject(configStoreKey) as ConfigStore

  const els = $phoneticElsData.value
  const vowels = els.filter((el) => el.category === 'vowel')
  const labials = els.filter((el) => el.category === 'labial')
  const coronals = els.filter((el) => el.category === 'coronal')
  const dorsals = els.filter((el) => el.category === 'dorsal')
  const others = els.filter((el) => el.category === 'other')

  const selectorOptions = [
    {
      value: 'vowel',
      label: 'Vowels',
    },
    {
      value: 'labial',
      label: 'Labial consonants',
    },
    {
      value: 'coronal',
      label: 'Coronal consonants',
    },
    {
      value: 'dorsal',
      label: 'Dorsal consonants',
    },
    {
      value: 'other',
      label: 'Other consonants',
    },
  ]

  const changeTable = (target: HTMLSelectElement): void => {
    document
      .querySelectorAll('.feature-table')
      ?.forEach((el) => el.classList.remove('is-shown'))
    document
      .querySelector(`.feature-table--${target.value}`)
      ?.classList.add('is-shown')
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
        class="feature-table--vowel is-shown"
        :element-type="'Vowels'"
        :phonetic-els="vowels"
      />
      <FeatureTable
        class="feature-table--labial"
        :element-type="'Labial consonants'"
        :phonetic-els="labials"
      />
      <FeatureTable
        class="feature-table--coronal"
        :element-type="'Coronal consonants'"
        :phonetic-els="coronals"
      />
      <FeatureTable
        class="feature-table--dorsal"
        :element-type="'Dorsal consonants'"
        :phonetic-els="dorsals"
      />
      <FeatureTable
        class="feature-table--other"
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
