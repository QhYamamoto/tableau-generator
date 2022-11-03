import { INPUT_VALID_SYMBOLS } from '../../../consts/phonetic-elements'
import { $getEscapedStrForRegExp } from '../../../utils'
import {
  toPhoneticElement,
  getValueFragments,
  filterOut,
  checkBracketUse,
} from './utils'

export class Input implements InputInterface {
  readonly value: string
  readonly cursorPos: number
  readonly errorMessage: string

  /**
   * @param value Value string (default: '')
   * @param cursorPos Cursor position for edit value string (default: this.value.length)
   * @param errorMessage Error message
   */
  constructor(value?: string, cursorPos?: number, errorMessage?: string) {
    this.value = value ?? ''
    this.cursorPos = cursorPos ?? this.value.length
    this.errorMessage = errorMessage ?? ''
  }

  get formattedValue(): string {
    return this.value.replace(/\{|\}/g, '')
  }

  get valueFragments(): ValueFragment[] {
    if (!this.value) return []
    return getValueFragments(this.formattedValue)
  }

  get morphemes(): string[] {
    return this.value.replace(/\{|\}|[0-9]/g, '').split('-')
  }

  public convertToPhoneticEls(
    phoneticElsData: PhoneticElement[],
    filteringFlg?: 'filter out' | 'retain',
    ...filteringTargets: InputFilteringTarget[]
  ): PhoneticElement[] {
    const value = !filteringFlg
      ? this.value
      : filterOut(this.value, filteringFlg, ...filteringTargets)
    return toPhoneticElement(value, phoneticElsData)
  }

  public validate() {
    checkBracketUse(this.value, ['{', '}'])

    for (let i = 0; i < 10; i++) {
      INPUT_VALID_SYMBOLS.push(i.toString())
    }
    const regExp = new RegExp(
      $getEscapedStrForRegExp(INPUT_VALID_SYMBOLS.join('|')),
      'g'
    )

    if (this.value.replace(regExp, '')) throw new Error('Invalid character')
  }
}
