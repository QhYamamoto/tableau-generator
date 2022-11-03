const distinctiveFeatures = [
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

const targetProperties = [...distinctiveFeatures, 'obs', 'liq'] as const

const sonorityKeys = [
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

type TernaryOptions = '+' | '-' | '0'

type SonorityKeys = typeof sonorityKeys[number]

type DistinctiveFeature = typeof distinctiveFeatures[number]
type DistinctiveFeatureObj = {
  [keys in DistinctiveFeature]: TernaryOptions
}

type TargetProperty = typeof targetProperties[number]
type TargetPropertyObj = {
  readonly obs: TernaryOptions
  readonly liq: TernaryOptions
} & DistinctiveFeatureObj

type ElementType =
  | 'segment'
  | 'syllable-border'
  | 'morpheme-border'
  | 'deleted-segment'
  | 'insertion-start'
  | 'insertion-end'
  | 'mutation-start'
  | 'mutation-end'
  | 'coalescence-start'
  | 'coalescence-end'
  | 'index'

type SegmentCategory =
  | 'vowel'
  | 'long-vowel'
  | 'unsyllabic-vowel'
  | 'labial'
  | 'coronal'
  | 'dorsal'
  | 'other'

type PhoneticElement = TargetPropertyObj & {
  readonly name: string
  readonly symbol: string
  readonly tipa?: string
  // 分節音かそれ以外か
  readonly type: ElementType
  // 分節音のカテゴリー
  readonly category?: SegmentCategory
  /**
   * Default scale:
   * low vowels > mid vowels > high vowels/glides > liquids > nasals >
   * voiced (non-glottal) fricatives > voiceless (non-glottal) fricatives >
   * voiced (non-glottal) plosives > voiceless (non-glottal) plosives > glottal consonants
   */
  readonly sonority?: number
}

/* 音素以外の要素用の型 */
type UsedFor = 'input' | 'candidate' | 'both'
type NonSoundElement = PhoneticElement & {
  for?: UsedFor // 以下のプロパティが設定されていないものは非表示
  label?: string // 閉じ括弧を開き括弧とまとめて表示する場合などに指定(設定されていない場合はsymbolプロパティを参照)
  usage?: string
  usageForInput?: string // for = 'both'の要素の場合に指定
  usageForCandidate?: string // 同上
  example?: string
  exampleForInput?: string // 同上
  exampleForCandidate?: string // 同上
}

type FilteringTarget =
  | 'syllable-border'
  | 'morpheme-border'
  | 'mutation-border'
  | 'coalescence-content'
  | 'coalescence-border'
  | 'insertion-content'
  | 'insertion-border'
  | 'deleted-segment'
  | 'index'

interface FilteringTargetObj {
  type: FilteringTarget
  regexp: RegExp
}
