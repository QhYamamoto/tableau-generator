import { describe, test, expect } from 'vitest'
import { PHONETIC_ELEMENTS } from '../../../../consts/phonetic-elements'
import { Input } from '../../../../domains/tableau/value-objects/input'

describe('testInput', () => {
  test('testGetters', () => {
    const input = new Input('t-e{s1t}')

    const formattedValue = input.formattedValue
    expect(formattedValue).toBe('t-es1t')

    const valueFrgs = input.valueFragments
    const expectedFrgs: ValueFragment[] = [
      {
        str: 't-es',
        sub: false,
      },
      {
        str: '1',
        sub: true,
      },
      {
        str: 't',
        sub: false,
      },
    ]

    valueFrgs.forEach((resFrg, frgI) => {
      const expectedFrg = expectedFrgs[frgI]
      expect(resFrg.str).toBe(expectedFrg.str)
      expect(resFrg.sub).toBe(expectedFrg.sub)
    })

    expect(input.morphemes).toStrictEqual(['t', 'est'])
  })

  test('testConvertToPhoneticEls', () => {
    const input = new Input('t1{e2s3}t4')
    const testTargets: InputFilteringTarget[] = [
      'index',
      'coalescence-content',
      'coalescence-border',
    ]

    const setResStr = (res: PhoneticElement[]) => {
      let resStr = ''
      res.forEach((el) => (resStr += el.symbol))
      return resStr
    }

    const evaluate = (
      testTargets: InputFilteringTarget[],
      expectedStr1: string,
      expectedStr2: string
    ) => {
      let res = input.convertToPhoneticEls(
        PHONETIC_ELEMENTS,
        'filter out',
        ...testTargets
      )
      let resStr = setResStr(res)
      expect(resStr).toBe(expectedStr1)
      res = input.convertToPhoneticEls(
        PHONETIC_ELEMENTS,
        'retain',
        ...testTargets
      )
      resStr = setResStr(res)
      expect(resStr).toBe(expectedStr2)
    }

    evaluate(testTargets, 'tt', 't1{e2s3}t4')
    testTargets.pop()
    evaluate(testTargets, 't{}t', 't1e2s3t4')
    testTargets.pop()
    evaluate(testTargets, 't{es}t', 't1t4')
    testTargets.pop()
    evaluate(testTargets, 't1{e2s3}t4', 'tt')
  })

  test('testValidate', () => {
    const evaluate = (value: string, ch: boolean) => {
      const input = new Input(value)
      let errMsg = ''
      try {
        input.validate()
      } catch (errorMessage: any) {
        errMsg = errorMessage
      }
      if (ch) expect(errMsg).toBeTruthy()
      else expect(errMsg).toBeFalsy()
    }

    evaluate('test', false)
    evaluate('te-st', false)
    evaluate('te{st}', false)
    evaluate('te{st', true)
    evaluate('t1e2s3t4', false)
  })
})
