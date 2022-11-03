<script setup lang="ts">
  import hamburgerMenuIcon from '/src/assets/images/icon-hamburger-menu.png'

  interface IconHamburgerProps {
    clicked: AnyFunction
  }

  defineProps<IconHamburgerProps>()
</script>

<template>
  <img
    class="hamburger-icon"
    :src="hamburgerMenuIcon"
    alt="hbg"
    @click="clicked"
  />
</template>

<style lang="scss">
  .hamburger-icon {
    cursor: pointer;
    width: 30px;
    height: 25px;
    position: fixed;
    top: 30px;
    right: 30px;
  }
</style>
