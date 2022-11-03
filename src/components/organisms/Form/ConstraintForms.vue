<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { tableauStoreKey } from '../../../store/storeKeys.js'
  import { TableauStore } from '../../../store/tableau.js'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import ArrowButton from '../../molecules/Button/ArrowButton.vue'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import ImageButton from '../../molecules/Button/ImageButton.vue'
  import TheSpan from '../../atoms/Text/TheSpan.vue'
  import TheButton from '../../atoms/Button/TheButton.vue'

  const { $tableauArr, $selectedTabI: tabI } = inject(
    tableauStoreKey
  ) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const showConsModal = (consI: number) => {
    const consModal = document.querySelector('.constraints-modal')
    consModal?.classList.add('is-shown')
    consModal?.setAttribute('constraint-index', consI.toString())
  }

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
        <TheSpan
          v-for="frg in cons.nameFragments"
          class="constraint-forms__cons-name"
          :text="frg.str"
          :style="{
            fontVariant: frg.smallCaps ? 'small-caps' : 'default',
          }"
        />
        <TheSpan
          v-if="!cons.nameFragments.length"
          class="constraint-forms__placeholder"
          text="Select Constraint..."
        />
        <ImageButton
          class="constraint-forms__btn constraint-forms__btn--menu"
          size="small"
          img="icon-menu.png"
          alt="menu"
          :clicked="() => showConsModal(consI)"
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
      <TheButton
        class="constraint-forms__btn constraint-forms__btn--add"
        size="small"
        :clicked="() => tableau.addConstraint(consI + 1)"
        text="+insert"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .constraint-forms {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    padding: 10px 20px;

    &__header {
      width: 100%;
    }

    &__item {
      padding: 5px 0;
    }

    &__row {
      display: flex;
      align-items: center;
      position: relative;
    }

    &__number {
      position: absolute;
      left: 1em;
    }

    &__cons-name {
      margin-left: 40px;
      min-width: 130px;
    }

    &__placeholder {
      margin-left: 40px;
      min-width: 130px;
      color: $c-gray;
    }

    &__btn--menu {
      margin-left: 10px;
    }

    &__btn--delete {
      margin-left: 10px;
      width: 1.5em;
      height: 1.5em;
    }

    &__rank {
      margin-left: 10px;
      font-size: $fz-small;
    }

    &__arrow-btns {
      position: relative;
      width: 20px;
      margin-left: 10px;
    }

    &__arrow-btn {
      position: absolute;
      left: 0;
      &--up {
        bottom: 1px;
      }
      &--down {
        top: 1px;
      }
    }

    &__btn--add {
      font-size: $fz-smallest;
      display: block;
      margin-left: 40px;
      margin-top: 10px;
    }
  }
</style>
