import {EmailTypes} from '../../../../constants/email-types';

export interface SendEmailRequest {
  email: string;
  type: EmailTypes;
}
