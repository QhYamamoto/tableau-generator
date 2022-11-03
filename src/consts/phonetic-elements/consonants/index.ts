import { ALVEO_PALATAL_CONSONANTS } from './alveo-palatal'
import { CORONAL_CONSONANTS } from './coronal'
import { LABIAL_CONSONANTS } from './labial'
import { LARYNGEAL_CONSONANTS } from './laryngeal'
import { PALATAL_CONSONANTS } from './palatal'
import { RETROFLEX_CONSONANTS } from './retroflex'
import { UVULAR_CONSONANTS } from './uvular'
import { VELAR_CONSONANTS } from './velar'
import { OTHER_CONSONANTS } from './others'

export const CONSONANTS: PhoneticElement[] = [
  ...CORONAL_CONSONANTS,
  ...ALVEO_PALATAL_CONSONANTS,
  ...LABIAL_CONSONANTS,
  ...LARYNGEAL_CONSONANTS,
  ...PALATAL_CONSONANTS,
  ...RETROFLEX_CONSONANTS,
  ...UVULAR_CONSONANTS,
  ...VELAR_CONSONANTS,
  ...OTHER_CONSONANTS,
]
