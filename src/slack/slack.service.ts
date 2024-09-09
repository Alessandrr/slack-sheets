import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SLACK_APP } from './slack.constants';
import { App } from '@slack/bolt';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class SlackService implements OnModuleInit {
  constructor(
    @Inject(SLACK_APP)
    private readonly slackApp: App,

    private readonly sheetsService: SheetsService,
  ) {}

  async onModuleInit() {
    this.slackApp.message(async ({ message, say }) => {
      if (
        message.subtype === 'message_deleted' ||
        message.subtype === 'message_replied' ||
        message.subtype === 'message_changed'
      ) {
        return;
      }

      try {
        await this.sheetsService.appendToSheet('USER_ENTERED', message.text);
      } catch (error) {
        console.error(error);
        await say(`Failed to write to sheet: ${error.message}`);
      }
    });
  }
}
