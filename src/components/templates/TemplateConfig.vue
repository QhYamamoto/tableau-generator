<template>
  <div class="template-config">
    <slot name="page-title" />
    <div class="template-config__header">
      <slot name="header" />
    </div>
    <div class="template-config__selector">
      <slot name="selector" />
    </div>
    <div class="template-config__feature-table-list">
      <slot name="feature-table-list" />
    </div>
  </div>
</template>

<style lang="scss">
  .template-config {
    &__header {
      margin-top: 20px;
      text-align: center;
    }

    &__selector {
      margin-top: 10px;
      margin-bottom: 20px;
      text-align: center;
    }

    &__feature-table-list {
      margin: 0 auto;
    }
  }
</style>
