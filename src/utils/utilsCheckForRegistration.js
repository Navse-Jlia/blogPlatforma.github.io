import { message } from 'antd';

export default function utilsCheckForRegistration(error) {
  const res = JSON.parse(error.response.request.response);
  if ('username' in res.errors && 'email' in res.errors) {
    message.error('This email address and nickname are already registered');
  } else if ('username' in res.errors) {
    message.error('this nickname is already taken');
  } else if ('email' in res.errors) {
    message.error('This email is already registered');
  } else {
    message.error('try again or check data');
  }
}
