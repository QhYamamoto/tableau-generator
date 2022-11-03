interface RepositoryInterface {
  getTableauDataArr: (evalMode: EvalMode) => TableauData[]
  getFeatureDataArr: () => FeatureData[]
  storeTableau: (
    tabI: number,
    value: TableauInterface,
    evalMode: EvalMode
  ) => void
  destroyTableau: (tabI: number, evalMode: EvalMode) => void
  storeFeatureSetting: (
    elName: string,
    feature: DistinctiveFeature,
    value: TernaryOptions
  ) => void
}

type TableauData = Subtype<TableauInterface, AnyFunction>
type FeatureData = {
  elName: string
  feature: DistinctiveFeature
  value: TernaryOptions
}

interface StorageInterface {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

type StorageKey = 'otTableauGeneratorData' | 'otTableauGenerator_FeatureData'
