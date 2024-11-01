import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: false, // Changed from true to false
      requireTLS: true, // Added this line
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
      tls: {
        ciphers: 'SSLv3', // Added this line
        rejectUnauthorized: false // Added this line for development
      },
    });
  }

  async sendTaskReminder(userEmail: string, taskTitle: string, dueDate: Date) {
    try {
      const formattedDate = dueDate.toLocaleDateString();
      
      await this.transporter.sendMail({
        from: this.configService.get('SMTP_FROM'),
        to: userEmail,
        subject: 'Task Due Tomorrow: Action Required',
        text: `
          Hello,

          This is a reminder that your task "${taskTitle}" is due tomorrow (${formattedDate}).
          Please make sure to complete it before the deadline.

          Best regards,
          Your App Team
        `,
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}