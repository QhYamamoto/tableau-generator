import {
  toPhoneticElement,
  getValueFragments,
  filterOut,
  checkBracketUse,
} from './utils'
import { ALL_SYMBOLS } from '../../../consts/phonetic-elements/index'
import { $getEscapedStrForRegExp } from '../../../utils'

export class Candidate implements CandidateInterface {
  readonly value: string
  readonly status: CandidateStatus
  readonly cursorPos: number
  readonly errorMessage: string

  /**
   * @param value Value string of the candidate (default: '')
   * @param status Status of the candidate (default: 'not-defeated')
   * @param cursorPos Cursor position for edit value string (default: this.value.length)
   * @param errorMessage Error message (default: '')
   */
  constructor(
    value?: string,
    status?: CandidateStatus,
    cursorPos?: number,
    errorMessage?: string
  ) {
    this.value = value ?? ''
    this.status = status ?? 'not-defeated'
    this.cursorPos = cursorPos ?? this.value.length
    this.errorMessage = errorMessage ?? ''
  }

  get formattedValue(): string {
    return filterOut(
      this.value,
      'filter out',
      'deleted-segment',
      'insertion-border',
      'mutation-border',
      'coalescence-border'
    )
  }

  get valueFragments(): ValueFragment[] {
    if (!this.value) return []
    return getValueFragments(this.formattedValue)
  }

  get morphemes(): string[] {
    return filterOut(
      this.value,
      'retain',
      'insertion-content',
      'coalescence-content',
      'morpheme-border'
    ).split('-')
  }

  get syllables(): string[] {
    return filterOut(
      this.value,
      'retain',
      'insertion-content',
      'coalescence-content',
      'syllable-border'
    ).split('.')
  }

  get isDefeated(): boolean {
    return this.status === 'defeated'
  }

  public convertToPhoneticEls(
    phoneticElsData: PhoneticElement[],
    filteringFlg?: 'filter out' | 'retain',
    ...filteringTargets: FilteringTarget[]
  ): PhoneticElement[] {
    const value = !filteringFlg
      ? this.value
      : filterOut(this.value, filteringFlg, ...filteringTargets)
    return toPhoneticElement(value, phoneticElsData)
  }

  public convertEachSyllableToPhoneticEls(
    phoneticElsData: PhoneticElement[]
  ): PhoneticElement[][] {
    return this.syllables.map((syllable) =>
      toPhoneticElement(syllable, phoneticElsData)
    )
  }

  public isWinner(candidateList: CandidateInterface[]) {
    const survivors = candidateList.filter(
      (cand) => cand.status === 'not-defeated'
    )
    return survivors.length === 1 && this.value === survivors[0].value
  }

  public validate(input: InputInterface) {
    const bracketPairs: [string, string][] = [
      ['(', ')'],
      ['<', '>'],
      ['{', '}'],
    ]

    try {
      bracketPairs.forEach((bracketPair) =>
        checkBracketUse(this.value, bracketPair)
      )
    } catch (errorMessage: any) {
      throw new Error(errorMessage)
    }

    const inputCoalescenceNum = input.value.split('{').length - 1
    const candCoalescenceNum = this.value.split('{').length - 1
    if (inputCoalescenceNum !== candCoalescenceNum)
      throw new Error("Candidate must contain same number of '{}'")

    if (this.value.includes('..'))
      throw new Error('Invalid sequence of syllable border')

    const regExp = new RegExp(
      $getEscapedStrForRegExp(ALL_SYMBOLS.join('|')),
      'g'
    )
    if (this.value.replace(regExp, '')) throw new Error('Invalid character')
  }
}
