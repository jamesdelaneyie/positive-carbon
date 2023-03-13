import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  function getUserID() {
    const userID = localStorage.getItem('user_id');
    return userID && userID
  }

  const [token, setToken] = useState(getToken());
  const [user_id, setUserID] = useState(getUserID());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  function saveUserID(userID) {
    localStorage.setItem('user_id', userID);
    setUserID(userID);
  }

  function removeUserID() {
    localStorage.removeItem("user_id");
    setUserID(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
    setUserID: saveUserID,
    user_id,
    removeUserID
  }

}

export default useToken;