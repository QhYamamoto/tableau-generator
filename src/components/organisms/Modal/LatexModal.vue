<script setup lang="ts">
  import { inject, ref } from 'vue'
  import { latexCodeStoreKey } from '../../../store/storeKeys'
  import { $hideEl, $restartScroll } from '../../../utils'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import ImageButton from '../../molecules/Button/ImageButton.vue'
  import { LatexCodeStore } from '../../../store/latexCode'

  const { $latexCode } = inject(latexCodeStoreKey) as LatexCodeStore
  const hoverMessage = ref('')

  const hideLatexModal = () => {
    $hideEl('.latex-modal')
    $restartScroll('body')
  }

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText($latexCode.value)
    hoverMessage.value = 'Copied!'
    setTimeout(() => {
      hoverMessage.value = ''
    }, 2000)
  }
</script>

<template>
  <div class="latex-modal" @click.self="hideLatexModal">
    <div class="latex-modal__inner">
      <IconCross class="latex-modal__cross" :clicked="hideLatexModal" />
      <TheParagraph
        class="latex-modal__header"
        :text="'Copy and paste the following code into your LaTeX document.'"
      />
      <div class="latex-modal__code-wrapper">
        <ImageButton
          class="latex-modal__copy-btn"
          size="small"
          :img="'icon-copy.png'"
          :clicked="copyCodeToClipboard"
          :hover-message="hoverMessage"
        />
        <TheParagraph class="latex-modal__code" :text="$latexCode + ''" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .latex-modal {
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
    }

    &__code-wrapper {
      max-height: 250px;
      min-height: 50px;
      margin-top: 20px;
      padding: 20px;
      width: 100%;
      border-radius: 5px;
      line-height: 1.2em;
      overflow-wrap: break-word;
      background-color: $c-gray--dark;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $c-gray;
        border-radius: 5px;
      }

      &::-webkit-scrollbar-track {
        background-color: $c-gray--light;
        border-radius: 5px;
      }
    }

    &__copy-btn {
      position: absolute;
      top: 100px;
      right: 80px;

      & > span {
        top: -1.5em;
      }
    }

    &__code {
      white-space: pre-wrap;
    }

    &__cross {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.3em 0.5em;
    }
  }
</style>
