<script setup lang="ts">
  import InstructionParagraph from '../../atoms/Text/InstructionParagraph.vue'
  import InstructionTable from '../Table/InstructionTable.vue'
  import InstructionLead from '../../atoms/Text/InstructionLead.vue'
  import { CONSTRAINT_OBJS } from '../../../consts/constraints'
  import { Constraint } from '../../../domains/tableau/value-objects/constraint'
  import { NON_SOUND_ELEMENTS } from '../../../consts/phonetic-elements/others'

  const constraintDataArr = CONSTRAINT_OBJS.filter((cons) => cons.description)
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((cons) => {
      const consName = Constraint.getNameFragments(cons.name).reduce(
        (pre, cur) =>
          pre + cur.smallCaps ? `| (sc)${cur.str} ` : `| ${cur.str} `,
        ''
      )
      return [consName, cons.description ?? '', cons.reference ?? '']
    })

  // 記号のインストラクションに関するプロパティの値を成形して返却
  const getSymbolDataArr = (dataFor: 'input' | 'candidate') => {
    return NON_SOUND_ELEMENTS.filter(
      (el) => el.for && (el.for === dataFor || el.for === 'both')
    ).map((el) => {
      const label = el.label ?? el.symbol ?? ''
      const usage =
        el.usage ??
        (dataFor === 'input' ? el.usageForInput : el.usageForCandidate) ??
        ''
      const example =
        el.example ??
        (dataFor === 'input' ? el.exampleForInput : el.exampleForCandidate) ??
        ''
      return [label, usage, example]
    })
  }
</script>

<template>
  <div class="instruction-list">
    <div class="instruction-list__item">
      <InstructionLead text="Supported symbols" />
      <!-- <InstructionParagraph
        text="Currently, we support the phonetic symbols in the table below:"
      /> -->
      <!-- TODO: IPAの表作成 -->

      <InstructionParagraph
        text="For INPUT of tableaus, the following symbols can be used: 
        (* The right side of the arrow is the input item, and the left side is the item displayed on Tableau.)"
      />
      <InstructionTable
        :head-data-arr="['Symbols', 'Usage', 'Example']"
        :data-arrs="getSymbolDataArr('input')"
      />
      <InstructionParagraph
        text="For CANDIDATE of tableaus, the following symbols can be used:"
      />
      <InstructionTable
        :head-data-arr="['Symbols', 'Usage', 'Example']"
        :data-arrs="getSymbolDataArr('candidate')"
      />
      <InstructionParagraph
        text="Note that the symbols above are not always required. For example, there is no problem with the morpheme boundaries not being explicit, unless some constraint on the morpheme is chosen. If other symbols (including phonetic ones) not supported by this application are used, they will be simply ignored in the evaluation. Also, it is not reflected in latex code or xlsx files."
      />
    </div>
    <div class="instruction-list__item">
      <InstructionLead text="Supported Constraints" />
      <InstructionParagraph
        :text="'Currently, we support the constraints in the table below:\n(Highly specific constraints, like ○○-V and ○○-[nas], are excluded.)'"
      />
      <InstructionTable
        :head-data-arr="['Name', 'Description', 'References']"
        :data-arrs="constraintDataArr"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .instruction-list {
    &__item {
      padding: 20px 0;
      hyphens: auto;
    }
  }
</style>
