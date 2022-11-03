export class WinnerIndex implements WinnerIndexInterface {
  readonly value: number | undefined

  /**
   * @param value Index of winner of the tableau
   */
  constructor(value: number | undefined) {
    this.value = value
  }
}
