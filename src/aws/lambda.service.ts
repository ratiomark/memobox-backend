import { AllConfigType } from '@/config/config.type';
import { MailData } from '@/mail/interfaces/mail-data.interface';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LambdaService {
  private nodeEnv: string;
  private region: string;

  private lambdaClient: LambdaClient;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.initVariables();
    this.lambdaClient = new LambdaClient({
      region: this.region,
    });
  }

  async invokeFunction(functionName: string, payload: any): Promise<any> {
    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: Buffer.from(JSON.stringify(payload)),
    });

    try {
      const { Payload } = await this.lambdaClient.send(command);
      return JSON.parse(new TextDecoder().decode(Payload));
    } catch (error) {
      console.error('Error invoking Lambda function:', error);
      throw error;
    }
  }

  async sendEmail(
    mailData: MailData<{ hash?: string; name?: string; testNumber?: number }>,
  ) {
    const functionName = 'SendEmail';
    const payload = {
      body: {
        to: mailData.to,
        language: mailData.language,
        emailType: mailData.emailType,
        data: mailData.data,
      },
    };

    try {
      const response = await this.invokeFunction(functionName, payload);
      console.log('Email sent:', response);
    } catch (error) {
      console.error('Error calling ActivateEmail function:', error);
    }
  }

  async sendActivationEmail(mailData: MailData<{ hash: string }>) {
    const functionName = 'ActivateEmail';
    const payload = {
      body: {
        to: mailData.to,
        from: { email: 'lambda-test@memobox.tech', name: 'Lambda test' },
        subject: 'Test Email',
        html: '<h1>Hello World</h1>',
      },
    };

    try {
      const response = await this.invokeFunction(functionName, payload);
      console.log('Email sent:', response);
    } catch (error) {
      console.error('Error calling ActivateEmail function:', error);
    }
  }
  // async sendActivationEmail() {
  //   const functionName = 'ActivateEmail';
  //   const payload = {
  //     body: {
  //       to: 'yanagae@gmail.com',
  //       from: { email: 'lambda-test@memobox.tech', name: 'Lambda test' },
  //       subject: 'Test Email',
  //       html: '<h1>Hello World</h1>',
  //     },
  //   };

  //   try {
  //     const response = await this.invokeFunction(functionName, payload);
  //     console.log('Email sent:', response);
  //   } catch (error) {
  //     console.error('Error calling ActivateEmail function:', error);
  //   }
  // }

  async testNotification() {
    const functionName = 'CheckAndSendNotifications';
    const payload = {
      body: {
        to: 'yanagae@gmail.com',
        from: { email: 'lambda-test@memobox.tech', name: 'Lambda test' },
        subject: 'Test Email',
        html: '<h1>Hello World</h1>',
      },
    };

    try {
      const response = await this.invokeFunction(functionName, payload);
      console.log('response:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error calling ActivateEmail function:', error);
    }
  }

  initVariables() {
    this.region = this.configService.getOrThrow<string>('AWS_REGION', {
      infer: true,
    });
    this.nodeEnv = this.configService.getOrThrow<string>('NODE_ENV', {
      infer: true,
    });
  }
}
