import {
  createSlice,
} from '@reduxjs/toolkit';
import { addLectureFunc } from '../api/lecture';

const initialState = {
  loading: {
    addLecture: false,
  },
  hasErrors: {
    addLecture: false,
  },
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    asyncStart: (state, {
      payload,
    }) => {
      state.loading[payload] = true;
      state.hasErrors[payload] = false;
    },
    asyncFailure: (state, {
      payload,
    }) => {
      state.loading[payload] = false;
      state.hasErrors[payload] = true;
    },
    addLectureSuccess: (state, {
      payload,
    }) => {
      state.loading.addLecture = false;
      state.hasErrors.addLecture = false;
    },
  },
});

export const {
  asyncStart,
  asyncFailure,
  addLectureSuccess,
} = lectureSlice.actions;

export default lectureSlice.reducer;

export const lectureSelector = (state) => state.lecture;

export const addLecture = ({ name, code, lecturerId }) => async (dispatch) => {
  dispatch(asyncStart('addLecture'));

  try {
    const returnResponse = await addLectureFunc({ name, code, lecturerId })
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, lecture } = data;

          if (success && lecture) {
            return lecture;
          }
          throw Error('ADDING_FAILED');
        } else {
          throw Error('REQUEST_FAILED');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error || Error('REQUEST_FAILED');
      });
    console.log('returnResponse: ', returnResponse);
    return returnResponse;
  } catch (error) {
    console.log('failed: ', error);
    dispatch(asyncFailure('addLecture'));
  }
};
