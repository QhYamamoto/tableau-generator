import { describe, test, expect, vi, beforeEach } from 'vitest'
import { PHONETIC_ELEMENTS } from '../../../consts/phonetic-elements'
import { Tableau } from '../../../domains/tableau/tableau'

describe('testTableau', () => {
  let tableau = new Tableau()

  beforeEach(() => {
    tableau = new Tableau()
  })

  const testValue = 'testValue'
  const testCurPos = 1
  const testErrorMsg = 'testError'
  const testMark = '*'

  test('testGetRankInfo', () => {
    tableau.addConstraint(1)
    tableau.setConstraintRank(1, 1)
    tableau.addConstraint(2)
    tableau.setConstraintRank(2, 1)
    tableau.addConstraint(3)
    tableau.addConstraint(4)
    tableau.setConstraintRank(4, 2)
    tableau.addConstraint(5)

    expect(tableau.rankInfo).toStrictEqual([3, 2, 1])
  })

  test('testInputMethods', () => {
    tableau.setInput(testValue)
    expect(tableau.input.value).toBe(testValue)

    tableau.setInputCursorPos(testCurPos)
    expect(tableau.input.cursorPos).toBe(testCurPos)

    tableau.setInputError(testErrorMsg)
    expect(tableau.input.errorMessage).toBe(testErrorMsg)
  })

  test('testCandidateMethods', () => {
    tableau.setCandidate(0, testValue)
    expect(tableau.candidates[0].value).toBe(testValue)

    let testStatus: CandidateStatus = 'not-defeated'
    tableau.setCandidateStatus(0, testStatus)
    expect(tableau.candidates[0].status).toBe(testStatus)

    testStatus = 'defeated'
    tableau.setCandidateStatus(0, testStatus)
    expect(tableau.candidates[0].status).toBe(testStatus)

    tableau.setCandidateCursorPos(0, testCurPos)
    expect(tableau.candidates[0].cursorPos).toBe(testCurPos)

    tableau.setCandidateError(0, testErrorMsg)
    expect(tableau.candidates[0].errorMessage).toBe(testErrorMsg)
  })

  test('testConstraintMethods', () => {
    tableau.setConstraint(0, testValue)
    expect(tableau.constraints[0].name).toBe(testValue)

    const testRank = 5
    tableau.setConstraintRank(0, testRank)
    expect(tableau.constraints[0].rank).toBe(testRank)

    const testRightDash = true
    tableau['setConstraintRightDash'](0, testRightDash)
    expect(tableau.constraints[0].rightDash).toBe(testRightDash)
  })

  test('testSetMark', () => {
    tableau.setMark(0, 0, testMark)
    expect(tableau.constraints[0].marks[0].value).toBe(testMark)
    expect(tableau.constraints[0].marks[0].isShaded).toBe(false)
  })

  test('testSetWinnerIndex', () => {
    tableau.setWinnerIndex(0)
    expect(tableau.winnerIndex?.value).toBe(0)
  })

  test('testSetRightDash', () => {
    tableau.addConstraint(1)
    tableau.constraints.forEach((cons, consI) => {
      tableau.setConstraintRank(consI, 1)
    })
    tableau['setRightDash']()

    tableau.constraints.forEach((cons, consI, constraints) => {
      expect(cons.rightDash).toBe(
        consI === constraints.length - 1 ? false : true
      )
    })
  })

  test('testClear', () => {
    tableau.setInput(testValue)
    tableau.setCandidate(0, testValue)
    tableau.setConstraint(0, testValue)
    tableau.setMark(0, 0, testMark)
    tableau.clear()

    expect(tableau.input.value).toBeFalsy()
    expect(tableau.candidates[0].value).toBeFalsy()
    expect(tableau.constraints[0].name).toBeFalsy()
    expect(tableau.constraints[0].marks[0].value).toBeFalsy()
  })

  test('testAddingAndRemoving', () => {
    tableau.addCandidate(2)
    expect(tableau.candidates.length).toBe(3)
    tableau.removeCandidate(2)
    expect(tableau.candidates.length).toBe(2)

    tableau.addConstraint(1)
    expect(tableau.constraints.length).toBe(2)
    tableau.removeConstraint(1)
    expect(tableau.constraints.length).toBe(1)
  })

  test('testSortConstraint', () => {
    tableau.addConstraint(1)
    tableau.setConstraintRank(0, 2)
    tableau.setConstraintRank(1, 1)
    tableau.sortConstraintsByRank()
    expect(tableau.constraints[0].rank).toBe(1)
    expect(tableau.constraints[1].rank).toBe(2)
  })

  test('testAssess', () => {
    vi.spyOn(tableau.constraints[0], 'assess').mockReturnValue(1)
    const resultArrs = tableau.assess(PHONETIC_ELEMENTS)
    resultArrs.forEach((resultArr) =>
      resultArr.forEach((res) => {
        expect(res).toBe(1)
      })
    )
  })

  test('testGetResultFromMarkArrs', () => {
    tableau.setMark(0, 0, testMark)
    tableau.setMark(0, 1, testMark)
    const resultArrs = tableau.getResultFromMarkArrs()
    resultArrs.forEach((resultArr) =>
      resultArr.forEach((res) => {
        expect(res).toBe(1)
      })
    )
  })
})

// createFrom(tableauData: TableauData): Tableau
// getLatexCode(phoneticElsData: PhoneticElement[]) {
// getTipaStr(tipaArr: string[]): string
