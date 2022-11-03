<script setup lang="ts">
  import { inject } from 'vue'
  import { TableauStore } from '../../store/tableau'
  import {
    configStoreKey,
    latexCodeStoreKey,
    tableauStoreKey,
  } from '../../store/storeKeys'
  import TableauList from '../organisms/Table/TableauList.vue'
  import TemplateTop from '../templates/TemplateTop.vue'
  import EditModal from '../organisms/Modal/EditModal.vue'
  import ConstraintsModal from '../organisms/Modal/ConstraintsModal.vue'
  import PageTitle from '../atoms/Text/PageTitle.vue'
  import { TableauService } from '../../domains/tableau/tableau-service'
  import IpaKeyboard from '../organisms/IpaKeyboard/IpaKeyboard.vue'
  import LatexModal from '../organisms/Modal/LatexModal.vue'
  import TheButton from '../atoms/Button/TheButton.vue'
  import { LatexCodeStore } from '../../store/latexCode'
  import { ConfigStore } from '../../store/config'
  import ConfirmModal from '../organisms/Modal/ConfirmModal.vue'
  import { $showEl, $stopScroll } from '../../utils'

  const { $tableauArr, $evalMode, $setMode } = inject(
    tableauStoreKey
  ) as TableauStore
  const { $setLatexCode } = inject(latexCodeStoreKey) as LatexCodeStore
  const { $phoneticElsData } = inject(configStoreKey) as ConfigStore
  const tableauService = new TableauService()

  const showLatexCodes = () => {
    const latexCodeArr = $tableauArr.value.map((tableau) =>
      tableau.getLatexCode($phoneticElsData.value)
    )
    const joinedCode = latexCodeArr
      .reduce((pre, cur, curI) => `${pre}% Tableau${curI + 1}\n${cur}\n\n`, '')
      .trim()
    $setLatexCode(joinedCode)
    $showEl('.latex-modal')
    $stopScroll('body')
  }
</script>

<template>
  <TemplateTop>
    <template #page-title>
      <PageTitle text="OT Tableau Generator" />
    </template>
    <template #tableau-list>
      <TableauList />
    </template>
    <template #center-btns>
      <TheButton
        class="center-btn"
        size="large"
        text="Download all as .xlsx file"
        :clicked="() => tableauService.download($tableauArr)"
      />
      <TheButton
        class="center-btn"
        size="large"
        text="Show all LaTeX codes"
        :clicked="showLatexCodes"
      />
    </template>
    <template #mode-change-btn>
      <TheButton
        v-show="$evalMode === 'manual'"
        size="small"
        :clicked="() => $setMode('automatic')"
        text="Manual Mode"
      />
      <TheButton
        v-show="$evalMode === 'automatic'"
        size="small"
        :clicked="() => $setMode('manual')"
        text="Automatic Mode"
      />
    </template>
    <template #latex-modal>
      <LatexModal />
    </template>
    <template #confirm-modal>
      <ConfirmModal />
    </template>
    <template #edit-modal>
      <EditModal />
    </template>
    <template #ipa-keyboard>
      <IpaKeyboard />
    </template>
    <template #cons-modal>
      <ConstraintsModal />
    </template>
  </TemplateTop>
</template>

<style lang="scss">
  .center-btn:not(:last-child) {
    margin-right: 10px;
  }
</style>
