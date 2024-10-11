'use client'; // 클라이언트 컴포넌트임을 선언

import { store } from '../app/store'; // 방금 만든 store를 임포트
import { Provider } from 'react-redux'; // react-redux에서 Provider 임포트

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
