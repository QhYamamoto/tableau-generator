<script setup lang="ts">
  import { computed, inject, watch } from 'vue'
  import { tableauStoreKey } from '../../../store/storeKeys.js'
  import { TableauStore } from '../../../store/tableau.js'
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import InputAtom from '../../atoms/Form/TheInput.vue'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import ArrowButton from '../../molecules/Button/ArrowButton.vue'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import ImageButton from '../../molecules/Button/ImageButton.vue'
  import ErrorSpan from '../../atoms/Text/ErrorSpan.vue'
  import TheButton from '../../atoms/Button/TheButton.vue'

  const { $tableauArr, $selectedTabI: tabI } = inject(
    tableauStoreKey
  ) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const changeTargetCandidate = (candI: number) => {
    const ipaModal = document.querySelector('.ipa-keyboard')
    ipaModal?.setAttribute('candidate-index', candI.toString())
  }

  const swap = (arr: any[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]])

  const up = (candI: number) => {
    swap(tableau.value.candidates, candI, candI - 1)
    tableau.value.constraints.forEach((cons) =>
      swap(cons.marks, candI, candI - 1)
    )
  }

  const down = (candI: number) => {
    swap(tableau.value.candidates, candI, candI + 1)
    tableau.value.constraints.forEach((cons) =>
      swap(cons.marks, candI, candI + 1)
    )
  }

  const showIpaKeyboard = (candI: number) => {
    const ipaModal = document.querySelector('.ipa-keyboard')
    ipaModal?.classList.add('is-shown')
    ipaModal?.setAttribute('candidate-index', candI.toString())

    const editModal = document.querySelector('.edit-modal')
    editModal?.classList.add('is-translated')

    const targetForm = document.querySelector<HTMLInputElement>(
      `.candidate-forms__input--${tabI.value}-${candI}`
    )
    targetForm?.focus()
    const cand = tableau.value.candidates[candI]
    targetForm?.setSelectionRange(cand.cursorPos, cand.cursorPos)
  }

  const setCandidateCursorPos = (
    tableau: TableauInterface,
    candI: number,
    target: HTMLInputElement
  ) => {
    setTimeout(
      () => tableau.setCandidateCursorPos(candI, target.selectionStart),
      0
    )
  }

  watch(
    () => tableau.value.candidates.map((cand) => cand.value),
    (newCandValues, oldCandValues) => {
      // Return null if a candidate has been added or removed
      if (newCandValues.length !== oldCandValues.length) return
      // Search index of a changed candidate
      const candI = newCandValues.findIndex(
        (val, candI) => val !== oldCandValues[candI]
      )
      if (candI === -1) return
      tableau.value.setCandidateError(candI, '')
      try {
        tableau.value.candidates[candI].validate(tableau.value.input)
      } catch (error: any) {
        tableau.value.setCandidateError(candI, error.message)
      }
    }
  )
</script>

<template>
  <div class="candidate-forms">
    <TheParagraph class="candidate-forms__header" text="Candidates" />
    <div
      v-for="(cand, candI) in tableau.candidates"
      class="candidate-forms__item"
    >
      <div class="candidate-forms__row">
        <TheSpan class="candidate-forms__number" :text="`${candI + 1}. `" />
        <InputAtom
          :class="[
            'candidate-forms__input',
            `candidate-forms__input--${tabI}-${candI}`,
          ]"
          type="text"
          :input-value="cand.value"
          :on-input="(target) => tableau.setCandidate(candI, target.value)"
          :on-focus="() => changeTargetCandidate(candI)"
          :on-click="(target) => setCandidateCursorPos(tableau, candI, target)"
          :on-keydown="
            (e) =>
              setCandidateCursorPos(tableau, candI, e.target as HTMLInputElement)
          "
        />
        <ImageButton
          class="candidate-forms__btn candidate-forms__btn--ipa"
          size="small"
          img="icon-keyboard.png"
          alt="key"
          :clicked="() => showIpaKeyboard(candI)"
        />
        <div class="candidate-forms__arrow-btns">
          <ArrowButton
            v-if="candI !== 0"
            class="candidate-forms__arrow-btn candidate-forms__arrow-btn--up"
            :direction="'up'"
            :clicked="() => up(candI)"
          />
          <ArrowButton
            v-if="candI !== tableau.candidates.length - 1"
            class="candidate-forms__arrow-btn candidate-forms__arrow-btn--down"
            :direction="'down'"
            :clicked="() => down(candI)"
          />
        </div>
        <IconCross
          v-if="tableau.candidates.length > 2"
          class="candidate-forms__btn candidate-forms__btn--delete"
          :clicked="() => tableau.removeCandidate(candI)"
        />
      </div>
      <div v-show="!cand.errorMessage" class="candidate-forms__preview">
        <TheSpan :text="'Preview: [ '" />
        <TheSpan
          v-for="fragment in cand.valueFragments"
          :text="fragment.str"
          :style="{
            verticalAlign: fragment.sub ? 'sub' : undefined,
            fontSize: fragment.sub ? '0.5em' : undefined,
          }"
        />
        <TheSpan :text="' ]'" />
      </div>
      <div v-show="cand.errorMessage" class="candidate-forms__error">
        <ErrorSpan :error-message="cand.errorMessage" />
      </div>
      <TheButton
        class="candidate-forms__btn candidate-forms__btn--add"
        size="small"
        :clicked="() => tableau.addCandidate(candI + 1)"
        text="+insert"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .candidate-forms {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    border-right: 1px solid $c-gray;
    padding: 10px 20px;

    &__header {
      width: 100%;
    }

    &__item {
      padding: 5px 0;
    }

    &__row {
      display: flex;
      align-items: center;
      position: relative;
    }

    &__number {
      position: absolute;
      left: 1em;
    }

    &__input {
      margin-left: 40px;
      width: 130px;
    }

    &__preview,
    &__error {
      width: 100%;
      text-indent: 40px;
      text-align: left;
      margin-top: 5px;
      font-size: $fz-small;
    }

    &__btn--delete,
    &__btn--ipa {
      margin-left: 10px;
    }

    &__arrow-btns {
      position: relative;
      margin-left: 10px;
      width: 20px;
    }

    &__arrow-btn {
      position: absolute;
      left: 0;
      &--up {
        bottom: 1px;
      }
      &--down {
        top: 1px;
      }
    }

    &__btn--add {
      font-size: $fz-smallest;
      display: block;
      margin-left: 40px;
      margin-top: 10px;
    }
  }
</style>
