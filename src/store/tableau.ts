import { computed, Ref, ref } from 'vue'
import { Repository } from '../repository'
import { Tableau } from '../domains/tableau/tableau'

export default function useTableauStore(repository?: RepositoryInterface) {
  const $repository = repository ?? new Repository()

  // Load tableau data from local storage
  const automaticModeTableauDataArr = $repository.getTableauDataArr('automatic')
  const loadedAutomaticModeTableauArr = automaticModeTableauDataArr.map(
    (tableauData) => Tableau.createFrom(tableauData)
  )
  const manualModeTableauDataArr = $repository.getTableauDataArr('manual')
  const loadedManualModeTableauArr = manualModeTableauDataArr.map(
    (tableauData) => Tableau.createFrom(tableauData)
  )

  // Set automatic tableau data if exist
  const automaticModeTabLen = loadedAutomaticModeTableauArr.length
  const automaticModeTableauArr: Ref<TableauInterface[]> = ref(
    automaticModeTabLen ? loadedAutomaticModeTableauArr : [new Tableau()]
  )
  if (!automaticModeTabLen) {
    $repository.storeTableau(0, automaticModeTableauArr.value[0], 'automatic')
  }

  // Set manual tableau data if exist
  const manualModeTabLen = loadedManualModeTableauArr.length
  const manualModeTableauArr: Ref<TableauInterface[]> = ref(
    manualModeTabLen ? loadedManualModeTableauArr : [new Tableau()]
  )
  if (!manualModeTabLen) {
    $repository.storeTableau(0, manualModeTableauArr.value[0], 'manual')
  }

  /* states */
  /**
   * Evaluation mode: 'manual'(default) or 'automatic'
   */
  const $evalMode: Ref<EvalMode> = ref('manual')

  /**
   * Array of tableau instance for current evaluation mode
   */
  const $tableauArr = computed(() =>
    $evalMode.value === 'manual'
      ? manualModeTableauArr.value
      : automaticModeTableauArr.value
  )
  const $selectedTabI = ref(0)
  const $copiedTableauData: Ref<TableauData> = ref(new Tableau())

  /* actions */
  /**
   * Store tableau data to storage
   * @param tabI Target tableau index
   */
  const $storeTableau = (tabI: number) => {
    try {
      $repository.storeTableau(tabI, $tableauArr.value[tabI], $evalMode.value)
    } catch (error) {
      throw alert('Error occurred while storing Tableau')
    }
  }

  /**
   * Restore previous state of tableau being edited
   * @param tabI Target tableau index
   */
  const $restoreTableau = (tabI: number) => {
    try {
      const tableauData = $repository.getTableauDataArr($evalMode.value)[tabI]
      const restoredTableau = Tableau.createFrom(tableauData)
      $tableauArr.value[tabI] = restoredTableau
    } catch (error) {
      throw alert('Error occurred while restoring Tableau')
    }
  }

  /**
   * Destroy tableau data
   * @param tabI Target tableau index
   */
  const $destroyTableau = (tabI: number) => {
    try {
      $repository.destroyTableau(tabI, $evalMode.value)
    } catch (error) {
      throw alert('Error occurred while deleting tableau')
    }
  }

  /**
   * Set index of tableau selected for editing
   * @param tabI Target tableau index
   */
  const $setSelectedTableauI = (tabI: number) => ($selectedTabI.value = tabI)

  /**
   * Set evaluation mode
   * @param evalMode Evaluation mode to set
   */
  const $setMode = (evalMode: EvalMode) => {
    $selectedTabI.value = 0
    $evalMode.value = evalMode
  }

  /**
   * Add new tableau instance of current evaluation mode
   */
  const $addTableau = () => {
    $tableauArr.value.push(new Tableau())
    $storeTableau($tableauArr.value.length - 1)
  }

  /**
   * Copy target tableau data
   * @param tabI Target tableau index
   */
  const $copyTableau = (tabI: number) => {
    $copiedTableauData.value = { ...$tableauArr.value[tabI] }
  }

  /**
   * Paste copied tableau data to target tableau
   * @param tabI Target tableau index
   */
  const $pasteTableau = (tabI: number) => {
    $tableauArr.value[tabI] = Tableau.createFrom($copiedTableauData.value)
    $storeTableau(tabI)
  }

  /**
   * Clear target tableau data
   * @param tabI Target tableau index
   */
  const $clearTableau = (tabI: number) => {
    $tableauArr.value[tabI].clear()
    $storeTableau(tabI)
  }

  /**
   * Remove target tableau from array of tableau instances of current evaluation mode
   * @param tabI Target tableau index
   */
  const $removeTableau = (tabI: number) => {
    if (tabI === $selectedTabI.value) {
      $selectedTabI.value = 0
    }
    $tableauArr.value.splice(tabI, 1)
    $destroyTableau(tabI)
  }

  /**
   * Reflect assessment result on Tableau
   * @param tabI Target tableau index
   * @param resultArrs Array of assessment result array
   */
  const $reflectResult = (tabI: number, resultArrs: number[][]): void => {
    const tableau = $tableauArr.value[tabI]
    const candidates = tableau.candidates
    candidates.forEach((_, candI) =>
      tableau.setCandidateStatus(candI, 'not-defeated')
    ) // Reset status

    let consI = 0
    // Make judgement for each rank
    tableau.rankInfo.forEach((numOfConstraints, rankI, rankInfo) => {
      const candsData = [...candidates] // Retain current candidates' state
      const firstConsI =
        rankI === 0 ? 0 : rankInfo.slice(0, rankI).reduce((a, b) => a + b, 0) // Index of first constraint in current rank
      const curRankResultArrs = resultArrs.slice(
        firstConsI,
        firstConsI + numOfConstraints
      ) // result arrays of the current rank

      for (let consNum = 0; consNum < numOfConstraints; consNum++) {
        // consNum := 0 based constraint number in same rank ones
        candidates.forEach((cand, candI) => {
          const isWinner = cand.isWinner(candsData) // True if the candidate's definitely won in judgement of higher rank constraints
          const isDefeated = candsData[candI].isDefeated // True if the candidate's been definitely defeated in judgement of higher rank constraints
          const minViolationNum = getMinViolationNum(
            resultArrs[consI],
            candsData
          )
          const canSurvive = _canSurvive(
            curRankResultArrs,
            consNum,
            candI,
            candsData
          ) // True if the candidate can survive after determining more detailed ranking

          const violationNum = resultArrs[consI][candI] // Number of violations of the candidate against current constraint
          let mark: string
          if (isWinner || isDefeated || canSurvive) {
            mark = '*'.repeat(violationNum)
          } else {
            mark = getSplittedMark(violationNum, minViolationNum)
            tableau.setCandidateStatus(candI, 'defeated')
          }

          const isShaded = isDefeated ?? isWinner ?? false
          tableau.setMark(consI, candI, mark, isShaded)
        })
        consI++
      }
    })
    setWinnerIndex(tableau)
  }

  return {
    /* states */
    $evalMode,
    $tableauArr,
    $selectedTabI,
    /* actions */
    $storeTableau,
    $restoreTableau,
    $destroyTableau,
    $setSelectedTableauI,
    $setMode,
    $addTableau,
    $copyTableau,
    $pasteTableau,
    $clearTableau,
    $removeTableau,
    $reflectResult,
  }
}

