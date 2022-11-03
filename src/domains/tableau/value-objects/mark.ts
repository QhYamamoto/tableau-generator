export class Mark implements MarkInterface {
  readonly value: string
  readonly isShaded: boolean

  /**
   * @param value Mark value string
   * @param isShaded Boolean whether it's cells background color is shaded or not (default: false)
   */
  constructor(value?: string, isShaded?: boolean) {
    this.value = value ?? ''
    this.isShaded = isShaded ?? false
  }
}
