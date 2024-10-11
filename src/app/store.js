import { configureStore } from '@reduxjs/toolkit';
import { providerSlice } from './slices/providerSlice'; // 여러분의 slice 파일 경로

export const store = configureStore({
  reducer: {
    provider: providerSlice.reducer, // 여러 slice를 추가할 수 있습니다.
  },
});
