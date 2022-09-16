import Auth from '../repositories/auth';

async function auth(email, password) {
  const login = await Auth.signInWithEmailAndPassword({ email, password });
  sessionStorage.setItem("ACCESS_TOKEN", login.access_token);
}

async function renew() {
  // const access_token = sessionStorage.getItem("ACCESS_TOKEN");
  // if(!access_token) {
  //   const newAccessToken = Auth.
  // }
  // // controla token y recibe nuevo


  // return sessionStorage.getItem("ACCESS_TOKEN") !== null;
  console.log("renew")
}

function verify() {
  sessionStorage.getItem("ACCESS_TOKEN");
  return sessionStorage.getItem("ACCESS_TOKEN") !== null
}

export { auth, renew, verify };