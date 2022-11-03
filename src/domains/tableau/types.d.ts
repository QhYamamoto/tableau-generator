type ValueFragment = {
  /**
   * A part of Input's or Candidate's value
   */
  str: string
  /**
   * Boolean on whether it must be displayed with subscript
   */
  sub: boolean
}

type ConstraintNameFragment = {
  /**
   * A part of Constraint's name
   */
  str: string
  /**
   * Boolean on whether it must be displayed with small capitals
   */
  smallCaps: boolean
}

type InputFilteringTarget = Extract<
  FilteringTarget,
  'index' | 'coalescence-border' | 'coalescence-content'
>

type CandidateStatus = 'defeated' | 'not-defeated'
