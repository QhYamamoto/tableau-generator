import { MarkednessConstraintMethod as Method } from '../../../domains/assessment-methods/markedness'
import { PHONETIC_ELEMENTS } from '../../phonetic-elements'
import { DISTINCTIVE_FEATURES } from '../../phonetic-elements/utils'

const getSegmentalMarkednessConstraints = (): MarkednessConstraintObj[] => {
  const segmentalElements = PHONETIC_ELEMENTS.filter(
    (el) => el.type === 'segment'
  )
  return segmentalElements.map<MarkednessConstraintObj>((el) => {
    const subCat = getMarkednessSubcategory(el.category)
    return {
      name: `*(${el.symbol})`,
      subcategory: subCat,
      targetSegment: el,
      method: Method.assessSegmentalMarkedness,
    }
  })
}

const getMarkednessSubcategory = (
  segmentCategory: PhoneticElement['category']
): MarkednessSubcategory => {
  if (segmentCategory === 'vowel') return 'Segmental Markedness (Vowels)'
  else if (segmentCategory === 'long-vowel')
    return 'Segmental Markedness (Long Vowels)'
  else if (segmentCategory === 'unsyllabic-vowel')
    return 'Segmental Markedness (Unsyllabic Vowels)'
  else if (segmentCategory === 'labial')
    return 'Segmental Markedness (Labial Consonants)'
  else if (segmentCategory === 'coronal')
    return 'Segmental Markedness (Coronal Consonants)'
  else if (segmentCategory === 'dorsal')
    return 'Segmental Markedness (Dorsal Consonants)'
  else return 'Segmental Markedness (Other Consonants)'
}

const getFeaturalMarkednessConstraints = (): MarkednessConstraintObj[] => {
  return DISTINCTIVE_FEATURES.flatMap<MarkednessConstraintObj>((feature) => {
    const positive: MarkednessConstraintObj = {
      name: `*[(+${feature})]`,
      subcategory: 'Featural Markedness (Positive)',
      targetProperty: feature,
      method: Method.assessPositiveFeaturalMarkedness,
    }

    const negative: MarkednessConstraintObj = {
      name: `*[(-${feature})]`,
      subcategory: 'Featural Markedness (Negative)',
      targetProperty: feature,
      method: Method.assessNegativeFeaturalMarkedness,
    }

    return [positive, negative]
  })
}

export const MARKEDNESS_CONSTRAINTS: MarkednessConstraintObj[] = [
  {
    name: 'Ons',
    subcategory: 'Structural Markedness',
    description: 'Syllables must have onsets',
    reference: 'Kager (2004[1999]:93)',
    method: Method.assessOns,
  },
  {
    name: '*Coda',
    subcategory: 'Structural Markedness',
    description: 'Syllables must be open',
    reference: 'Kager (2004[1999]:94)',
    method: Method.assessCoda,
  },
  {
    name: '*Complex',
    subcategory: 'Structural Markedness',
    description: 'Onsets and codas must be simple',
    reference: 'Kager (2004[1999]:97)',
    method: Method.assessComplexity,
  },
  {
    name: 'Align-L',
    subcategory: 'Structural Markedness',
    description:
      'The left edge of the Grammatical Word coincides with the left edge of the PrWd',
    reference: 'Kager (2004[1999]:111)',
    method: Method.assessAlignL,
  },
  {
    name: 'Align-R',
    subcategory: 'Structural Markedness',
    description:
      'The right edge of a Grammatical Word coincides with the right edge of a PrWd',
    reference: 'Kager (2004[1999]:113)',
    method: Method.assessAlignR,
  },
  {
    name: 'Son-Seq', // Sonority Sequence Principle
    subcategory: 'Structural Markedness',
    description:
      'Complex onsets rise in sonority, and complex codas fall in sonority',
    reference: 'Kager (2004[1999]:267)',
    method: Method.assessSSP,
  },
  {
    name: 'NoDiph', // No Diphthong
    subcategory: 'Structural Markedness',
    description: 'A syllable cannot contain two moraic vowels',
    reference: 'Rosenthall (1994:17)',
    method: Method.assessNoDiph,
  },
  ...getSegmentalMarkednessConstraints(),
  ...getFeaturalMarkednessConstraints(),
]
