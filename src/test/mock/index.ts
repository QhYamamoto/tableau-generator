/* eslint-disable @typescript-eslint/no-unused-vars */
import { vi } from 'vitest'
import { Candidate } from '../../domains/tableau/value-objects/candidate'
import { Constraint } from '../../domains/tableau/value-objects/constraint'
import { Input } from '../../domains/tableau/value-objects/input'
import { Mark } from '../../domains/tableau/value-objects/mark'
import { WinnerIndex } from '../../domains/tableau/value-objects/winner-index'

export const MOCKED_REPOSITORY = vi.mocked<RepositoryInterface>({
  getTableauDataArr: vi.fn((): TableauData[] => {
    return [
      {
        input: new Input(),
        candidates: [new Candidate(), new Candidate()],
        constraints: [new Constraint(1, [new Mark(), new Mark()])],
        winnerIndex: new WinnerIndex(0),
        rankInfo: [1],
      },
    ]
  }),
  getFeatureDataArr: vi.fn((): FeatureData[] => {
    return []
  }),
  storeTableau: vi.fn(
    (tabI: number, value: TableauInterface, evalMode: EvalMode) => {
      return [tabI, value, evalMode]
    }
  ),
  destroyTableau: vi.fn((tabI: number, evalMode: EvalMode) => {
    return [tabI, evalMode]
  }),
  storeFeatureSetting: vi.fn((elName, feature, value) => {
    return [elName, feature, value]
  }),
})

export const MOCKED_STORAGE = vi.mocked<StorageInterface>({
  getItem: vi.fn((key: string) => {
    return null
  }),
  setItem: vi.fn((key: string, value: string) => {
    return
  }),
})
