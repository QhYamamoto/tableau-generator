import { PHONETIC_ELEMENTS } from '../consts/phonetic-elements'

export class Repository implements RepositoryInterface {
  readonly storage: StorageInterface
  readonly AUTOMATIC_TABLEAU_KEY = 'otTableauGenerator_TableauData'
  readonly MANUAL_TABLEAU_KEY = 'otTableauGenerator_ManualTableauData'
  readonly FEATURE_KEY = 'otTableauGenerator_FeatureData'

  constructor(storage?: StorageInterface) {
    this.storage = storage ?? localStorage
  }

  /**
   * Get tableau key of storage
   * @param evalMode Current evaluation mode
   * @returns Key string
   */
  private getTableauKey(evalMode: EvalMode): string {
    return evalMode === 'automatic'
      ? this.AUTOMATIC_TABLEAU_KEY
      : this.MANUAL_TABLEAU_KEY
  }

  /**
   * Get stored tableau data
   * @param evalMode Current evaluation mode
   * @returns Array of tableaus data for corresponding evaluation mode
   */
  getTableauDataArr(evalMode: EvalMode): TableauData[] {
    const key = this.getTableauKey(evalMode)
    const tableauJson = this.storage.getItem(key)
    const tableauDataArr: TableauData[] = tableauJson
      ? JSON.parse(tableauJson)
      : []
    return tableauDataArr
  }

  /**
   * Get stored feature data
   * @returns Array of features data
   */
  getFeatureDataArr(): FeatureData[] {
    const featureJson = this.storage.getItem(this.FEATURE_KEY)
    const featureDataArr: FeatureData[] = featureJson
      ? JSON.parse(featureJson)
      : []
    return featureDataArr
  }

  /**
   * Store tableau data to local storage
   * @param tabI Target tableau index
   * @param value Tableau instance to store
   * @param evalMode Current evaluation mode
   */
  storeTableau(
    tabI: number,
    value: TableauInterface,
    evalMode: EvalMode
  ): void {
    const dataArr = this.getTableauDataArr(evalMode)
    dataArr[tabI] = value
    const key = this.getTableauKey(evalMode)
    this.storage.setItem(key, JSON.stringify(dataArr))
  }

  /**
   * Destroy tableau data on local storage
   * @param tabI Target tableau index
   * @param evalMode Current evaluation mode
   */
  destroyTableau(tabI: number, evalMode: EvalMode): void {
    const dataArr = this.getTableauDataArr(evalMode)
    dataArr.splice(tabI, 1)
    const key = this.getTableauKey(evalMode)
    this.storage.setItem(key, JSON.stringify(dataArr))
  }

  /**
   * Store user-defined setting of a element's feature
   * @param elName Target element name
   * @param feature Target feature name
   * @param value Value of target feature to store
   * @returns
   */
  storeFeatureSetting(
    elName: string,
    feature: DistinctiveFeature,
    value: TernaryOptions
  ): void {
    const dataArr = this.getFeatureDataArr()
    const dataToStore: FeatureData = {
      elName: elName,
      feature: feature,
      value: value,
    }
    const defaultEl = PHONETIC_ELEMENTS.find((el) => el.name === elName)
    if (!defaultEl) return
    const defaultVal = defaultEl[feature]
    const elI = dataArr.findIndex((data) => data.elName === elName)

    // Store if value isn't same as default, else splice from user-defined setting data
    if (value === defaultVal) {
      dataArr.splice(elI, 1)
    } else {
      elI === -1
        ? dataArr.push(dataToStore)
        : dataArr.splice(elI, 1, dataToStore)
    }
    this.storage.setItem(this.FEATURE_KEY, JSON.stringify(dataArr))
  }
}
