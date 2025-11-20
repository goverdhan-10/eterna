import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, NotificationState } from '@/types';

interface UIState {
  modal: ModalState;
  notification: NotificationState;
}

const initialState: UIState = {
  modal: {
    isOpen: false,
    title: '',
    content: null,
  },
  notification: {
    isVisible: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ title: string; content: React.ReactNode }>) => {
      state.modal.isOpen = true;
      state.modal.title = action.payload.title;
      state.modal.content = action.payload.content;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.title = '';
      state.modal.content = null;
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.notification.isVisible = true;
      state.notification.message = action.payload.message;
      state.notification.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.notification.isVisible = false;
      state.notification.message = '';
    },
  },
});

export const { openModal, closeModal, showNotification, hideNotification } = uiSlice.actions;

export default uiSlice.reducer;
