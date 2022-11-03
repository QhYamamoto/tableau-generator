<script setup lang="ts">
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import TheButton from '../../atoms/Button/TheButton.vue'

  interface ConstraintButtonProps {
    fragments: ConstraintNameFragment[]
    clicked: AnyFunction
  }

  defineProps<ConstraintButtonProps>()
</script>

<template>
  <TheButton class="constraint-button" size="small" :clicked="clicked">
    <TheSpan
      v-for="fragment in fragments"
      :text="fragment.str"
      :style="{ fontVariant: fragment.smallCaps ? 'small-caps' : 'default' }"
    />
  </TheButton>
</template>
