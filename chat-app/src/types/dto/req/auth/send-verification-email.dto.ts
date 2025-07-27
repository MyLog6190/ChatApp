import {EmailType} from '../../../../constants/email-type';

export interface SendEmailRequest {
  email: string;
  type: EmailType;
}
