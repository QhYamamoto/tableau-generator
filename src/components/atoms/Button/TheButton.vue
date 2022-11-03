<script setup lang="ts">
  interface TheButtonProps {
    size: 'small' | 'large'
    text?: string
    clicked: AnyFunction
    disabled?: boolean
  }

  defineProps<TheButtonProps>()
</script>

<template>
  <button
    :class="['button', size === 'small' ? 'button--small' : 'button--large']"
    :disabled="disabled"
    @click.prevent="clicked"
  >
    {{ text }}
    <slot />
  </button>
</template>

<style lang="scss">
  .button {
    color: $c-gray--lighter;

    &--small {
      border-radius: 6px;
      border: 1px solid transparent;
      padding: 0.3em 0.6em;
      font-size: $fz-smaller;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }

    &--large {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: $fz-normal;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }

    &:hover:not(:disabled) {
      border-color: $c-blue;
    }

    &:disabled {
      filter: brightness(0.5);
    }
  }
</style>
