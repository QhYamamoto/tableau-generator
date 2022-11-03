<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { tableauStoreKey } from '../../../store/storeKeys.js'
  import { TableauStore } from '../../../store/tableau.js'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import ArrowButton from '../../molecules/Button/ArrowButton.vue'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import TheInput from '../../atoms/Form/TheInput.vue'
  import TheButton from '../../atoms/Button/TheButton.vue'

  const { $tableauArr, $selectedTabI: tabI } = inject(
    tableauStoreKey
  ) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const up = (cons: ConstraintInterface, consI: number) => {
    tableau.value.setConstraintRank(consI, cons.rank - 1)
    tableau.value.sortConstraintsByRank()
  }

  const down = (cons: ConstraintInterface, consI: number) => {
    tableau.value.setConstraintRank(consI, cons.rank + 1)
    tableau.value.sortConstraintsByRank()
  }
</script>

<template>
  <div class="constraint-forms">
    <TheParagraph class="constraint-forms__header" text="Constraints" />
    <div
      v-for="(cons, consI) in tableau.constraints"
      class="constraint-forms__item"
    >
      <div class="constraint-forms__row">
        <TheSpan class="constraint-forms__number" :text="`${consI + 1}. `" />
        <TheInput
          :class="[
            'manual-constraint-forms__input',
            `manual-constraint-forms__input--${tabI}-${consI}`,
          ]"
          type="text"
          :input-value="cons.name"
          :on-input="(target) => tableau.setConstraint(consI, target.value)"
        />
        <TheSpan class="constraint-forms__rank" :text="`R${cons.rank}`" />
        <div class="constraint-forms__arrow-btns">
          <ArrowButton
            v-if="cons.rank > 1"
            class="constraint-forms__arrow-btn constraint-forms__arrow-btn--up"
            :direction="'up'"
            :clicked="() => up(cons, consI)"
          />
          <ArrowButton
            v-if="
              consI === 0 ||
              consI !== tableau.constraints.length - 1 ||
              cons.rank < tableau.constraints[consI - 1].rank + 1
            "
            class="constraint-forms__arrow-btn constraint-forms__arrow-btn--down"
            :direction="'down'"
            :clicked="() => down(cons, consI)"
          />
        </div>
        <IconCross
          v-if="tableau.constraints.length > 1"
          class="constraint-forms__btn constraint-forms__btn--delete"
          :clicked="() => tableau.removeConstraint(consI)"
        />
      </div>
      <div class="manual-constraint-forms__preview">
        <TheSpan text="Preview: " />
        <TheSpan
          v-for="frg in cons.nameFragments"
          :text="frg.str"
          :style="{
            fontVariant: frg.smallCaps ? 'small-caps' : 'default',
          }"
        />
      </div>
      <TheButton
        class="constraint-forms__btn constraint-forms__btn--add"
        size="small"
        :clicked="() => tableau.addConstraint(consI + 1)"
        text="+Add Constraint"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .manual-constraint-forms {
    &__input {
      margin-left: 40px;
      width: 130px;
    }

    &__preview {
      margin-left: 40px;
      margin-top: 5px;
      font-size: $fz-small;
    }
  }
</style>
