import {
  configureStore, getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from '../slices/userSlice';
import lectureReducer from '../slices/lectureSlice';
import registrationReducer from '../slices/registrationSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    lecture: lectureReducer,
    registration: registrationReducer
  },
  middleware: [...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })],
});
