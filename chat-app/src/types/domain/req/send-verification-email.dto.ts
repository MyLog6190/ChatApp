import {EmailType} from '../../../constants/EmailType';

export interface SendEmailRequest {
  email: string;
  type: EmailType;
}
