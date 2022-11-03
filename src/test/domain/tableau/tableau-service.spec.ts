import { describe, test, expect } from 'vitest'
import { Tableau } from '../../../domains/tableau/tableau'
import { TableauService } from '../../../domains/tableau/tableau-service'
import ExcelJS from 'exceljs'

describe('testTableauService', () => {
  const tableauService = new TableauService()

  test('testDownload', async () => {
    await tableauService.download([new Tableau()])
    expect(tableauService['workbook']).toBeInstanceOf(ExcelJS.Workbook)
    expect(tableauService['blob']).toBeInstanceOf(Blob)
  })
})
