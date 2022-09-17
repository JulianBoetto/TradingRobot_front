import Auth from '../repositories/auth';
import { useNavigate } from 'react-router-dom';

async function auth(email, password) {
  const login = await Auth.signInWithEmailAndPassword({ email, password });
  if(!login || !login.access_token) {
    sessionStorage.clear();
    return false
  } else {
    sessionStorage.setItem("ACCESS_TOKEN", login.access_token);
    return sessionStorage.getItem("ACCESS_TOKEN") !== null;
  }
}

async function renew() {
  // const access_token = sessionStorage.getItem("ACCESS_TOKEN");
  // if(!access_token) {
  //   const newAccessToken = Auth.
  // }
  // // controla token y recibe nuevo


  // return sessionStorage.getItem("ACCESS_TOKEN") !== null;
}

async function verify() {
  return sessionStorage.getItem("ACCESS_TOKEN") !== null;
}

function logout() {
  sessionStorage.clear();
}

export { auth, renew, verify, logout };