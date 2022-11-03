import { FaithfulnessConstraintMethod as Method } from '../../../domains/assessment-methods/faithfulness'
import { DISTINCTIVE_FEATURES } from '../../phonetic-elements/utils'

export const FAITHFULNESS_CONSTRAINTS: FaithfulnessConstraintObj[] = [
  {
    name: 'Max',
    subcategory: 'Max',
    description:
      "Input segments must have output correspondents.\n('No deletion')",
    reference: 'Kager (2004[1999]:67)',
    method: Method.assessMax,
  },
  {
    name: 'Max-V',
    subcategory: 'Max',
    targetProperty: 'voc',
    method: Method.assessMax,
  },

  {
    name: 'Max-C',
    subcategory: 'Max',
    targetProperty: 'cons',
    method: Method.assessMax,
  },
  {
    name: 'Max-Liq',
    subcategory: 'Max',
    targetProperty: 'liq',
    method: Method.assessMax,
  },
  {
    name: 'Max-Nas',
    subcategory: 'Max',
    targetProperty: 'nas',
    method: Method.assessMax,
  },
  {
    name: 'Max-Obs',
    subcategory: 'Max',
    targetProperty: 'obs',
    method: Method.assessMax,
  },
  {
    name: 'Dep',
    subcategory: 'Dep',
    description:
      "Output segments must have input correspondents.\n('No epenthesis')",
    reference: 'Kager (2004[1999]:68)',
    method: Method.assessDep,
  },
  {
    name: 'Dep-V',
    subcategory: 'Dep',
    targetProperty: 'voc',
    method: Method.assessDep,
  },
  {
    name: 'Dep-C',
    subcategory: 'Dep',
    targetProperty: 'cons',
    method: Method.assessDep,
  },
  {
    name: 'Dep-Liq',
    subcategory: 'Dep',
    targetProperty: 'liq',
    method: Method.assessDep,
  },
  {
    name: 'Dep-Nas',
    subcategory: 'Dep',
    targetProperty: 'nas',
    method: Method.assessDep,
  },
  {
    name: 'Dep-Obs',
    subcategory: 'Dep',
    targetProperty: 'obs',
    method: Method.assessDep,
  },

  {
    name: 'Ident',
    subcategory: 'Ident',
    description:
      "Correspondent obstruents are identical in their specification for voice.\n('No changes in the voicing of obstruents')",
    reference: 'Kager (2004[1999]:70)',
    method: Method.assessIdent,
  },
  {
    name: 'Uniformity',
    subcategory: 'Other Faithfulness Constraints',
    description:
      "No element of the output has multiple correspondents in the input.\n('No coalescence')",
    reference: 'Kager (2004[1999]:77)',
    method: Method.assessUniformity,
  },
  {
    name: 'Contiguity',
    subcategory: 'Other Faithfulness Constraints',
    description: 'No medial epenthesis or deletion of segments',
    reference: 'Kager (2004[1999]:250)',
    method: Method.assessContiguity,
  },
  ...DISTINCTIVE_FEATURES.map<FaithfulnessConstraintObj>((feature) => ({
    name: `Ident([${feature}])`,
    subcategory: 'Ident',
    targetProperty: feature,
    method: Method.assessIdent,
  })),
]
