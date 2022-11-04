import { Candidate } from './value-objects/candidate'
import { Constraint } from './value-objects/constraint'
import { Input } from './value-objects/input'
import { Mark } from './value-objects/mark'
import { WinnerIndex } from './value-objects/winner-index'

export class Tableau implements TableauInterface {
  public input: InputInterface
  public candidates: CandidateInterface[]
  public constraints: ConstraintInterface[]
  public winnerIndex: WinnerIndexInterface | undefined

  /**
   * @param input Input instance
   * @param candidates Array of Candidate instance
   * @param constraints Array of Constraint instance
   * @param winnerIndex WinnerIndex instance
   */
  constructor(
    input?: InputInterface,
    candidates?: CandidateInterface[],
    constraints?: ConstraintInterface[],
    winnerIndex?: WinnerIndexInterface
  ) {
    this.input = input ?? new Input()
    this.candidates = candidates ?? [new Candidate(), new Candidate()]
    this.constraints = constraints ?? [
      new Constraint(1, [new Mark(), new Mark()]),
    ]
    this.winnerIndex = winnerIndex
  }

  get rankInfo(): number[] {
    const counter = Array<number>(this.constraints.length).fill(0)
    this.constraints.forEach((cons) => (counter[cons.rank - 1] += 1))
    return counter.filter((el) => el)
  }

  public setInput(value: string): void {
    this.input = new Input(value)
  }

  public setInputCursorPos(cursorPos: number | null) {
    const value = this.input.value
    const curPos = cursorPos ?? value.length
    const errorMessage = this.input.errorMessage
    this.input = new Input(value, curPos, errorMessage)
  }

  public setInputError(errorMessage: string): void {
    const value = this.input.value
    const curPos = this.input.cursorPos
    this.input = new Input(value, curPos, errorMessage)
  }

  public setCandidate(candI: number, value: string): void {
    const status = this.candidates[candI].status
    this.candidates[candI] = new Candidate(value, status)
  }

  public setCandidateStatus(candI: number, status: CandidateStatus) {
    const value = this.candidates[candI].value
    this.candidates[candI] = new Candidate(value, status)
  }

  public setCandidateCursorPos(candI: number, cursorPos: number | null) {
    const candidate = this.candidates[candI]
    const value = candidate.value
    const status = candidate.status
    const curPos = cursorPos ?? value.length
    const errorMessage = candidate.errorMessage
    this.candidates[candI] = new Candidate(value, status, curPos, errorMessage)
  }

  public setCandidateError(candI: number, errorMessage: string) {
    const candidate = this.candidates[candI]
    const value = candidate.value
    const status = candidate.status
    const curPos = candidate.cursorPos
    this.candidates[candI] = new Candidate(value, status, curPos, errorMessage)
  }

  public setConstraint(consI: number, name: string): void {
    const rank = this.constraints[consI].rank
    const marks = this.constraints[consI].marks
    this.constraints[consI] = new Constraint(rank, marks, name)
  }

  public setConstraintRank(consI: number, rank: number): void {
    const name = this.constraints[consI].name
    const marks = this.constraints[consI].marks
    this.constraints[consI] = new Constraint(rank, marks, name)
  }

  public setMark(
    consI: number,
    candI: number,
    value: string,
    isShaded?: boolean
  ): void {
    const mark = this.constraints[consI].marks[candI]
    isShaded = isShaded ?? mark.isShaded
    this.constraints[consI].marks[candI] = new Mark(value, isShaded)
  }

  public setWinnerIndex(value: number | undefined): void {
    this.winnerIndex = new WinnerIndex(value)
  }

  public setRightDash(): void {
    let consI = 0
    this.rankInfo.forEach((numOfConsInSameRank) => {
      for (let i = 1; i <= numOfConsInSameRank; i++) {
        this.constraints[consI] = new Constraint(
          this.constraints[consI].rank,
          this.constraints[consI].marks,
          this.constraints[consI].name,
          i === numOfConsInSameRank ? false : true // False if the constraint is the last in the same rank
        )
        consI++
      }
    })
  }

