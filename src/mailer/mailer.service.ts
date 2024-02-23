import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import Handlebars from 'handlebars';
import { AllConfigType } from '@/config/config.type';
import { text } from 'express';
import { LambdaService } from '@/aws/lambda.service';

@Injectable()
export class MailerService {
  constructor(private readonly lambda: LambdaService) {
    // sgMail.setApiKey(
    //   this.configService.getOrThrow('mail.sendgridApiKey', { infer: true }),
    // );
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: {
    to: string;
    from: string;
    subject: string;
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template)(context);
    }

    const msg = {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject,
      html: html ?? '<h1>Some error in html</h1>',
      // text: text ?? '',
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent');
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  async sendMail2(mailOptions: MailDataRequired): Promise<void> {
    try {
      await sgMail.send(mailOptions);
      console.log('Email sent');
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}
// import { Injectable } from '@nestjs/common';
// import fs from 'node:fs/promises';
// import { ConfigService } from '@nestjs/config';
// import sgMail, { MailDataRequired } from '@sendgrid/mail';
// import Handlebars from 'handlebars';
// import { AllConfigType } from '@/config/config.type';
// import { text } from 'express';

// @Injectable()
// export class MailerService {
//   constructor(private readonly configService: ConfigService<AllConfigType>) {
//     sgMail.setApiKey(
//       this.configService.getOrThrow('mail.sendgridApiKey', { infer: true }),
//     );
//   }

//   async sendMail({
//     templatePath,
//     context,
//     ...mailOptions
//   }: {
//     to: string;
//     from: string;
//     subject: string;
//     templatePath: string;
//     context: Record<string, unknown>;
//   }): Promise<void> {
//     let html: string | undefined;
//     if (templatePath) {
//       const template = await fs.readFile(templatePath, 'utf-8');
//       html = Handlebars.compile(template)(context);
//     }

//     const msg = {
//       to: mailOptions.to,
//       from: mailOptions.from,
//       subject: mailOptions.subject,
//       html: html ?? '<h1>Some error in html</h1>',
//       // text: text ?? '',
//     };

//     try {
//       await sgMail.send(msg);
//       console.log('Email sent');
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     }
//   }

//   async sendMail2(mailOptions: MailDataRequired): Promise<void> {
//     try {
//       await sgMail.send(mailOptions);
//       console.log('Email sent');
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response.body);
//       }
//     }
//   }
// }
// import { Injectable } from '@nestjs/common';
// import fs from 'node:fs/promises';
// import { ConfigService } from '@nestjs/config';
// import nodemailer from 'nodemailer';
// import Handlebars from 'handlebars';
// import { AllConfigType } from '@/config/config.type';

// @Injectable()
// export class MailerService {
//   private readonly transporter: nodemailer.Transporter;
//   constructor(private readonly configService: ConfigService<AllConfigType>) {
//     this.transporter = nodemailer.createTransport({
//       host: configService.get('mail.host', { infer: true }),
//       port: configService.get('mail.port', { infer: true }),
//       ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
//       secure: configService.get('mail.secure', { infer: true }),
//       requireTLS: configService.get('mail.requireTLS', { infer: true }),
//       auth: {
//         user: configService.get('mail.user', { infer: true }),
//         pass: configService.get('mail.password', { infer: true }),
//       },
//     });
//   }

//   async sendMail({
//     templatePath,
//     context,
//     ...mailOptions
//   }: nodemailer.SendMailOptions & {
//     templatePath: string;
//     context: Record<string, unknown>;
//   }): Promise<void> {
//     let html: string | undefined;
//     if (templatePath) {
//       const template = await fs.readFile(templatePath, 'utf-8');
//       html = Handlebars.compile(template, {
//         strict: true,
//       })(context);
//     }

//     await this.transporter.sendMail({
//       ...mailOptions,
//       from: mailOptions.from
//         ? mailOptions.from
//         : `"${this.configService.get('mail.defaultName', {
//             infer: true,
//           })}" <${this.configService.get('mail.defaultEmail', {
//             infer: true,
//           })}>`,
//       html: mailOptions.html ? mailOptions.html : html,
//     });
//   }
// }
