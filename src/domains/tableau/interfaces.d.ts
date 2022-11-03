interface TableauInterface {
  input: InputInterface
  candidates: CandidateInterface[]
  constraints: ConstraintInterface[]
  // markArrs: MarkInterface[][] // Mark[candI][consI]
  winnerIndex: WinnerIndexInterface | undefined

  /**
   * Array of integers whose length corresponds to number of ranks and
   * whose values correspond to the number of constraints which belong to each rank.
   */
  rankInfo: number[]

  /**
   * Set Input value
   * @param value
   */
  setInput(value: string): void

  /**
   * Set cursor position to edit input value
   * @param cursorPos Cursor position to edit input value
   */
  setInputCursorPos(cursorPos: number | null)

  /**
   * Set error message to Input instance
   * @param errorMessage Error message to set
   */
  setInputError(errorMessage: string): void

  /**
   * Set candidate value
   * @param candI Target candidate index
   * @param value Value string to set
   */
  setCandidate(candI: number, value: string): void

  /**
   * Set candidate status
   * @param candI Target candidate index
   * @param status Status to set
   */
  setCandidateStatus(candI: number, status: CandidateStatus)

  /**
   * Set cursor position to edit candidate value
   * @param candI Target candidate index
   * @param cursorPos Cursor position to set
   */
  setCandidateCursorPos(candI: number, cursorPos: number | null)

  /**
   * Set error message to Candidate instance
   * @param candI Target candidate index
   * @param errorMessage Error message to set
   */
  setCandidateError(candI: number, errorMessage: string)

  /**
   * Set constraint name
   * @param consI Target constraint index
   * @param name Name string to set
   */
  setConstraint(consI: number, name: string): void

  /**
   * Set constraint rank
   * @param consI Target constraint index
   * @param rank Rank to set
   */
  setConstraintRank(consI: number, rank: number): void

  /**
   * Set value of Mark instance
   * @param consI Index of constraint the mark corresponds to
   * @param candI Index of candidate the mark corresponds to
   * @param value Value to set
   * @param isShaded Boolean on whether its background color is shaded or not (default: false)
   */
  setMark(consI: number, candI: number, value: string, isShaded?: boolean): void

  /**
   * Set index of winner candidate of the tableau
   * @param value Index of the winner
   */
  setWinnerIndex(value: number | undefined): void

  /**
   * Set rightDash property of Constraint instances of the tableau
   */
  setRightDash(): void

  /**
   * Clear all data of the tableau
   */
  clear(): void

  /**
   * Add new Candidate instance to the tableau
   * @param index Index where to insert new instance
   */
  addCandidate(index: number): void

  /**
   * Remove Candidate instance from the tableau
   * @param candI Target candidate index
   */
  removeCandidate(candI: number): void

  /**
   * Add new Constraint instance to the tableau
   * @param index Index where to insert new instance
   */
  addConstraint(index: number): void

  /**
   * Remove Constraint instance from the tableau
   * @param consI Target constraint index
   */
  removeConstraint(consI: number): void

  /**
   * Sort Constraint instances by their rank
   */
  sortConstraintsByRank(): void

  /**
   * Assess each candidate in respect of each constraint
   * @param phoneticElsData
   * @returns Two-dimensional array of integer (= number[consI][candI])
   * which contains violation numbers of each candidate in respect of each constraint
   */
  assess(phoneticElsData: PhoneticElement[]): number[][]

  /**
   * @returns Two-dimensional array of integer (= number[consI][candI])
   * of pseudo-assessment result from value of Mark instances
   */
  getResultFromMarkArrs(): number[][]

  /**
   * Get latex code of the tableau
   * @param phoneticElsData Currently set PhoneticElements' data
   * @returns Latex code of the tableau
   */
  getLatexCode(phoneticElsData: PhoneticElement[]): string
}

interface InputInterface {
  readonly value: string
  readonly cursorPos: number
  readonly errorMessage: string
  /**
   * String of the input's value without utility symbols
   */
  formattedValue: string

