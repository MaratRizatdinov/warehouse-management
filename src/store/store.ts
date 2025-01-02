// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api'; // Импортируем RTK Query сервис

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Добавляем редьюсер RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Добавляем middleware для RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
