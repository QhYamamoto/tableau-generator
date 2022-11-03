<script setup lang="ts">
  import { inject, watch } from 'vue'
  import { $hideEl, $restartScroll } from '../../../utils'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import TheButton from '../../atoms/Button/TheButton.vue'
  import { confirmStoreKey } from '../../../store/storeKeys'
  import { ConfirmStore } from '../../../store/confirm'

  const {
    $confirmMessage,
    $confirmResponse,
    $functionInfo,
    $setConfirmResponse,
    $resetConfirmStates,
  } = inject(confirmStoreKey) as ConfirmStore

  const hideConfirmModal = (res: boolean) => {
    $setConfirmResponse(res)
    if ($confirmResponse.value) {
      const func = $functionInfo.value.fn
      const args = $functionInfo.value.args
      func(...args)
    }
    $hideEl('.confirm-modal')
    $restartScroll('body')
    $resetConfirmStates()
  }

  watch(
    () => $confirmMessage.value,
    (newValue) => {
      if (!newValue) return
      setTimeout(() => {
        document
          .querySelector<HTMLButtonElement>('.confirm-modal__btn--yes')
          ?.focus()
      }, 50)
    }
  )
</script>

<template>
  <div class="confirm-modal" @click.self="() => hideConfirmModal(false)">
    <div class="confirm-modal__inner">
      <IconCross
        class="confirm-modal__cross"
        :clicked="() => hideConfirmModal(false)"
      />
      <TheParagraph class="confirm-modal__header" :text="$confirmMessage" />
      <div class="confirm-modal__btn-wrapper">
        <TheButton
          class="confirm-modal__btn confirm-modal__btn--yes"
          size="small"
          text="Yes"
          :clicked="() => hideConfirmModal(true)"
        />
        <TheButton
          class="confirm-modal__btn"
          size="small"
          text="No"
          :clicked="() => hideConfirmModal(false)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .confirm-modal {
    padding: 20px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $c-tp--dark;
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s ease;

    &.is-shown {
      visibility: visible;
      opacity: 1;
    }

    &__inner {
      position: relative;
      width: 100%;
      max-width: 600px;
      padding: 40px;
      margin: 0 auto;
      border-radius: 5px;
      color: rgba(255, 255, 255, 0.87);
      background-color: $c-black;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__header {
      font-size: $fz-mid-large;
      font-weight: bold;
    }

    &__btn-wrapper {
      margin-top: 20px;
      display: flex;
    }

    &__btn {
      margin: 5px;

      &:focus {
        outline: none;
        border-color: $c-blue;
      }
    }

    &__cross {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.3em 0.5em;
    }
  }
</style>
