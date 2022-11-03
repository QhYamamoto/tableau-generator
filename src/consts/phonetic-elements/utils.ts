export const DISTINCTIVE_FEATURES = [
  'voc',
  'cons',
  'syl',
  'son',
  'cont',
  'strid',
  'nas',
  'lat',
  'del.rel.',
  'trill',
  'flap',
  'voi',
  's.g.',
  'c.g.',
  'implos',
  'LAB',
  'rnd',
  'lab.dent.',
  'COR',
  'ant',
  'dist',
  'DORS',
  'hi',
  'lo',
  'bk',
  'tns',
] as const

const TARGET_PROPERTIES = [...DISTINCTIVE_FEATURES, 'obs', 'liq'] as const

const SONORITY_KEYS = [
  'GL_PLOSIVE', // glottal plosive
  'GL_FRICATIVE', // glottal fricative
  'VL_PLOSIVE', // voiceless (non-glottal) plosives
  'VL_AFFRICATE', // voiceless affricates
  'VL_FRICATIVE', // voiceless (non-glottal) fricatives
  'VD_PLOSIVE', // voiced (non-glottal) plosives
  'VD_AFFRICATE', // voiced affricates
  'VD_FRICATIVE', // voiced (non-glottal) fricatives
  'NASAL', // nasals
  'LIQUID', // liquids
  'GLIDE_APPROXIMANT', // glides or approximants
  'HIGH_VOWEL', // high vowels
  'MID_HIGH_VOWEL', // mid high vowels
  'MID_VOWEL', // mid vowels
  'MID_LOW_VOWEL', // mid low vowels
  'LOW_VOWEL', // low vowels
] as const

// Hierarchical sonority object
export const SONORITY = SONORITY_KEYS.reduce(
  (pre, cur, curI) => ({ ...pre, [cur]: curI + 1 }),
  {} as { [keys in SonorityKeys]: number }
)

// Set all properties to '-' except name, symbol and type
export const DEFAULT_SEGMENTAL_ELEMENT = TARGET_PROPERTIES.reduce(
  (pre, cur) => ({ ...pre, [cur]: '-' }),
  { type: 'segment' } as Pick<PhoneticElement, TargetProperty | 'type'>
)

// Set all properties to '0' except name, symbol and type
export const DEFAULT_NON_SOUND_ELEMENT = TARGET_PROPERTIES.reduce(
  (pre, cur) => ({ ...pre, [cur]: '0' }),
  {} as Pick<PhoneticElement, TargetProperty>
)

export const DEFAULT_VOCALIC_ELEMENT: Pick<
  PhoneticElement,
  TargetProperty | 'category' | 'type'
> = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  category: 'vowel',
  voc: '+',
  syl: '+',
  son: '+',
  cont: '+',
  voi: '+',
  ant: '0',
  dist: '0',
  DORS: '+',
}
