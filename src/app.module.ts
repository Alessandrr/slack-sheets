import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SheetsModule } from './sheets/sheets.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SheetsModule,
    SlackModule,
  ],
})
export class AppModule {}
