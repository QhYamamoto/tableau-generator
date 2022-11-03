interface ConstraintObj {
  name: string
  description?: string
  reference?: string
  targetSegment?: PhoneticElement
  targetProperty?: TargetProperty
  method: AssessmentMethod
}

const faithfulnessConstraintSubcategory = [
  'Max',
  'Dep',
  'Ident',
  'Other Faithfulness Constraints',
] as const

const markednessConstraintSubcategory = [
  'Structural Markedness',
  'Featural Markedness (Positive)',
  'Featural Markedness (Negative)',
  'Segmental Markedness (Vowels)',
  'Segmental Markedness (Long Vowels)',
  'Segmental Markedness (Unsyllabic Vowels)',
  'Segmental Markedness (Labial Consonants)',
  'Segmental Markedness (Coronal Consonants)',
  'Segmental Markedness (Dorsal Consonants)',
  'Segmental Markedness (Other Consonants)',
] as const

type FaithfulnessSubcategory = typeof faithfulnessConstraintSubcategory[number]
type MarkednessSubcategory = typeof markednessConstraintSubcategory[number]

interface FaithfulnessConstraintObj extends ConstraintObj {
  subcategory: FaithfulnessSubcategory
}

interface MarkednessConstraintObj extends ConstraintObj {
  subcategory: MarkednessSubcategory
}

type FaithfulnessConstraintList = {
  [keys in FaithfulnessSubcategory]: FaithfulnessConstraintObj[]
}

type MarkednessConstraintList = {
  [keys in MarkednessSubcategory]: MarkednessConstraintObj[]
}
