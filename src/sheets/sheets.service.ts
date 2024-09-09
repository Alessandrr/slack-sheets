import { Inject, Injectable } from '@nestjs/common';
import { SHEET_ID, SHEETS_API, SPREADSHEET_ID } from './sheets.constants';
import { sheets_v4 } from 'googleapis';
import { SheetsValueInputOptions } from './sheets.types';

@Injectable()
export class SheetsService {
  constructor(
    @Inject(SHEETS_API)
    private readonly sheetsApi: sheets_v4.Sheets,

    @Inject(SPREADSHEET_ID)
    private readonly spreadsheetId: string,

    @Inject(SHEET_ID)
    private readonly sheetId: string,
  ) {}

  async appendToSheet(
    valueInputOption: SheetsValueInputOptions,
    value: string,
  ) {
    await this.sheetsApi.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: this.sheetId,
      valueInputOption: valueInputOption,
      requestBody: {
        values: [[value]],
      },
    });
  }
}
