import { describe, test, expect } from 'vitest'
import { PHONETIC_ELEMENTS } from '../../../../consts/phonetic-elements'
import { Candidate } from '../../../../domains/tableau/value-objects/candidate'
import { Constraint } from '../../../../domains/tableau/value-objects/constraint'
import { Input } from '../../../../domains/tableau/value-objects/input'
import { Mark } from '../../../../domains/tableau/value-objects/mark'

describe('testConstraint', () => {
  test('testGetters', () => {
    const constraint = new Constraint(
      1,
      [new Mark(), new Mark()],
      'TestCons([+TestFeature])'
    )

    expect(constraint.nameWithoutParentheses).toBe('TestCons[+TestFeature]')

    const expectedFrgs: ConstraintNameFragment[] = [
      {
        str: 'TestCons',
        smallCaps: true,
      },
      {
        str: '[+TestFeature]',
        smallCaps: false,
      },
    ]

    constraint.nameFragments.forEach((resFrg, i) => {
      const expectedFrg = expectedFrgs[i]
      expect(resFrg.str).toBe(expectedFrg.str)
      expect(resFrg.smallCaps).toBe(expectedFrg.smallCaps)
    })
  })

  test('testAssess', () => {
    // constraintが不特定の場合のテストのみ
    const constraint = new Constraint(1, [new Mark(), new Mark()])
    const res = constraint.assess(
      PHONETIC_ELEMENTS,
      new Input(),
      new Candidate()
    )
    expect(res).toBe(0)
  })
})
