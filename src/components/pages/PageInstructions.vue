<script setup lang="ts">
  import TemplateInstructions from '../templates/TemplateInstructions.vue'
  import PageTitle from '../atoms/Text/PageTitle.vue'
  import TheHeader from '../atoms/Text/TheHeader.vue'
  import InstructionList from '../organisms/Text/InstructionList.vue'
</script>

<template>
  <TemplateInstructions>
    <template #page-title>
      <PageTitle text="OT Tableau Generator" />
    </template>
    <template #header>
      <TheHeader text="― Instructions ―" />
    </template>
    <template #instructions>
      <InstructionList lead="Lead Sentence" />
    </template>
  </TemplateInstructions>
</template>

<style lang="scss"></style>
