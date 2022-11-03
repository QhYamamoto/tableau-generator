type AssessmentMethod = (
  phoneticElsData: PhoneticElement[],
  input: InputInterface,
  candidate: CandidateInterface,
  targetSegment?: PhoneticElement,
  targetProperty?: TargetProperty
) => number
