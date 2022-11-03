<script setup lang="ts">
  import {
    CATEGORIZED_FAITHFULNESS_CONSTRAINTS,
    CATEGORIZED_MARKEDNESS_CONSTRAINTS,
  } from '../../../consts/constraints'
  import IconCross from '../../atoms/Icon/IconCross.vue'
  import TheParagraph from '../../atoms/Text/TheParagraph.vue'
  import { tableauStoreKey } from '../../../store/storeKeys'
  import { TableauStore } from '../../../store/tableau'
  import { computed, inject } from 'vue'
  import ConstraintButton from '../../molecules/Button/ConstraintButton.vue'
  import { Constraint } from '../../../domains/tableau/value-objects/constraint'
  import { $hideEl } from '../../../utils'

  const { $tableauArr, $selectedTabI: tabI } = inject(
    tableauStoreKey
  ) as TableauStore
  const tableau = computed(() => $tableauArr.value[tabI.value])

  const setConstraint = (constraint: ConstraintObj) => {
    const consI = document
      .querySelector('.constraints-modal')
      ?.getAttribute('constraint-index')
    if (consI) tableau.value.setConstraint(+consI, constraint.name)
    $hideEl('.constraints-modal')
  }
</script>
<!-- TODO: Search function -->
<template>
  <div class="constraints-modal">
    <IconCross
      class="constraints-modal__cross"
      :clicked="() => $hideEl('.constraints-modal')"
    />
    <div class="constraints-modal__inner">
      <div
        v-for="categoryList in [
          { Faithfulness: CATEGORIZED_FAITHFULNESS_CONSTRAINTS },
          { Markedness: CATEGORIZED_MARKEDNESS_CONSTRAINTS },
        ]"
        class="constraints-modal__category-list"
      >
        <div class="constraints-modal__category">
          <div
            v-for="(subcategoryList, categoryName) in categoryList"
            class="constraints-modal__category-inner"
          >
            <TheParagraph
              class="constraints-modal__category-name"
              :text="categoryName"
            />
            <div
              v-for="(constraintList, subcategoryName) in subcategoryList"
              class="constraints-modal__subcategory"
            >
              <TheParagraph
                class="constraints-modal__subcategory-name"
                :text="subcategoryName"
              />
              <div class="constraints-modal__cons-list">
                <ConstraintButton
                  v-for="constraint in constraintList"
                  class="constraints-modal__cons-name"
                  :fragments="Constraint.getNameFragments(constraint.name)"
                  :clicked="() => setConstraint(constraint)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .constraints-modal {
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $c-gray--dark;
    z-index: 200;
    visibility: hidden;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.6s ease;

    &.is-shown {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }

    &__inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: scroll;

      &::-webkit-scrollbar {
        width: 5px;
        height: 0px;
      }
    }

    &__cross {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.3em 0.5em;
      font-size: $fz-large;
    }

    &__category {
      padding: 30px 30px 0px;
    }

    &__category-name {
      font-size: $fz-large;
    }

    &__subcategory {
      margin: 10px 20px;
    }

    &__subcategory-name {
      font-size: $fz-mid-large;
    }

    &__cons-list {
      margin-top: 10px;
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
    }

    &__cons-name {
      margin-right: 7px;
      margin-top: 7px;
    }
  }
</style>
