<script setup lang="ts">
  import { inject } from 'vue'
  import { TableauStore } from '../../../store/tableau'
  import {
    confirmStoreKey,
    configStoreKey,
    latexCodeStoreKey,
    tableauStoreKey,
  } from '../../../store/storeKeys'
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import TableauHeadingRow from '../../molecules/Table/TableauHeadingRow.vue'
  import TableauRow from '../../molecules/Table/TableauRow.vue'
  import { $stopScroll } from '../../../utils'
  import { ConfigStore } from '../../../store/config'
  import { LatexCodeStore } from '../../../store/latexCode'
  import TheButton from '../../atoms/Button/TheButton.vue'
  import ImageButton from '../../molecules/Button/ImageButton.vue'
  import { TableauService } from '../../../domains/tableau/tableau-service'
  import { ConfirmStore } from '../../../store/confirm'
  import { $showEl } from '../../../utils'

  const {
    $tableauArr,
    $evalMode,
    $storeTableau,
    $setSelectedTableauI,
    $addTableau,
    $copyTableau,
    $pasteTableau,
    $removeTableau,
    $clearTableau,
    $reflectResult,
  } = inject(tableauStoreKey) as TableauStore
  const { $setLatexCode } = inject(latexCodeStoreKey) as LatexCodeStore
  const { $phoneticElsData } = inject(configStoreKey) as ConfigStore
  const { $setConfirmMessage, $setFunctionToExecute } = inject(
    confirmStoreKey
  ) as ConfirmStore

  const tableauService = new TableauService()

  const startEdit = (tabI: number) => {
    $stopScroll('body')
    $setSelectedTableauI(tabI)
    $showEl('.edit-modal')
  }

  const copyTableau = (tabI: number) => {
    $copyTableau(tabI)

    const hoverMessages = document.querySelectorAll(
      '.tableau__btn--copy > span'
    )
    hoverMessages[tabI].textContent = 'Copied!'
    setTimeout(() => {
      hoverMessages[tabI].textContent = 'Copy'
    }, 2000)
  }

  const showLatexModal = (tabI: number) => {
    $stopScroll('body')
    $setLatexCode($tableauArr.value[tabI].getLatexCode($phoneticElsData.value))
    $showEl('.latex-modal')
  }

  const clearTableau = (tabI: number) => {
    $setConfirmMessage(`Are you sure you want to clear Tableau${tabI + 1}?`)
    $setFunctionToExecute($clearTableau, tabI)
    $showEl('.confirm-modal')
  }

  const deleteTableau = (tabI: number) => {
    $setConfirmMessage(`Are you sure you want to delete Tableau${tabI + 1}?`)
    $setFunctionToExecute($removeTableau, tabI)
    $showEl('.confirm-modal')
  }

  const assess = (tabI: number) => {
    const tableau = $tableauArr.value[tabI]
    const resultArrs =
      $evalMode.value === 'manual'
        ? tableau.getResultFromMarkArrs()
        : tableau.assess($phoneticElsData.value)
    $reflectResult(tabI, resultArrs)
    $storeTableau(tabI)
  }
</script>

<template>
  <div v-for="(tableau, tabI) in $tableauArr" :class="`tableau`">
    <div class="tableau__upper">
      <TheSpan class="tableau__header" :text="`Tableau${tabI + 1}`" />
      <ImageButton
        class="tableau__btn tableau__btn--edit"
        size="small"
        img="icon-edit.png"
        alt="download"
        hover-message="Edit"
        :clicked="() => startEdit(tabI)"
      />
      <ImageButton
        class="tableau__btn tableau__btn--copy"
        size="small"
        img="icon-copy.png"
        alt="copy"
        hover-message="Copy"
        :clicked="() => copyTableau(tabI)"
      />
      <ImageButton
        class="tableau__btn tableau__btn--paste"
        size="small"
        img="icon-paste.png"
        alt="paste"
        hover-message="Paste"
        :clicked="() => $pasteTableau(tabI)"
      />
      <ImageButton
        class="tableau__btn tableau__btn--clear"
        size="small"
        img="icon-eraser.png"
        alt="clear"
        hover-message="Clear"
        :clicked="() => clearTableau(tabI)"
      />
      <ImageButton
        class="tableau__btn tableau__btn--update"
        size="small"
        img="icon-update.png"
        alt="update"
        hover-message="Update"
        :clicked="() => assess(tabI)"
      />
      <ImageButton
        class="tableau__btn tableau__btn--download"
        size="small"
        img="icon-download.png"
        alt="download"
        hover-message="Download"
        :clicked="() => tableauService.download([$tableauArr[tabI]])"
      />
      <TheButton
        class="tableau__btn tableau__btn--latex"
        size="small"
        :text="'LaTeX'"
        :clicked="() => showLatexModal(tabI)"
      />
      <IconCross
        v-if="$tableauArr.length !== 1"
        class="tableau__btn tableau__btn--delete"
        text="Delete"
        :clicked="() => deleteTableau(tabI)"
      />
    </div>
    <table class="tableau__table">
      <TableauHeadingRow
        :input="tableau.input"
        :constraints="tableau.constraints"
        :tableau-num="tabI + 1"
      />
      <TableauRow
        v-for="(cand, candI) in tableau.candidates"
        :candidate="cand"
        :is-winner="tableau.winnerIndex?.value === candI"
        :constraints="tableau.constraints"
        :tab-i="tabI"
        :cand-i="candI"
      />
    </table>
    <TheButton
      v-if="tabI === $tableauArr.length - 1"
      class="tableau__btn tableau__btn--add"
      size="small"
      :clicked="$addTableau"
      text="+Add tableau"
    />
  </div>
</template>

<style lang="scss">
  .tableau {
    margin: 15px 0;

    &__upper {
      display: flex;
      align-items: stretch;
      line-height: 30px;
      margin-bottom: 10px;
    }

    &__table {
      margin-left: 10px;
    }

    &__btn {
      margin-left: 5px;

      &--edit {
        margin-left: 10px;
      }

      &--add {
        margin-top: 20px;
        margin-left: 10px;
      }
    }
  }
</style>
