<script setup lang="ts">
  import TemplateApp from './components/templates/TemplateApp.vue'
  import IconHamburger from './components/atoms/Icon/IconHamburger.vue'
  import HamburgerMenu from './components/organisms/Menu/HamburgerMenu.vue'
  import useTableauStore from './store/tableau'
  import useConfigStore from './store/config'
  import { provide } from 'vue'
  import {
    tableauStoreKey,
    configStoreKey,
    latexCodeStoreKey,
    confirmStoreKey,
  } from './store/storeKeys'
  import useLatexCodeStore from './store/latexCode'
  import useConfirmStore from './store/confirm'
  import { $showEl } from './utils'

  provide(tableauStoreKey, useTableauStore())
  provide(configStoreKey, useConfigStore())
  provide(latexCodeStoreKey, useLatexCodeStore())
  provide(confirmStoreKey, useConfirmStore())
</script>

<template>
  <TemplateApp>
    <template #hamburger-icon>
      <IconHamburger :clicked="() => $showEl('.side-menu')" />
    </template>
    <template #page-content>
      <router-view />
    </template>
    <template #hamburger-menu>
      <HamburgerMenu />
    </template>
  </TemplateApp>
</template>