  /**
   * Array of ValueFragment object which contains information about subscription
   */
  valueFragments: ValueFragment[]

  /**
   * Array of morphemes without utility symbols
   */
  morphemes: string[]

  /**
   * Convert input value string to array of PhoneticElement object
   * @param phoneticElsData Currently set phonetic elements' data
   * @param filteringFlg if true, filter out filteringTargets, else if false, retain filteringTargets, else if undefined, no filter effect
   * @param filteringTargets Elements which has to be filtered out or retained or retained
   * @returns Array of PhoneticElement object
   */
  convertToPhoneticEls(
    phoneticElsData: PhoneticElement[],
    filteringFlg?: 'filter out' | 'retain',
    ...filteringTargets: InputFilteringTarget[]
  ): PhoneticElement[]

  /**
   * Validate input value string
   */
  validate(): void
}

interface CandidateInterface {
  readonly value: string
  readonly status: CandidateStatus
  readonly cursorPos: number
  readonly errorMessage: string

  /**
   * String of the candidate's value without utility symbols
   */
  formattedValue: string

  /**
   * Array of ValueFragment object which contains information about subscription
   */
  valueFragments: ValueFragment[]

  /**
   * Array of morpheme without utility symbols
   */
  morphemes: string[]

  /**
   * Array of syllable without utility symbols
   */
  syllables: string[]

  /**
   * Boolean on whether the candidate has been defeated or not
   * */
  isDefeated: boolean

  /**
   * Convert candidate value string to array of PhoneticElement object
   * @param phoneticElsData Currently set phonetic elements' data
   * @param filteringFlg if true, filter out filteringTargets, else if false, retain filteringTargets, else if undefined, no filter effect
   * @param filteringTargets Elements which has to be filtered out or retained
   * @returns Array of PhoneticElement object
   */
  convertToPhoneticEls(
    phoneticElsData: PhoneticElement[],
    filteringFlg?: 'filter out' | 'retain',
    ...filteringTargets: FilteringTarget[]
  ): PhoneticElement[]

  /**
   * Convert each syllable of the candidate to Array of PhoneticElement object (All utility symbols will be filtered out)
   * @param phoneticElsData Currently set phonetic elements' data
   * @returns Array of each syllable's array of PhoneticElement object
   */
  convertEachSyllableToPhoneticEls(
    phoneticElsData: PhoneticElement[]
  ): PhoneticElement[][]

  /**
   * Boolean on whether the candidate is only winner in given list of candidates
   * @param candidateList
   * @returns True if the candidate is only winner in given list of candidates
   */
  isWinner(candidateList: CandidateInterface[]): boolean

  /**
   * Validate input candidate value string
   * @param input Input instance of the tableau the candidate belongs to
   */
  validate(input: InputInterface): void
}

interface ConstraintInterface {
  readonly rank: number
  readonly name: string
  readonly subcategory?: FaithfulnessSubcategory | MarkednessSubcategory
  readonly targetSegment?: PhoneticElement
  readonly targetProperty?: TargetProperty
  readonly rightDash: boolean
  readonly marks: MarkInterface[]
  readonly method?: AssessmentMethod

  /**
   * Name string without parentheses that indicate non-smallCaps parts
   */
  nameWithoutParentheses: string

  /**
   * Array of ConstraintNameFragment object which contains information about non-smallCaps parts
   */
  nameFragments: ConstraintNameFragment[]

  /**
   * Assess candidate with the constraint's assessment method
   * @param phoneticElsData Currently set phonetic elements' data
   * @param input Target input instance
   * @param candidate Target candidate instance
   * @returns Number of violation the candidate commits
   */
  public assess(
    phoneticElsData: PhoneticElement[],
    input: InputInterface,
    candidate: CandidateInterface
  ): number
}

interface MarkInterface {
  readonly value: string
  readonly isShaded: boolean
}

interface WinnerIndexInterface {
  readonly value: number | undefined
}
