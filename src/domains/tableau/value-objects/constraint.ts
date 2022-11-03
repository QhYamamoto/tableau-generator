import { CONSTRAINT_OBJS } from '../../../consts/constraints'

export class Constraint implements ConstraintInterface {
  readonly rank: number
  readonly name: string
  readonly subcategory?: FaithfulnessSubcategory | MarkednessSubcategory
  readonly targetSegment?: PhoneticElement
  readonly targetProperty?: TargetProperty
  readonly rightDash: boolean
  readonly marks: MarkInterface[]
  readonly method?: AssessmentMethod

  /**
   * @param rank Rank of constraint
   * @param marks Array of Mark instance
   * @param consName Name string of constraint (default: '')
   * @param rightDash Boolean on whether its cell's right border is dashed or not (default: false)
   */
  constructor(
    rank: number,
    marks: MarkInterface[],
    consName?: string,
    rightDash?: boolean
  ) {
    this.rank = rank
    this.marks = marks
    this.name = consName ?? ''
    this.rightDash = rightDash ?? false
    if (consName) {
      const consObj = CONSTRAINT_OBJS.find((obj) => obj.name === consName)
      this.subcategory = consObj?.subcategory
      this.targetSegment = consObj?.targetSegment
      this.targetProperty = consObj?.targetProperty
      this.method = consObj?.method
    }
  }

  get nameWithoutParentheses(): string {
    return this.name.replace(/\(|\)/g, '')
  }

  get nameFragments(): ConstraintNameFragment[] {
    if (!this.name) return []
    return Constraint.getNameFragments(this.name)
  }

  public assess(
    phoneticElsData: PhoneticElement[],
    input: InputInterface,
    candidate: CandidateInterface
  ): number {
    // Return 0 if the assessment method isn't set
    return this.method
      ? this.method(
          phoneticElsData,
          input,
          candidate,
          this.targetSegment,
          this.targetProperty
        )
      : 0
  }

  /* 
    ------------------------------ Static methods ------------------------------
   */
  /**
   * Get name array of ConstraintNameFragment object which contains information about non-smallCaps parts
   * @param consName
   * @returns Array of ConstraintNameFragment object
   */
  static getNameFragments(consName: string): ConstraintNameFragment[] {
    const resArr: ConstraintNameFragment[] = []
    let openingI = consName.indexOf('(')
    let closingI = consName.indexOf(')')
    while (openingI !== -1 && closingI !== -1) {
      const smallCapsPart = {
        str: consName.substring(0, openingI),
        smallCaps: true,
      }
      const nonSmallCapsPart = {
        str: consName.substring(openingI + 1, closingI),
        smallCaps: false,
      }
      resArr.push(smallCapsPart, nonSmallCapsPart)

      consName = consName.substring(closingI + 1)
      openingI = consName.indexOf('(')
      closingI = consName.indexOf(')')
    }

    if (consName) {
      resArr.push({
        str: consName,
        smallCaps: true,
      })
    }

    return resArr
  }
}
