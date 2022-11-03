import { describe, test, expect } from 'vitest'
import { PHONETIC_ELEMENTS } from '../../../../consts/phonetic-elements'
import { Candidate } from '../../../../domains/tableau/value-objects/candidate'
import { Input } from '../../../../domains/tableau/value-objects/input'

describe('testCandidate', () => {
  test('testGetters', () => {
    let candidate = new Candidate('.(t)-<e1>{st}.')

    expect(candidate.formattedValue).toBe('.t-e1st.')
    expect(candidate.morphemes).toStrictEqual(['t', 'est'])

    const valueFrgs = candidate.valueFragments
    const expectedFrgs: ValueFragment[] = [
      {
        str: '.t-e',
        sub: false,
      },
      {
        str: '1',
        sub: true,
      },
      {
        str: 'st.',
        sub: false,
      },
    ]
    valueFrgs.forEach((resFrg, frgI) => {
      const expectedFrg = expectedFrgs[frgI]
      expect(resFrg.str).toBe(expectedFrg.str)
      expect(resFrg.sub).toBe(expectedFrg.sub)
    })

    expect(candidate.morphemes).toStrictEqual(['t', 'est'])

    expect(candidate.isDefeated).toBe(false)
    candidate = new Candidate('.(t)-<e1>{st2,3}.', 'defeated')
    expect(candidate.isDefeated).toBe(true)
  })

  test('testConvertToPhoneticEls', () => {
    const candidate = new Candidate('.(t)<e1>{st2,3}.')
    const testTargets: FilteringTarget[] = [
      'index',
      'insertion-content',
      'insertion-border',
      'coalescence-content',
      'coalescence-border',
      'mutation-border',
      'syllable-border',
    ]

    const getResStr = (res: PhoneticElement[]) => {
      let resStr = ''
      res.forEach((el) => (resStr += el.symbol))
      return resStr
    }

    const evaluate = (
      testTargets: FilteringTarget[],
      expectedStr1: string,
      expectedStr2: string
    ) => {
      let res = candidate.convertToPhoneticEls(
        PHONETIC_ELEMENTS,
        'filter out',
        ...testTargets
      )
      let resStr = getResStr(res)
      expect(resStr).toBe(expectedStr1)

      res = candidate.convertToPhoneticEls(
        PHONETIC_ELEMENTS,
        'retain',
        ...testTargets
      )
      resStr = getResStr(res)
      expect(resStr).toBe(expectedStr2)
    }

    evaluate(testTargets, 'e', '.(t)<e1>{st2,3}.')
    testTargets.pop()
    evaluate(testTargets, '.e.', '(t)<e1>{st2,3}')
    testTargets.pop()
    evaluate(testTargets, '.<e>.', '(t)e1{st2,3}')
    testTargets.pop()
    evaluate(testTargets, '.<e>{}.', '(t)e1st2,3')
    testTargets.pop()
    evaluate(testTargets, '.<e>{st}.', '(t)e1')
    testTargets.pop()
    evaluate(testTargets, '.()<e>{st}.', 'te1')
    testTargets.pop()
    evaluate(testTargets, '.(t)<e>{st}.', 'e1')
    testTargets.pop()
    evaluate(testTargets, '.(t)<e1>{st2,3}.', 'e')
  })

  test('testIsWinner', () => {
    const candidateList = [
      new Candidate('cand1', 'not-defeated'),
      new Candidate('cand2', 'defeated'),
      new Candidate('cand3', 'defeated'),
    ]

    candidateList.forEach((cand, candI) => {
      const expected = candI === 0 ? true : false
      expect(cand.isWinner(candidateList)).toBe(expected)
    })
  })

  test('testValidate', () => {
    const evaluate = (inputVal: string, candVal: string, ch: boolean) => {
      const input = new Input(inputVal)
      const candidate = new Candidate(candVal)
      let errMsg = ''
      try {
        candidate.validate(input)
      } catch (errorMessage: any) {
        errMsg = errorMessage
      }
      if (ch) expect(errMsg).toBeTruthy()
      else expect(errMsg).toBeFalsy()
    }

    evaluate('test', 'test', false)
    evaluate('test', '(te.su.to', true)
    evaluate('test', 'te..su.to', true)
    evaluate('test', '(t)est', false)
    evaluate('test', '{t}est', true)
    evaluate('{t}est', '{t}est', false)
    evaluate('test', '(test', true)
    evaluate('test', 'test)', true)
    evaluate('test', '(test)', true)
    evaluate('{t}est', '{test', true)
    evaluate('tes{t}', 'test}', true)
    evaluate('test', '{test}', true)
    evaluate('{test}', '{test}', false)
  })
})
