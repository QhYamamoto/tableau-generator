import { FAITHFULNESS_CONSTRAINTS } from './faithfulness'
import { MARKEDNESS_CONSTRAINTS } from './markedness'

/**
 * Array of all types of constraint object, which contains property of 'name', 'subcategory', 'description', 'reference' and 'method'.
 */
export const CONSTRAINT_OBJS = [
  ...FAITHFULNESS_CONSTRAINTS,
  ...MARKEDNESS_CONSTRAINTS,
]

/**
 * Arrays of faithfulness constraint with subcategory key (like 'Max', 'Dep', etc.)
 */
export const CATEGORIZED_FAITHFULNESS_CONSTRAINTS: FaithfulnessConstraintList =
  {
    Max: [],
    Dep: [],
    Ident: [],
    'Other Faithfulness Constraints': [],
  }

FAITHFULNESS_CONSTRAINTS.forEach((cons) => {
  CATEGORIZED_FAITHFULNESS_CONSTRAINTS[cons.subcategory].push(cons)
})

/**
 * Arrays of markedness constraint with subcategory key (like 'Structural Markedness', 'Featural Markedness', etc.)
 */
export const CATEGORIZED_MARKEDNESS_CONSTRAINTS: MarkednessConstraintList = {
  'Structural Markedness': [],
  'Featural Markedness (Positive)': [],
  'Featural Markedness (Negative)': [],
  'Segmental Markedness (Vowels)': [],
  'Segmental Markedness (Long Vowels)': [],
  'Segmental Markedness (Unsyllabic Vowels)': [],
  'Segmental Markedness (Labial Consonants)': [],
  'Segmental Markedness (Coronal Consonants)': [],
  'Segmental Markedness (Dorsal Consonants)': [],
  'Segmental Markedness (Other Consonants)': [],
}

MARKEDNESS_CONSTRAINTS.forEach((cons) => {
  CATEGORIZED_MARKEDNESS_CONSTRAINTS[cons.subcategory].push(cons)
})
