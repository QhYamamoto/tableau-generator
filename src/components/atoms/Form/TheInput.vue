<script setup lang="ts">
  interface TheInputProps {
    inputValue?: string
    onInput: (target: HTMLInputElement) => void
    onFocus?: AnyFunction
    onFocusout?: AnyFunction
    onClick?: (target: HTMLInputElement) => void
    onKeydown?: (event: KeyboardEvent) => void
  }
  defineProps<TheInputProps>()
</script>

<template>
  <input
    :value="inputValue"
    @input="onInput($event.target as HTMLInputElement)"
    @focus="onFocus"
    @focusout="onFocusout"
    @click="onClick ? onClick($event.target as HTMLInputElement) : null"
    @keydown="onKeydown ? onKeydown($event) : null"
  />
</template>
