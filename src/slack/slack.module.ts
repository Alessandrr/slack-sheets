import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SLACK_APP } from './slack.constants';
import { App } from '@slack/bolt';
import { SheetsModule } from '../sheets/sheets.module';

@Module({
  providers: [
    SlackService,
    {
      provide: SLACK_APP,
      useFactory: async () => {
        const slackApp = new App({
          token: process.env.SLACK_BOT_TOKEN,
          signingSecret: process.env.SLACK_SIGNING_SECRET,
          socketMode: true,
          appToken: process.env.SLACK_APP_TOKEN,
        });

        await slackApp.start();
        console.log('⚡️ Bolt app is running!');
        return slackApp;
      },
    },
  ],
  imports: [SheetsModule],
})
export class SlackModule {}
