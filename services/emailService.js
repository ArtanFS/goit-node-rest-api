import sgMail from '@sendgrid/mail';
import { serverConfig } from '../configs/index.js';

sgMail.setApiKey(serverConfig.emailServiceAPI);

export const sendEmail = async (data) => {
  const email = { ...data, from: serverConfig.emailFrom };
  await sgMail.send(email);
  return true;
};
