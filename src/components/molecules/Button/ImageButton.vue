<script setup lang="ts">
  import TheButton from '../../atoms/Button/TheButton.vue'
  import TheSpan from '../../atoms/Text/TheSpan.vue'

  interface ImageButtonProps {
    img: string
    size: 'small' | 'large'
    alt?: string
    hoverMessage?: string
    clicked: AnyFunction
  }

  const props = defineProps<ImageButtonProps>()

  const icon = new URL(`/src/assets/images/${props.img}`, import.meta.url).href
  const classNameArr = [
    'image-button__img',
    props.size === 'small'
      ? 'image-button__img--small'
      : 'image-button__img--large',
  ]
</script>

<template>
  <div class="image-button">
    <TheSpan
      v-if="hoverMessage"
      class="image-button__hover-message"
      :text="hoverMessage"
    />
    <TheButton :size="size" class="image-button__btn" :clicked="clicked">
      <img :class="classNameArr" :src="icon" :alt="alt" />
    </TheButton>
  </div>
</template>

<style lang="scss">
  .image-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: stretch;

    &__hover-message {
      font-size: $fz-smaller;
      transition: all 0.4s ease;
      opacity: 0;
      position: absolute;
      top: -2em;
      visibility: none;
    }

    &:hover &__hover-message {
      opacity: 1;
      visibility: visible;
      width: fit-content;
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__img {
      &--large {
        width: 20px;
        height: 20px;
      }
      &--small {
        width: 15px;
        height: 15px;
      }
    }
  }
</style>
