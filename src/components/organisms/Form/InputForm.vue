<script setup lang="ts">
  import InputAtom from '../../atoms/Form/TheInput.vue'
  import { computed, inject, watch } from 'vue'
  import { tableauStoreKey } from '../../../store/storeKeys'
  import { TableauStore } from '../../../store/tableau'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import ImageButton from '../../molecules/Button/ImageButton.vue'
  import ErrorSpan from '../../atoms/Text/ErrorSpan.vue'

  const { $tableauArr, $selectedTabI: tabI } = inject(
    tableauStoreKey
  ) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const onFocus = () => {
    const ipaModal = document.querySelector('.ipa-keyboard')
    ipaModal?.removeAttribute('candidate-index')
  }

  const showIpaKeyboard = () => {
    const ipaModal = document.querySelector('.ipa-keyboard')
    ipaModal?.classList.add('is-shown')
    ipaModal?.setAttribute('input-index', tabI.value.toString())
    ipaModal?.removeAttribute('candidate-index')

    const editModal = document.querySelector('.edit-modal')
    editModal?.classList.add('is-translated')

    const targetForm = document.querySelector(
      `.input-form__input`
    ) as HTMLInputElement
    targetForm.focus()
    setTimeout(() => {
      targetForm.setSelectionRange(
        tableau.value.input.cursorPos,
        tableau.value.input.cursorPos
      )
    }, 0)
  }

  const setInputCursorPos = (
    tableau: TableauInterface,
    target: HTMLInputElement
  ) => {
    setTimeout(() => {
      tableau.setInputCursorPos(target.selectionStart)
    }, 0)
  }

  watch(
    () => tableau.value.input.value,
    () => {
      tableau.value.setInputError('')
      try {
        tableau.value.input.validate()
      } catch (error: any) {
        tableau.value.setInputError(error.message)
      }
      tableau.value.candidates.forEach((cand, candI) => {
        tableau.value.setCandidateError(candI, '')
        try {
          cand.validate(tableau.value.input)
        } catch (error: any) {
          tableau.value.setCandidateError(candI, error.message)
        }
      })
    }
  )
</script>

<template>
  <div class="input-form">
    <TheParagraph class="input-form__header" text="Input" />
    <div class="input-form__row">
      <InputAtom
        class="input-form__input"
        type="text"
        :input-value="tableau.input.value"
        :on-input="(target) => tableau.setInput(target.value)"
        :on-focus="onFocus"
        :on-click="(target) => tableau.setInputCursorPos(target.selectionStart)"
        :on-keydown="
          (e) => setInputCursorPos(tableau, e.target as HTMLInputElement)
        "
      />
      <ImageButton
        class="input-form__btn input-form__btn--ipa"
        size="small"
        img="icon-keyboard.png"
        alt="key"
        :clicked="() => showIpaKeyboard()"
      />
    </div>
    <div v-show="!tableau.input.errorMessage" class="input-form__preview">
      <TheSpan :text="'Preview: / '" />
      <TheSpan
        v-for="fragment in tableau.input.valueFragments"
        :text="fragment.str"
        :style="{
          verticalAlign: fragment.sub ? 'sub' : undefined,
          fontSize: fragment.sub ? '0.5em' : undefined,
        }"
      />
      <TheSpan :text="' /'" />
    </div>
    <div v-show="tableau.input.errorMessage" class="input-form__error">
      <ErrorSpan :error-message="tableau.input.errorMessage" />
    </div>
  </div>
</template>

<style lang="scss">
  .input-form {
    padding: 0 20px;
    margin: 0 auto;
    margin-bottom: 20px;

    &__header {
      margin-bottom: 10px;
    }

    &__row {
      display: flex;
      margin-bottom: 10px;
    }

    &__input {
      margin-left: 1em;
    }

    &__preview,
    &__error {
      margin-left: 1em;
    }

    &__btn {
      margin-left: 0.5em;
    }
  }
</style>
