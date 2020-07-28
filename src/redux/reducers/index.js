import {
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
  SEARCH_FOR_DEVELOPERS_STARTED,
  SEARCH_FOR_DEVELOPERS_SUCCESS,
  SEARCH_FOR_DEVELOPERS_FAILURE,
} from "../constants/acion-types";

const initialState = {
  loading: false,
  error: null,
  developers: [],
  currentDeveloper: "",
  isDeveloperAdded: false,
  isLoggedIn: false,
  isTokenCompared: false,
  isDeveloperEmailAlreadyExists: false,
  isUserEmailAlreadyExists: false,
  isUserEmailExists: true,
  isLoginPasswordCorrect: true,
  isDeveloperEditted: false,
  developersLoaded: false,
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
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
      return {
        ...state,
        loading: true,
        currentDeveloper: "",
        developersLoaded: false,
      };
    case GET_ALL_DEVELOPERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isDeveloperAdded: false,
        developersLoaded: true,
        developers: payload,
      };
    case GET_ALL_DEVELOPERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
        developersLoaded: false,
      };
    case GET_ONE_DEVELOPER_STARTED:
      return { ...state, loading: true, isDeveloperEditted: false };
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
      };
    case DELETE_ONE_DEVELOPER_FAILURE:
      return { ...state, loading: false, error: payload };
    case EDIT_DEVELOPER_STARTED:
      return {
        ...state,
        loading: true,
        isDeveloperEmailAlreadyExists: false,
        isDeveloperEditted: false,
      };
    case EDIT_DEVELOPER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isDeveloperEditted: true,
        developers: updateDevelopers(state.developers, payload),
      };
    case EDIT_DEVELOPER_FAILURE:
      return {
        ...state,
        loading: false,
        isDeveloperEmailAlreadyExists: true,
        error: payload,
      };

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

    case SEARCH_FOR_DEVELOPERS_STARTED:
      return { ...state, loading: true };
    case SEARCH_FOR_DEVELOPERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        developers: payload,
      };
    case SEARCH_FOR_DEVELOPERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
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
