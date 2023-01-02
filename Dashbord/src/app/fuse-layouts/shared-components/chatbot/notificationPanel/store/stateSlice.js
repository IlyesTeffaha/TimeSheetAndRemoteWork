import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'chatbotPanel/state',
  initialState: false,
  reducers: {
    toggleChatbotPanel: (state, action) => !state,
    openChatbotPanel: (state, action) => true,
    closeChatbotPanel: (state, action) => false,
  },
});

export const { toggleChatbotPanel, openChatbotPanel, closeChatbotPanel } =
  stateSlice.actions;

export default stateSlice.reducer;
