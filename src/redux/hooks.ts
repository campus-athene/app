import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import type { AppDispatch, AppStore, RootState } from '.';

// Use throughout your app instead of generic hooks
export const useAppStore: () => AppStore = useStore;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
