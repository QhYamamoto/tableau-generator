<script setup lang="ts">
  import CandidateCell from '../../atoms/Table/CandidateCell.vue'
  import MarkCell from '../../atoms/Table/MarkCell.vue'
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import TheInput from '../../atoms/Form/TheInput.vue'
  import { inject, ref } from 'vue'
  import { tableauStoreKey } from '../../../store/storeKeys'
  import { TableauStore } from '../../../store/tableau'

  interface TableauRowProps {
    candidate: CandidateInterface
    isWinner: boolean
    constraints: ConstraintInterface[]
    tabI: number
    candI: number
  }
  const props = defineProps<TableauRowProps>()

  const { $tableauArr, $evalMode } = inject(tableauStoreKey) as TableauStore
  const markWidths = ref(Array<number>(props.constraints.length).fill(0))

  const getInputId = (consI: number) => `${props.tabI}${props.candI}${consI}`

  const setMarkWidth = () => {
    props.constraints.forEach((cons, consI) => {
      const correspondingSpan = document.querySelector(
        `.mark-text--${getInputId(consI)}`
      )
      markWidths.value[consI] =
        correspondingSpan?.getBoundingClientRect().width ?? 0
    })
  }

  const focusInput = (consI: number): void => {
    if ($evalMode.value === 'automatic') return
    document
      .querySelector<HTMLInputElement>(`.mark-input--${getInputId(consI)}`)
      ?.focus()
  }
</script>

<template>
  <!-- TODO: Implement setting option to decide the presence or absence of brackets -->
  <tr class="tableau-row">
    <CandidateCell :row-num="candI + 2" :tableau-num="tabI + 1">
      <TheSpan v-if="isWinner" :text="'☞   '" />
      <TheSpan :text="'[ '" />
      <TheSpan
        v-for="fragment in candidate.valueFragments"
        :text="fragment.str"
        :style="{
          verticalAlign: fragment.sub ? 'sub' : undefined,
          fontSize: fragment.sub ? '0.5em' : undefined,
        }"
      />
      <TheSpan :text="' ]'" />
    </CandidateCell>
    <MarkCell
      v-for="(cons, consI) in constraints"
      :is-shaded="cons.marks[candI].isShaded"
      :dashed-right-border="cons.rightDash"
      :style="{ cursor: $evalMode === 'manual' ? 'text' : 'default' }"
      @click="focusInput(consI)"
    >
      <TheInput
        v-if="$evalMode === 'manual'"
        :class="`tableau-row__mark-input mark-input--${getInputId(consI)}`"
        :style="`width: ${Math.max(markWidths[consI], 1)}px`"
        :input-value="cons.marks[candI].value"
        :on-input="
          (target) => $tableauArr[tabI].setMark(consI, candI, target.value)
        "
        @vnode-mounted="setMarkWidth()"
        @vnode-updated="setMarkWidth()"
      />
      <TheSpan
        :class="[
          `tableau-row__mark-text mark-text--${getInputId(consI)}`,
          { 'is-hidden': $evalMode === 'manual' },
        ]"
        :text="cons.marks[candI].value"
      />
    </MarkCell>
  </tr>
</template>

<style lang="scss">
  .tableau-row {
    &__mark-input {
      border: none;
      font-size: inherit;
      padding: 0 10px;
      box-sizing: content-box;
      background-color: transparent;
      height: 1em;
    }

    &__mark-text {
      opacity: 1;
      visibility: visible;
      position: relative;
      top: 0;

      &.is-hidden {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        top: -100%;
      }
    }
  }
</style>
