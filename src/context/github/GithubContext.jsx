import { createContext, useReducer } from "react";
import { createRenderer } from "react-dom/test-utils";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com"; //process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = "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"; //process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    }); //this will send the token along with the response
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  //search a single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    }); //this will send the token along with the response
    if (response.status === 404) {
      window.location = "/notfound"; //this redirects
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //get the user repos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({ sort: "created", per_page: 10 });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    ); //this will send the token along with the response
    const data = await response.json();
    console.log(data);
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
