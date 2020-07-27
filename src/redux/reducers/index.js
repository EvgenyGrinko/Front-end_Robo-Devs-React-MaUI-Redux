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
} from "../constants/acion-types";

const initialState = {
  searchedWord: "",
  loading: false,
  error: null,
  developers: [],
  foundDevelopers: [],
  currentDeveloper: {},
  isDeveloperAdded: false,
  isLoggedIn: false,
  isTokenCompared: false,
  isDeveloperEmailAlreadyExists: false,
  isUserEmailAlreadyExists: false,
  isUserEmailExists: true,
  isLoginPasswordCorrect: true,
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SEARCHED_WORD:
      return {
        ...state,
        searchedWord: payload,
        foundDevelopers: getFoundDevelopers(state.developers, payload),
      };
    case ADD_DEVELOPER_STARTED:
      return {
        ...state,
        loading: true,
        isDeveloperAdded: false,
        isDeveloperEmailAlreadyExists: false,
      };
    case ADD_DEVELOPER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isDeveloperAdded: true,
        developers: [...state.developers, payload],
      };
    case ADD_DEVELOPER_FAILURE:
      return {
        ...state,
        loading: false,
        isDeveloperAdded: false,
        isDeveloperEmailAlreadyExists: payload.isDeveloperEmailAlreadyExists,
        error: payload.error,
      };
    case GET_ALL_DEVELOPERS_STARTED:
      return { ...state, loading: true };
    case GET_ALL_DEVELOPERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isDeveloperAdded: false,
        developers: payload,
        foundDevelopers: getFoundDevelopers(payload, state.searchedWord),
      };
    case GET_ALL_DEVELOPERS_FAILURE:
      return { ...state, loading: false, error: payload.error };
    case GET_ONE_DEVELOPER_STARTED:
      return { ...state, loading: true };
    case GET_ONE_DEVELOPER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentDeveloper: payload,
      };
    case GET_ONE_DEVELOPER_FAILURE:
      return { ...state, loading: false, error: payload };
    case DELETE_ONE_DEVELOPER_STARTED:
      return { ...state, loading: true };
    case DELETE_ONE_DEVELOPER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        developers: payload,
        foundDevelopers: getFoundDevelopers(payload, state.searchedWord),
      };
    case DELETE_ONE_DEVELOPER_FAILURE:
      return { ...state, loading: false, error: payload };
    case EDIT_DEVELOPER_STARTED:
      return { ...state, loading: true };
    case EDIT_DEVELOPER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        developers: updateDevelopers(state.developers, payload),
        foundDevelopers: getFoundDevelopers(
          updateDevelopers(state.developers, payload),
          state.searchedWord
        ),
      };
    case EDIT_DEVELOPER_FAILURE:
      return { ...state, loading: false, error: payload };

    case REGISTER_USER_STARTED:
      return { ...state, loading: true, isUserEmailAlreadyExists: false };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: payload,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
        isUserEmailAlreadyExists: payload.isUserEmailAlreadyExists,
      };

    case LOGIN_USER_STARTED:
      return {
        ...state,
        loading: true,
        isUserEmailExists: true,
        isLoginPasswordCorrect: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
        isUserEmailExists: payload.isUserEmailExists,
        isLoginPasswordCorrect: payload.isLoginPasswordCorrect,
      };

    case COMPARE_TOKEN_STARTED:
      return { ...state, loading: true, isTokenCompared: false };
    case COMPARE_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isTokenCompared: true,
        isLoggedIn: payload,
      };
    case COMPARE_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        isTokenCompared: true,
        error: payload,
      };

    case LOGOUT_USER:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

function getFoundDevelopers(developers, searchedWord) {
  const foundDevelopers = developers.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchedWord.toLowerCase()) ||
      item.email.toLowerCase().includes(searchedWord.toLowerCase()) ||
      item.username.toLowerCase().includes(searchedWord.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchedWord.toLowerCase())
    );
  });
  return foundDevelopers;
}

function updateDevelopers(developers, updatedDeveloper) {
  const updatedDevelopers = [];
  developers.forEach((item) => {
    if (updatedDeveloper._id === item._id) updatedDevelopers.push(item);
    else updatedDevelopers.push(item);
  });
  return updatedDevelopers;
}

export default rootReducer;
