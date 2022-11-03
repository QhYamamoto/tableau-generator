import ExcelJS, { Column } from 'exceljs'

const normalBorder: Partial<ExcelJS.Border> = {
  style: 'thin',
  color: { argb: 'FF000000' },
}
const doubleBorder: Partial<ExcelJS.Border> = {
  style: 'double',
  color: { argb: 'FF000000' },
}
const dashedBorder: Partial<ExcelJS.Border> = {
  style: 'dotted',
  color: { argb: 'FF000000' },
}

export class TableauService {
  private workbook?: ExcelJS.Workbook
  private blob?: Blob

  /**
   * Download tableaus data as xlsx file
   * @param tableauArr Array of Tableau instance to download
   */
  public async download(tableauArr: TableauInterface[]) {
    this.workbook = this.createWorkbook(tableauArr)
    const unit8Array = await this.workbook.xlsx.writeBuffer()
    this.blob = new Blob([unit8Array], {
      type: 'application/octet-binary',
    })

    const a = document.createElement('a')
    a.href = (window.URL || window.webkitURL).createObjectURL(this.blob)
    a.download = `tableaus.xlsx`
    a.click()
    a.remove()
  }

  /* private methods */
  /**
   * Create ExcelJS.Workbook with tableaus data
   * @param tableauArr Array of Tableau instance to download
   * @returns ExcelJS.Workbook instance
   */
  private createWorkbook(tableauArr: TableauInterface[]) {
    const workbook = new ExcelJS.Workbook()

    tableauArr.forEach((tableau, tabI) => {
      const worksheetName = `Sheet${tabI + 1}`
      workbook.addWorksheet(worksheetName)

      const worksheet = workbook.getWorksheet(worksheetName)
      worksheet.columns = this.getColumn(tableau.input, tableau.constraints)
      worksheet.addRows(this.getRow(tableau))
      this.setStyleOfEachCell(tableau, worksheet)
    })

    return workbook
  }

  /**
   * Get array of ExcelJS.Column object by tableau data
   * @param input Input instance of the tableau
   * @param constraints Array of Constraint instance the tableau
   * @returns Array of ExcelJS.Column object
   */
  private getColumn(
    input: InputInterface,
    constraints: ConstraintInterface[]
  ): Array<Partial<Column>> {
    const columnObjs: Array<Partial<Column>> = []

    columnObjs.push({
      header: `/ ${input.formattedValue} /`,
      key: 'column-1',
    })

    constraints.forEach((constraint, index) =>
      columnObjs.push({
        header: constraint.nameWithoutParentheses,
        key: `column-${index + 2}`,
      })
    )
    return columnObjs
  }

  /**
   * Get array of row object by tableau data
   * @param tableau Tableau instance
   * @returns Array of row object
   */
  private getRow(tableau: TableauInterface): { [key: string]: string }[] {
    const rowObjs: { [key: string]: string }[] = []

    tableau.candidates.forEach((cand, candI) => {
      const markArr = tableau.constraints.map(
        (constraint) => constraint.marks[candI]
      )
      const rowObj: typeof rowObjs[number] = {}

      rowObj['column-1'] =
        candI === tableau.winnerIndex?.value
          ? `☞   [ ${cand.formattedValue} ]`
          : `[ ${cand.formattedValue} ]`

      markArr.forEach((mark, markI) => {
        rowObj[`column-${markI + 2}`] = mark.value
      })

      rowObjs.push(rowObj)
    })
    return rowObjs
  }

  /**
   * Set style of each cell of worksheet
   * @param tableau Tableau instance
   * @param worksheet Target ExcelJS.Worksheet instance
   */
  private setStyleOfEachCell(
    tableau: TableauInterface,
    worksheet: ExcelJS.Worksheet
  ) {
    worksheet.eachColumnKey((column, colKey) => {
      // colKey = column-1, column-2, etc.
      const colNum = +colKey.toString().split('-')[1]
      column.eachCell((cell, rowNum) => {
        cell.style.font = { name: 'Times New Roman' }
        cell.border = this.setBorder(tableau.constraints, colNum, rowNum)
        cell.style.alignment = this.setAlign(colNum, rowNum)
        cell.fill = this.setFill(tableau.constraints, colNum, rowNum, cell.fill)

        const cellWidth = cell.value?.toString().length ?? 0
        column.width = Math.max(column.width ?? 10, cellWidth)
      })
    })
  }

  /**
   * Get ExcelJS.Borders object of a cell
   * @param constraints Array of Constraint instance
   * @param colNum 1 based column number
   * @param rowNum 1 based row number
   * @returns ExcelJS.Borders object
   */
  private setBorder(
    constraints: ConstraintInterface[],
    colNum: number,
    rowNum: number
  ): Partial<ExcelJS.Borders> {
    let rightBorder = normalBorder
    if (colNum === 1) rightBorder = doubleBorder
    else if (constraints[colNum - 2].rightDash) rightBorder = dashedBorder

    return {
      top: rowNum === 1 ? normalBorder : undefined,
      left: colNum === 1 ? normalBorder : undefined,
      bottom: rowNum === 1 ? doubleBorder : normalBorder,
      right: rightBorder,
    }
  }

  /**
   * Get ExcelJS.Alignment object of a cell
   * @param colNum 1 based column number
   * @param rowNum 1 based row number
   * @returns ExcelJS.Alignment object
   */
  private setAlign(colNum: number, rowNum: number): Partial<ExcelJS.Alignment> {
    let horizontalAlignment: Partial<ExcelJS.Alignment>['horizontal']
    if (rowNum === 1 && colNum === 1) horizontalAlignment = 'left' // input
    else if (colNum === 1) horizontalAlignment = 'right' // candidates
    else horizontalAlignment = 'center' // constraints and marks

    return {
      vertical: 'middle',
      horizontal: horizontalAlignment,
    }
  }

  /**
   * Get ExcelJS.Fill object of a cell
   * @param constraints Arrays of Constraint instance of the tableau
   * @param colNum 1 based column number
   * @param rowNum 1 based row number
   * @param defaultObj Default ExcelJS.Fill object
   * @returns ExcelJS.Fill object
   */
  private setFill(
    constraints: ConstraintInterface[],
    colNum: number,
    rowNum: number,
    defaultObj: ExcelJS.Fill
  ): ExcelJS.Fill {
    if (colNum <= 1 || rowNum <= 1) return defaultObj

    const mark = constraints[colNum - 2].marks[rowNum - 2]
    if (mark.isShaded) {
      return {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFDDDDDD' },
      }
    } else return defaultObj
  }
}
