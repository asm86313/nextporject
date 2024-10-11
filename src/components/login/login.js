'use client';  // 클라이언트 컴포넌트임을 선언

import axios from 'axios';
import { useState } from 'react';
import SignupModal from '../SignupModal/SignupModal'

export default function Login() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // axios로 서버에 로그인 요청
      const res = await axios.post('http://localhost:3000/api/login', {
        userid: userid,
        password: password,
      });

      if (res.status === 200) {
        // 로그인 성공 시 대시보드로 리디렉션
        window.location.href = '/list';
      }
    } catch (error) {
      // 오류가 발생했을 때 메시지 설정
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
    });
    window.location.href = '/login';  // 로그아웃 후 로그인 페이지로 이동
  };

  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userid">아이디:</label>
          <input
            type="userid"
            id="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" type="submit">Login</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" type="button" onClick={handleLogout}>Logout</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button" onClick={openSignupModal}>회원가입</button>
      </form>
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </div>
  );
}
