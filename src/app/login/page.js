import axios from 'axios';
import LoginPage from '../../components/login/login';

export default async function Login() {
    const message = 'loginPage'

  return (
    <>
      {message && message}
      <LoginPage/>
    </>
  );
}



