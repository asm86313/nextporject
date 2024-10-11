import { createSlice } from '@reduxjs/toolkit';

export const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    value: 0, // 초기 상태
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { increment, decrement, setValue } = providerSlice.actions;

// 선택자 내보내기
export const selectValue = (state) => state.provider.value;

export default providerSlice.reducer;
