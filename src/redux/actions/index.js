import {
  ADD_DEVELOPER_STARTED,
  ADD_DEVELOPER_SUCCESS,
  ADD_DEVELOPER_FAILURE,
  GET_ALL_DEVELOPERS_STARTED,
  GET_ALL_DEVELOPERS_SUCCESS,
  GET_ALL_DEVELOPERS_FAILURE,
  GET_FEW_DEVELOPERS_STARTED,
  GET_FEW_DEVELOPERS_SUCCESS,
  GET_FEW_DEVELOPERS_FAILURE,
  GET_ONE_DEVELOPER_STARTED,
  GET_ONE_DEVELOPER_SUCCESS,
  GET_ONE_DEVELOPER_FAILURE,
  DELETE_ONE_DEVELOPER_STARTED,
  DELETE_ONE_DEVELOPER_SUCCESS,
  DELETE_ONE_DEVELOPER_FAILURE,
  EDIT_DEVELOPER_STARTED,
  EDIT_DEVELOPER_SUCCESS,
  EDIT_DEVELOPER_FAILURE,
  REGISTER_USER_STARTED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  COMPARE_TOKEN_STARTED,
  COMPARE_TOKEN_SUCCESS,
  COMPARE_TOKEN_FAILURE,
  LOGOUT_USER,
  SEARCH_FOR_DEVELOPERS_STARTED,
  SEARCH_FOR_DEVELOPERS_SUCCESS,
  SEARCH_FOR_DEVELOPERS_FAILURE,
} from "../constants/acion-types";
import axios from "axios";

export function getAllDevelopers() {
  return async (dispatch) => {
    try {
      dispatch(getAllDevelopersStarted());
      // const url = "https://jsonplaceholder.typicode.com/users/";
      const url = "/api/developers/";
      const { data } = await axios.get(url);
      dispatch(getAllDevlopersSuccess(data.developers));
    } catch (err) {
      dispatch(getAllDevlopersFailure(err.message));
    }
  };
}

function getAllDevelopersStarted() {
  return { type: GET_ALL_DEVELOPERS_STARTED };
}
function getAllDevlopersSuccess(developers) {
  return {
    type: GET_ALL_DEVELOPERS_SUCCESS,
    payload: developers,
  };
}
function getAllDevlopersFailure(error) {
  return { type: GET_ALL_DEVELOPERS_FAILURE, payload: error };
}

export function getFewDevelopers(number, isInitialLoad) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_FEW_DEVELOPERS_STARTED, payload: isInitialLoad});
      const url = `/api/developers/few/?number=${number}`;
      const { data } = await axios.get(url);
      dispatch({
        type: GET_FEW_DEVELOPERS_SUCCESS,
        payload: { developers: data.developers, isInitialLoad: isInitialLoad },
      });
    } catch (err) {
      dispatch({ type: GET_FEW_DEVELOPERS_FAILURE, payload: err.message });
    }
  };
}

// export function getOneDeveloper(id) {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: GET_ONE_DEVELOPER_STARTED });
//       const url = "https://jsonplaceholder.typicode.com/users/";
//       const { data } = await axios.get(url + id);
//       dispatch({ type: GET_ONE_DEVELOPER_SUCCESS, payload: data });
//     } catch (err) {
//       dispatch({
//         type: GET_ONE_DEVELOPER_FAILURE,
//         payload: err.message,
//       });
//     }
//   };
// }

export function getOneDeveloper(id) {
  return async (dispatch) => {
    try {
      dispatch(getOneDeveloperStarted());
      // const url = "https://jsonplaceholder.typicode.com/users/";
      const url = "/api/developers/";
      const { data } = await axios.get(url + id);
      dispatch(getOneDevloperSuccess(data));
    } catch (err) {
      dispatch(getOneDevloperFailure(err.message));
    }
  };
}

function getOneDeveloperStarted() {
  return { type: GET_ONE_DEVELOPER_STARTED };
}
function getOneDevloperSuccess(developer) {
  return {
    type: GET_ONE_DEVELOPER_SUCCESS,
    payload: developer,
  };
}
function getOneDevloperFailure(error) {
  return { type: GET_ONE_DEVELOPER_FAILURE, payload: error };
}

export function deleteOneDeveloper(id) {
  return async (dispatch) => {
    try {
      dispatch(deleteOneDeveloperStarted());
      // const url = "https://jsonplaceholder.typicode.com/users/";
      const url = "/api/developers/";
      const {
        data: { developers },
      } = await axios.delete(url + id);
      dispatch(deleteOneDevloperSuccess(developers));
    } catch (err) {
      dispatch(deleteOneDevloperFailure(err.message));
    }
  };
}

function deleteOneDeveloperStarted() {
  return { type: DELETE_ONE_DEVELOPER_STARTED };
}
function deleteOneDevloperSuccess(developers) {
  return {
    type: DELETE_ONE_DEVELOPER_SUCCESS,
    payload: developers,
  };
}
function deleteOneDevloperFailure(error) {
  return { type: DELETE_ONE_DEVELOPER_FAILURE, payload: error };
}

