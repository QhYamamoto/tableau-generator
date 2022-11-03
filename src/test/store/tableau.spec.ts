import { describe, test, expect, beforeEach, vi } from 'vitest'
import { Tableau } from '../../domains/tableau/tableau'
import useTableauStore, { TableauStore } from '../../store/tableau'
import { MOCKED_REPOSITORY } from '../mock'

describe('testTableauStore', () => {
  let store: TableauStore
  beforeEach(() => {
    store = useTableauStore(MOCKED_REPOSITORY)
    MOCKED_REPOSITORY.storeFeatureSetting.mockClear()
  })

  test('testStoreTableau', () => {
    store.$storeTableau(0)
    expect(MOCKED_REPOSITORY.storeTableau).toBeCalled()
  })

  test('testRestoreTableau', () => {
    store.$restoreTableau(0)
    vi.spyOn(Tableau, 'createFrom').mockImplementation(() => new Tableau())
    expect(MOCKED_REPOSITORY.getTableauDataArr).toBeCalled()
  })

  test('testDestroyTableau', () => {
    store.$destroyTableau(0)
    expect(MOCKED_REPOSITORY.destroyTableau).toBeCalled()
  })

  test('testSetSelectedTableauI', () => {
    store.$setSelectedTableauI(1)
    expect(store.$selectedTabI.value).toBe(1)
  })

  test('testSetMode', () => {
    store.$setMode('automatic')
    expect(store.$evalMode.value).toBe('automatic')
    store.$setMode('manual')
    expect(store.$evalMode.value).toBe('manual')
  })

  test('testTableauOperations', () => {
    store.$addTableau() // 空タブローを追加
    expect(store.$tableauArr.value.length).toBe(2)
    store.$tableauArr.value[0].setInput('test') // 0番のタブローのインプットの値を'test'に
    store.$copyTableau(0) // タブローをコピー
    store.$pasteTableau(1) // コピーしたタブローをペースト
    expect(store.$tableauArr.value[0].input.value).toBe('test')
    store.$clearTableau(1) // タブローを空に
    expect(store.$tableauArr.value[1].input.value).toBe('')
    store.$removeTableau(1) // タブローを削除
    expect(store.$tableauArr.value.length).toBe(1)
  })
})
