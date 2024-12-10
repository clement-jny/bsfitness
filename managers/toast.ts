import Toast from 'react-native-toast-message';
import {
  type ToastType, // success, error, info
  type ToastPosition, // top, bottom
  type ToastOptions,
} from 'react-native-toast-message';

const BASE_TOAST_OPTIONS: ToastOptions = {
  position: 'bottom' as ToastPosition,
  visibilityTime: 3000,
  autoHide: true,
} as const;

const show = (type: ToastType, title: string, message?: string) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    ...BASE_TOAST_OPTIONS,
  });
};

export const ToastManager = {
  show,
  success: (title: string, message?: string): void =>
    show('success', title, message),
  error: (title: string, message?: string): void =>
    show('error', title, message),
  info: (title: string, message?: string): void => show('info', title, message),
};