  public clear(): void {
    this.input = new Input()
    this.candidates = [new Candidate(), new Candidate()]
    this.constraints = [new Constraint(1, [new Mark(), new Mark()])]
    this.winnerIndex = undefined
  }

  public addCandidate(index: number): void {
    this.candidates.splice(index, 0, new Candidate())
    // Insert markArr corresponding to new Candidate
    this.constraints.forEach((constraint) => {
      constraint.marks.splice(index, 0, new Mark())
    })
    this.setRightDash()
  }

  public removeCandidate(candI: number): void {
    this.candidates.splice(candI, 1)
    this.constraints.forEach((constraint) => {
      constraint.marks.splice(candI, 1)
    })
  }

  public addConstraint(index: number): void {
    // Insert new Constraint instance
    const preConsRank = this.constraints[index - 1].rank
    const marks = Array(this.candidates.length).fill(new Mark())
    this.constraints.splice(index, 0, new Constraint(preConsRank + 1, marks))
    // Update rank of subsequent constraints
    for (let consI = index + 1; consI < this.constraints.length; consI++) {
      this.setConstraintRank(consI, this.constraints[consI].rank + 1)
    }
    this.setRightDash()
  }

  public removeConstraint(consI: number): void {
    this.constraints.splice(consI, 1)
    this.setRightDash()
  }

  public sortConstraintsByRank(): void {
    this.constraints.sort((a, b) => a.rank - b.rank)
    this.setRightDash()
  }

  public assess(phoneticElsData: PhoneticElement[]): number[][] {
    // Sort PhoneticElsData by their symbol length
    const sortedPhoneticElsData = phoneticElsData.sort(
      (a, b) => b.symbol.length - a.symbol.length
    )

    return this.constraints.map((cons) =>
      this.candidates.map((cand) =>
        cons.assess(sortedPhoneticElsData, this.input, cand)
      )
    )
  }

  public getResultFromMarkArrs(): number[][] {
    const resArrs: number[][] = []
    this.constraints.forEach((constraint, consI) => {
      constraint.marks.forEach((mark) => {
        if (!resArrs[consI]) resArrs[consI] = []
        const violationNum = mark.value.match(/\*/g)?.length ?? 0
        resArrs[consI].push(violationNum)
      })
    })
    return resArrs
  }

  public getLatexCode(phoneticElsData: PhoneticElement[]): string {
    let code = `\\renewcommand{\\arraystretch}{1.5}\n\\setlength{\\doublerulesep}{2\\arrayrulewidth}\n`
    code += this.getFirstRowLatexCode(phoneticElsData)
    code += this.getOtherRowsLatexCode(phoneticElsData)
    code += `\\renewcommand{\\arraystretch}{1.0}`
    return code
  }

  /* 
    ------------------------------ Static methods ------------------------------
   */
  /**
   * Create Tableau instance from tableauData object
   * @param tableauData Target tableauData object
   * @returns New Tableau instance
   */
  static createFrom(tableauData: TableauData): TableauInterface {
    const input = new Input(tableauData.input.value)
    const candidates = tableauData.candidates.map(
      (cand) => new Candidate(cand.value, cand.status)
    )
    const constraints = tableauData.constraints.map(
      (cons) => new Constraint(cons.rank, cons.marks, cons.name, cons.rightDash)
    )
    const winnerIndex = new WinnerIndex(tableauData.winnerIndex?.value)

    return new Tableau(input, candidates, constraints, winnerIndex)
  }

  /* 
    ------------------------------ Private methods ------------------------------
   */
  /**
   * Get Latex code of First row
   * @param phoneticElsData Currently set PhoneticElements' data
   * @returns Latex code of First row
   */
  private getFirstRowLatexCode(phoneticElsData: PhoneticElement[]) {
    let code = '\\begin{tabular}{|rr||'
    this.constraints.forEach((cons) => (code += cons.rightDash ? 'c:' : 'c|'))
    code += this.getInputLatexCode(phoneticElsData)
    code += this.getConstraintsLatexCode()
    return (code += '\\hline \\hline\n')
  }

