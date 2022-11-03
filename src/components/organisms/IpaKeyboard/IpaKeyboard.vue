<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { tableauStoreKey } from '../../../store/storeKeys.js'
  import { TableauStore } from '../../../store/tableau.js'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import TheButton from '../../atoms/Button/TheButton.vue'
  import { $hideEl } from '../../../utils'
  import { CATEGORIZED_SYMBOL_ARRAYS } from '../../../consts/phonetic-elements'

  const { $tableauArr, $selectedTabI: tabI } = inject(
    tableauStoreKey
  ) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const hideIpaKeyBoard = () => {
    $hideEl('.ipa-keyboard')
    document.querySelector('.edit-modal')?.classList.remove('is-translated')
    restoreFocusOnInput()
  }

  const restoreFocusOnInput = () => {
    const candI = document
      .querySelector('.ipa-keyboard')
      ?.getAttribute('candidate-index')
    const targetForm = document.querySelector<HTMLInputElement>(
      candI
        ? `.candidate-forms__input--${tabI.value}-${candI}`
        : '.input-form__input'
    )
    targetForm?.focus()
  }

  const insertSymbol = (symbol: string) => {
    symbol = symbol.replace('◌', '')
    const candI = document
      .querySelector('.ipa-keyboard')
      ?.getAttribute('candidate-index')

    if (candI) insertSymbolToCandidate(candI, symbol)
    else insertSymbolToInput(symbol)
  }

  const insertSymbolToCandidate = (candI: string, symbol: string) => {
    const targetInput = document.querySelector<HTMLInputElement>(
      `.candidate-forms__input--${tabI.value}-${candI}`
    )
    const candidate = tableau.value.candidates[+candI]
    const newCurPos = candidate.cursorPos + symbol.length
    tableau.value.setCandidate(+candI, getNewValue(candidate, symbol))
    tableau.value.setCandidateCursorPos(+candI, newCurPos)
    if (targetInput) setCursor(newCurPos, targetInput)
  }

  const insertSymbolToInput = (symbol: string) => {
    const targetInput =
      document.querySelector<HTMLInputElement>('.input-form__input')
    const input = tableau.value.input
    const newCurPos = input.cursorPos + symbol.length
    tableau.value.setInput(getNewValue(input, symbol))
    tableau.value.setInputCursorPos(newCurPos)
    if (targetInput) setCursor(newCurPos, targetInput)
  }

  const getNewValue = (
    target: InputInterface | CandidateInterface,
    symbol: string
  ) => {
    const rightSideStr = target.value.substring(0, target.cursorPos)
    const leftSideStr = target.value.substring(target.cursorPos)
    return rightSideStr + symbol + leftSideStr
  }

  const setCursor = (newCurPos: number, targetInput: HTMLInputElement) => {
    targetInput.focus()
    setTimeout(() => {
      targetInput.setSelectionRange(newCurPos, newCurPos)
    }, 0)
  }
</script>

<template>
  <div class="ipa-keyboard">
    <IconCross class="ipa-keyboard__cross" :clicked="hideIpaKeyBoard" />
    <div class="ipa-keyboard__inner">
      <div
        v-for="(symbolArr, key) in CATEGORIZED_SYMBOL_ARRAYS"
        class="ipa-keyboard__row"
      >
        <TheParagraph class="ipa-keyboard__header" :text="(key as string)" />
        <TheButton
          v-for="symbol in symbolArr"
          class="ipa-keyboard__btn"
          size="small"
          :text="symbol"
          :clicked="() => insertSymbol(symbol)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .ipa-keyboard {
    padding: 20px;
    height: 180px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $c-gray--dark;
    z-index: 200;
    visibility: hidden;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.4s ease;

    &.is-shown {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }

    &__inner {
      height: 180px;
      width: 80%;
      margin: 0 auto;
      padding-bottom: 40px;
      overflow: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__cross {
      position: absolute;
      top: 0;
      right: 10px;
    }

    &__header {
      margin-bottom: 5px;
    }

    &__row {
      margin-bottom: 10px;
    }

    &__btn {
      margin: 2px;
    }
  }
</style>
