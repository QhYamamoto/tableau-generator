import { describe, test, expect, beforeEach } from 'vitest'
import { Tableau } from '../../domains/tableau/tableau'
import { Repository } from '../../repository'
import { MOCKED_STORAGE } from '../mock'

describe('testRepository', () => {
  const repository = new Repository(MOCKED_STORAGE)
  const automaticKey = repository.AUTOMATIC_TABLEAU_KEY
  const manualKey = repository.MANUAL_TABLEAU_KEY
  const featureKey = repository.FEATURE_KEY

  beforeEach(() => {
    MOCKED_STORAGE.getItem.mockClear()
    MOCKED_STORAGE.setItem.mockClear()
  })

  test('testGetTableauDataArr', () => {
    const res1 = repository.getTableauDataArr('automatic')
    const res2 = repository.getTableauDataArr('manual')
    expect(res1).toStrictEqual([])
    expect(res2).toStrictEqual([])
    expect(MOCKED_STORAGE.getItem).toHaveBeenNthCalledWith(1, automaticKey)
    expect(MOCKED_STORAGE.getItem).toHaveBeenNthCalledWith(2, manualKey)
  })

  test('testGetFeatureDataArr', () => {
    const res = repository.getFeatureDataArr()
    expect(res).toStrictEqual([])
    expect(MOCKED_STORAGE.getItem).toBeCalledWith(featureKey)
  })

  test('testStoreTableau', () => {
    const tableau = new Tableau()
    const stringifiedTableau = JSON.stringify([tableau])
    repository.storeTableau(0, tableau, 'automatic')
    repository.storeTableau(0, tableau, 'manual')
    expect(MOCKED_STORAGE.setItem).toHaveBeenNthCalledWith(
      1,
      automaticKey,
      stringifiedTableau
    )
    expect(MOCKED_STORAGE.setItem).toHaveBeenNthCalledWith(
      2,
      manualKey,
      stringifiedTableau
    )
  })

  test('testDestroyTableau', () => {
    const stringifiedEmptyArray = JSON.stringify([])
    repository.destroyTableau(0, 'automatic')
    repository.destroyTableau(0, 'manual')
    expect(MOCKED_STORAGE.setItem).toHaveBeenNthCalledWith(
      1,
      automaticKey,
      stringifiedEmptyArray
    )
    expect(MOCKED_STORAGE.setItem).toHaveBeenNthCalledWith(
      2,
      manualKey,
      stringifiedEmptyArray
    )
  })

  test('testStoreFeatureSetting', () => {
    const elName = 'high front unrounded vowel'
    const feature: DistinctiveFeature = 'bk'
    const value: TernaryOptions = '+'
    const testFeatureDataArr: FeatureData[] = [
      {
        elName: elName,
        feature: feature,
        value: value,
      },
    ]
    repository.storeFeatureSetting(elName, feature, value)
    expect(MOCKED_STORAGE.setItem).toBeCalledWith(
      featureKey,
      JSON.stringify(testFeatureDataArr)
    )
  })
})
