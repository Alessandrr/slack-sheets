import { Module } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { SHEET_ID, SHEETS_API, SPREADSHEET_ID } from './sheets.constants';

@Module({
  providers: [
    SheetsService,
    {
      provide: SPREADSHEET_ID,
      useValue: '1E5BueTj6zliKYg8L_uV9IQTXEc3VAstInfn5RzZ7O0Y',
    },
    {
      provide: SHEET_ID,
      useValue: 'Sheet1',
    },
    {
      provide: SHEETS_API,
      useFactory: async () => {
        const auth = new GoogleAuth({
          scopes: 'https://www.googleapis.com/auth/spreadsheets',
        });

        return google.sheets({
          version: 'v4',
          auth,
        });
      },
    },
  ],
  exports: [SheetsService],
})
export class SheetsModule {}