  /**
   * Get Latex code of rows other than the first
   * @param phoneticElsData Currently set PhoneticElements' data
   * @returns Latex code of rows other than first one
   */
  private getOtherRowsLatexCode(phoneticElsData: PhoneticElement[]) {
    let code = ''
    // Add latex code for each row
    this.candidates.forEach((cand, candI) => {
      const candPhoneticEl = cand.convertToPhoneticEls(
        phoneticElsData,
        'filter out',
        'coalescence-border',
        'deleted-segment',
        'insertion-border',
        'mutation-border'
      )
      const candTipaStr = this.getTipaStr(candPhoneticEl)

      if (candI === this.winnerIndex?.value) code += '\\ding{43} ' // Winner indication mark
      code += `& [ ${candTipaStr}`
      const containsIndex = candTipaStr.match(/_{([0-9]+,*)+}/)
      code += containsIndex ? ' ]}$' : ' ]'
      code += this.getMarkArrLatexCode(candI)
      code += `\\hline\n`
    })

    return (code += '\\end{tabular}\n')
  }

  /**
   * Get Latex code of input
   * @param phoneticElsData Currently set PhoneticElements' data
   * @returns Latex code of input
   */
  private getInputLatexCode(phoneticElsData: PhoneticElement[]) {
    const inputPhoneticEls = this.input.convertToPhoneticEls(
      phoneticElsData,
      'filter out',
      'coalescence-border'
    )
    const inputTipaStr = this.getTipaStr(inputPhoneticEls)
    let code = `}\n\\hline\n\\multicolumn{2}{|l||}{/ ${inputTipaStr}`
    const containsIndex = inputTipaStr.match(/_{([0-9]+,*)+}/)

    return (code += containsIndex ? ' /}$} ' : ' /}')
  }

  /**
   * Get Latex code of constraints
   * @returns Latex code of constraints
   */
  private getConstraintsLatexCode() {
    let code = ''
    this.constraints.forEach((cons) => {
      let consStr = ' & '
      cons.nameFragments.forEach(
        (frg) => (consStr += frg.smallCaps ? `{\\sc ${frg.str}}` : `${frg.str}`)
      )
      code += consStr
    })

    return code + ' \\\\\n'
  }

  /**
   * Get Latex code of marks of a candidate
   * @param candI Index of corresponding Candidate instance
   * @returns Latex code of marks
   */
  private getMarkArrLatexCode(candI: number) {
    let code = ''
    this.constraints.forEach((constraint) => {
      const mark = constraint.marks[candI]
      code += `& `
      if (mark.isShaded) code += '\\cellcolor[rgb]{0.9, 0.9, 0.9}'
      code += mark.value + ' '
    })

    return code + '\\\\\n'
  }

  /**
   * Get latex code with TIPA from Array of phoneticElement
   * @param phoneticEls Array of PhoneticElement to convert to string of tipa
   * @returns Latex code with TIPA
   */
  private getTipaStr(phoneticEls: PhoneticElement[]) {
    let tipaStr = '\\textipa{'
    let base = phoneticEls.map((el) => el.tipa ?? el.symbol).join('')
    let regex = /([0-9]+,*)+/g
    let firstLoop = true
    while (regex.test(base)) {
      // Prepare the parts
      const numStartI = base.search(regex)
      const numEndI = regex.lastIndex
      const connector1 = firstLoop ? '}_{' : '}}$_{'
      const connector2 = numEndI === base.length ? '' : '}$\\text{\\textipa{'

      // Add parts to tipaStr
      tipaStr += base.substring(0, numStartI)
      tipaStr += connector1
      tipaStr += base.substring(numStartI, numEndI)
      tipaStr += connector2

      // Prepare for next loop
      base = base.substring(numEndI)
      regex = /([0-9]+,*)+/g
      firstLoop = false
    }

    let ending: string
    if (firstLoop) ending = base + '}' // Candidate doesn't contains index
    else if (base)
      ending = base + '}' // Candidate contains index but ends with other letter
    else ending = '}$\\text{' // Candidate ends with index

    return tipaStr + ending
  }
}
