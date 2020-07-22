import {
  SET_SEARCHED_WORD,
  ADD_DEVELOPER_STARTED,
  ADD_DEVELOPER_SUCCESS,
  ADD_DEVELOPER_FAILURE,
  GET_ALL_DEVELOPERS_STARTED,
  GET_ALL_DEVELOPERS_SUCCESS,
  GET_ALL_DEVELOPERS_FAILURE,
  GET_ONE_DEVELOPER_STARTED,
  GET_ONE_DEVELOPER_SUCCESS,
  GET_ONE_DEVELOPER_FAILURE,
  DELETE_ONE_DEVELOPER_STARTED,
  DELETE_ONE_DEVELOPER_SUCCESS,
  DELETE_ONE_DEVELOPER_FAILURE,
  EDIT_DEVELOPER_STARTED,
  EDIT_DEVELOPER_SUCCESS,
  EDIT_DEVELOPER_FAILURE,
} from "../constants/acion-types";
import axios from "axios";

export function setSearchedWord(payload) {
  return { type: SET_SEARCHED_WORD, payload };
}

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

// export function getOneDeveloper(id) {
//   return async (dispatch) => {
//     try {
//       dispatch(() => ({ type: GET_ONE_DEVELOPER_STARTED }));
//       const url = "https://jsonplaceholder.typicode.com/users/";
//       const { data } = await axios.get(url + id);
//       dispatch(() => ({ type: GET_ONE_DEVELOPER_SUCCESS, payload: data }));
//     } catch (err) {
//       dispatch(() => ({
//         type: GET_ONE_DEVELOPER_FAILURE,
//         payload: err.message,
//       }));
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
      dispatch(addDeveloperFailure(err.message));
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
      console.log(data)
    } catch (err) {
      dispatch(editDeveloperFailure(err.message));
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
