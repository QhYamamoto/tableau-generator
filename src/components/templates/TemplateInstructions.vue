<template>
  <div class="template-instructions">
    <slot name="page-title" />
    <div class="template-instructions__header">
      <slot name="header" />
    </div>
    <div class="instructions">
      <slot name="instructions" />
    </div>
  </div>
</template>

<style lang="scss">
  .template-instructions {
    &__header {
      margin-top: 20px;
      text-align: center;
    }
  }

  .instructions {
    margin-top: 20px;
  }
</style>
