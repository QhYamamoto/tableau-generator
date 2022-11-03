<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router'
  import router from '../../../router'
  import { $hideEl } from '../../../utils'
  import ClickableSpan from '../../atoms/Text/ClickableSpan.vue'

  const to = (dest: RouteLocationRaw) => {
    router.push(dest)
    $hideEl('.side-menu')
  }
</script>

<template>
  <div class="side-menu" @click.self="$hideEl('.side-menu')">
    <div class="side-menu__inner">
      <ClickableSpan
        class="side-menu__item"
        :text="'Top'"
        :clicked="() => to('/')"
      />
      <ClickableSpan
        class="side-menu__item"
        :text="'Instructions'"
        :clicked="() => to('/instructions')"
      />
      <ClickableSpan
        class="side-menu__item"
        :text="'Configuration'"
        :clicked="() => to('/config')"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .side-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s ease;

    &.is-shown {
      visibility: visible;
      opacity: 1;
    }

    &.is-shown > &__inner {
      transform: translateX(0);
    }

    &__inner {
      width: 200px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: $c-gray--dark;
      display: flex;
      flex-direction: column;
      transition: all 0.4s ease;
      transform: translateX(100%);
    }

    &__item {
      font-size: $fz-mid-large;
      padding: 20px;
      transition: all 0.4s ease;

      &:hover {
        background-color: $c-gray--darkest;
      }
    }
  }
</style>