export type TableauStore = ReturnType<typeof useTableauStore>

/* -------------------- Functions which aren't necessary to be provided -------------------- */
/**
 * Get minimum number of violations in a column
 * @param resultArr Column size result array
 * @param candidates Candidates of the Tableau
 * @returns Minimum number of violations in the column
 */
const getMinViolationNum = (
  resultArr: number[],
  candidates: CandidateInterface[]
): number => {
  const survivorsResultArr = resultArr.filter(
    (result, candI) => candidates[candI].status !== 'defeated'
  )
  return Math.min(...survivorsResultArr)
}

/**
 * Get string of violation marks splitted by '!'
 * @param violationNum Number of violations of target candidate
 * @param minViolationNum Minimum number of violations in the column
 * @returns Violation marks splitted by '!'
 */
const getSplittedMark = (
  violationNum: number,
  minViolationNum: number
): string => {
  const leftSideNum = minViolationNum + 1
  const leftSide = '*'.repeat(leftSideNum)
  const rightSide = '*'.repeat(violationNum - leftSideNum)
  return `${leftSide}!${rightSide}`
}

/**
 * Check if the candidate can survive after determining more detailed ranking
 * @param curRankResultArrs Result arrays of current rank
 * @param consNum 0 based constraint Number in the same rank ones
 * @param curCandI Current candidate index
 * @param candsData Data of current candidates' state
 * @returns boolean
 */
const _canSurvive = (
  curRankResultArrs: number[][],
  consNum: number,
  curCandI: number,
  candsData: CandidateInterface[]
): boolean => {
  const curConsViolationNums = curRankResultArrs[consNum]
  const curCandViolationNum = curConsViolationNums[curCandI]
  const curConsMinViolationNum = getMinViolationNum(
    curConsViolationNums,
    candsData
  )
  // Return true if current candidate's violationNum is current constraint's minViolationNum
  if (curConsMinViolationNum === curCandViolationNum) return true

  const resultArrsForCheck = getResultArrsForCheck(
    curRankResultArrs,
    consNum,
    curCandI,
    candsData
  )

  for (let i = 0; i < resultArrsForCheck.length; i++) {
    if (i === consNum) continue // Skip current constraint
    const violationNums = resultArrsForCheck[i]
    const minViolationNum = Math.min(...violationNums)

    // return true if current candidate is only one with minViolationNum
    if (
      curRankResultArrs[i][curCandI] === minViolationNum &&
      violationNums.filter((num) => num === minViolationNum).length === 1
    ) {
      return true
    } else continue
  }
  return false
}

/**
 * Get result arrays for check if current candidate can survive
 * @param curRankResultArrs
 * @param consNum
 * @param curCandI
 * @param candsData
 * @returns Arrays of violation numbers of current candidate and candidates that have less violations
 */
const getResultArrsForCheck = (
  curRankResultArrs: number[][],
  consNum: number,
  curCandI: number,
  candsData: CandidateInterface[]
) => {
  const curConsViolationNums = curRankResultArrs[consNum]

  // Get indices of current candidate and candidates which have less violations in respect of current constraint
  const comparisonTargetIndices = curConsViolationNums.flatMap(
    (violationNum, candI) => {
      if (
        (violationNum < curConsViolationNums[curCandI] &&
          candsData[candI].status === 'not-defeated') ||
        candI === curCandI
      ) {
        return candI
      } else return []
    }
  )

  // return result arrays of only comparison target candidates
  return curRankResultArrs.map((violationNums) => {
    const resArr: number[] = []
    comparisonTargetIndices.forEach((targetI) =>
      resArr.push(violationNums[targetI])
    )
    return resArr
  })
}

/**
 * Set winner index to the Tableau if exists
 * @param tableau Target Tableau
 */
const setWinnerIndex = (tableau: TableauInterface) => {
  const survivorIndices: number[] = []
  tableau.candidates.forEach((cand, candI) => {
    if (cand.status === 'not-defeated') survivorIndices.push(candI)
  })
  survivorIndices.length === 1
    ? tableau.setWinnerIndex(survivorIndices[0])
    : tableau.setWinnerIndex(undefined)
}
