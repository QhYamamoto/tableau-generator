<template>
  <div class="template-top">
    <div class="template-top__page-title">
      <slot name="page-title" />
    </div>
    <slot name="tableau-list" />
    <div class="template-top__center-btns">
      <slot name="center-btns" />
    </div>
    <div class="template-top__mode-change-btn">
      <slot name="mode-change-btn" />
    </div>
    <slot name="latex-modal" />
    <slot name="confirm-modal" />
    <slot name="edit-modal" />
    <slot name="ipa-keyboard" />
    <slot name="cons-modal" />
  </div>
</template>

<style lang="scss">
  .template-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 60px;

    &__page-title {
      margin-bottom: 20px;
    }

    &__center-btns {
      display: flex;
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__mode-change-btn {
      position: fixed;
      bottom: 10px;
      right: 20px;
    }
  }
</style>
