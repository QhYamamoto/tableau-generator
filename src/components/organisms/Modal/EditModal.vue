<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { TableauStore } from '../../../store/tableau'
  import { configStoreKey, tableauStoreKey } from '../../../store/storeKeys'
  import TheButton from '../../atoms/Button/TheButton.vue'
  import InputForm from '../Form/InputForm.vue'
  import CandidateForms from '../Form/CandidateForms.vue'
  import ConstraintForms from '../Form/ConstraintForms.vue'
  import { $hideEl, $restartScroll } from '../../../utils'
  import { ConfigStore } from '../../../store/config'
  import ManualConstraintForms from '../Form/ManualConstraintForms.vue'

  const {
    $tableauArr,
    $selectedTabI: tabI,
    $evalMode,
    $storeTableau,
    $restoreTableau,
    $reflectResult,
  } = inject(tableauStoreKey) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const { $phoneticElsData } = inject(configStoreKey) as ConfigStore

  const isDisabled = computed(() => {
    if (tableau.value.input.errorMessage) return true
    const numOfCandWithErrMsgs = tableau.value.candidates.filter(
      (cand) => cand.errorMessage
    ).length
    if (numOfCandWithErrMsgs) return true
    return false
  })

  const endEdit = () => {
    const resultArrs =
      $evalMode.value === 'manual'
        ? tableau.value.getResultFromMarkArrs()
        : tableau.value.assess($phoneticElsData.value)
    $reflectResult(tabI.value, resultArrs)
    $storeTableau(tabI.value)
    $hideEl('.edit-modal')
    $restartScroll('body')
  }

  const cancel = () => {
    $restoreTableau(tabI.value)
    $hideEl('.edit-modal')
    $restartScroll('body')
  }
</script>

<template>
  <div class="edit-modal">
    <div class="edit-modal__inner">
      <InputForm />
      <div class="edit-modal__row">
        <CandidateForms />
        <ConstraintForms v-if="$evalMode === 'automatic'" />
        <ManualConstraintForms v-else />
      </div>
    </div>
    <div class="edit-modal__btn-wrapper">
      <TheButton
        :disabled="isDisabled"
        class="edit-modal__btn edit-modal__btn--done"
        size="large"
        :clicked="endEdit"
        text="Done"
      />
      <TheButton
        class="edit-modal__btn edit-modal__btn--cancel"
        size="large"
        :clicked="cancel"
        text="Cancel"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .edit-modal {
    display: flex;
    flex-direction: column;
    padding: 20px 20px 10px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: -60px;
    right: 0;
    background-color: $c-gray--dark;
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s ease;

    &.is-shown {
      visibility: visible;
      opacity: 1;
    }

    &.is-translated {
      transform: translateY(-60px);
    }

    &__inner {
      width: 100%;
      max-width: 1200px;
      padding: 40px 0;
      margin: 0 auto;
      border-radius: 5px;
      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
      background-color: #242424;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__row {
      width: 95%;
      margin: 0 auto;
      display: flex;
      border-top: 1px solid $c-gray;
    }

    &__btn-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 60px;
    }

    &__btn {
      margin: 10px;
    }
  }
</style>
