import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index';

export const getPhases = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPhases();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPhase = (phase) => async (dispatch) => {
  try {
    const { data } = await api.createPhase(phase);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePhase = (id, phase) => async (dispatch) => {
  try {
    const { data } = await api.updatePhase(id, phase);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePhase = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePhase(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePhase = (id) => async (dispatch) => {
  try {
    await api.deletePhase(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