export function addDeveloper(developer) {
  return async (dispatch) => {
    try {
      dispatch(addDeveloperStarted());
      // const url = "https://jsonplaceholder.typicode.com/users/";
      const url = "/api/developers/";
      const { data } = await axios.post(url, developer);
      dispatch(addDeveloperSuccess(data.developer));
    } catch (err) {
      const { error, isDeveloperEmailAlreadyExists } = err.response.data;
      if (error)
        return dispatch(
          addDeveloperFailure({
            isDeveloperEmailAlreadyExists: isDeveloperEmailAlreadyExists,
            error: error,
          })
        );
      else
        dispatch(
          addDeveloperFailure({
            isDeveloperEmailAlreadyExists: false,
            error: err.message,
          })
        );
    }
  };
}

function addDeveloperStarted() {
  return { type: ADD_DEVELOPER_STARTED };
}
function addDeveloperSuccess(developer) {
  return {
    type: ADD_DEVELOPER_SUCCESS,
    payload: developer,
  };
}
function addDeveloperFailure(error) {
  return { type: ADD_DEVELOPER_FAILURE, payload: error };
}

export function editDeveloper(developer, id) {
  return async (dispatch) => {
    try {
      dispatch(editDeveloperStarted());
      const url = "/api/developers/";
      const { data } = await axios.patch(url + id, developer);
      dispatch(editDeveloperSuccess(data.developer));
    } catch (err) {
      const { error } = err.response.data;
      if (error) return dispatch(editDeveloperFailure(error));
      else dispatch(editDeveloperFailure(err.message));
    }
  };
}

function editDeveloperStarted() {
  return { type: EDIT_DEVELOPER_STARTED };
}
function editDeveloperSuccess(developer) {
  return {
    type: EDIT_DEVELOPER_SUCCESS,
    payload: developer,
  };
}
function editDeveloperFailure(error) {
  return { type: EDIT_DEVELOPER_FAILURE, payload: error };
}

export function registerUser(user) {
  return async (dispatch) => {
    try {
      dispatch(registerUserStarted());
      const url = "/api/user/register";
      const {
        data: { success },
      } = await axios.post(url, user);
      dispatch(registerUserSuccess(success));
    } catch (err) {
      const { error, isUserEmailAlreadyExists } = err.response.data;
      if (error)
        return dispatch(
          registerUserFailure({ error, isUserEmailAlreadyExists })
        );
      else
        dispatch(
          registerUserFailure({
            error: err.message,
            isUserEmailAlreadyExists: false,
          })
        );
    }
  };
}

function registerUserStarted() {
  return { type: REGISTER_USER_STARTED };
}
function registerUserSuccess(success) {
  // localStorage.setItem("token", data.token);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: success,
  };
}
function registerUserFailure(error) {
  return { type: REGISTER_USER_FAILURE, payload: error };
}

export function loginUser(user) {
  return async (dispatch) => {
    try {
      dispatch(loginUserStarted());
      const url = "/api/user/login";
      const { data } = await axios.post(url, user);
      const loginUser = Object.create(
        Object.getPrototypeOf(data.user),
        Object.getOwnPropertyDescriptors(data.user)
      );
      loginUser.token = data.token;
      dispatch(loginUserSuccess({ success: data.success, user: loginUser }));
    } catch (err) {
      const {
        error,
        isUserEmailExists,
        isLoginPasswordCorrect,
      } = err.response.data;
      if (error)
        return dispatch(
          loginUserFailure({ error, isUserEmailExists, isLoginPasswordCorrect })
        );
      else
        dispatch(
          loginUserFailure({
            error: err.message,
          })
        );
    }
  };
}

function loginUserStarted() {
  return { type: LOGIN_USER_STARTED };
}
function loginUserSuccess(data) {
  localStorage.setItem("user", JSON.stringify(data.user));
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data.success,
  };
}
function loginUserFailure(error) {
  return { type: LOGIN_USER_FAILURE, payload: error };
}

export function compareToken(token) {
  return async (dispatch) => {
    try {
      dispatch({ type: COMPARE_TOKEN_STARTED });
      const url = "/api/developers/auth";
      const { data } = await axios.post(url, token);
      dispatch({ type: COMPARE_TOKEN_SUCCESS, payload: data.success });
    } catch (err) {
      dispatch({ type: COMPARE_TOKEN_FAILURE, payload: err });
    }
  };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}

export function findDevelopers(searchedWord) {
  return async (dispatch) => {
    try {
      dispatch({ type: SEARCH_FOR_DEVELOPERS_STARTED });

      const url = `/api/developers/search/?query=${searchedWord}`;
      const { data } = await axios.get(url);
      dispatch({
        type: SEARCH_FOR_DEVELOPERS_SUCCESS,
        payload: data.developers,
      });
    } catch (err) {
      dispatch({ type: SEARCH_FOR_DEVELOPERS_FAILURE, payload: err.message });
    }
  };
}
