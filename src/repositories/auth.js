import { apiUrl } from '../defaultValues';

const _ = require('lodash');

const fetchData = async (url, method, accessToken, body, headers = {}) => {
  _.merge(headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const params = { method, headers };
  if (body) {
    console.log(body)
    params.body = JSON.stringify(body);
  }

  if (accessToken) {
    _.merge(headers, { Authorization: `Bearer ${accessToken}` });
  }

  return fetch(url, params).then(response => {
    if (response.status !== 200) return Promise.reject(response);
    return response.json();
  });
};

export default class Auth {
  static signInWithEmailAndPassword = async (email, password) =>
    fetchData(`${apiUrl}/auth`, 'POST', null, { email, password });
    // console.log(email, password)

  static signOut = async accessToken =>
    fetchData(`${apiUrl}/auth`, 'DELETE', accessToken, {})
      .then(object => object)
      .catch(error => error);

  static getCurrentUser = async accessToken =>
    fetchData(`${apiUrl}/auth/me`, 'GET', accessToken);

  static forgotPassword = async email =>
    fetchData(`${apiUrl}/auth/forgot_password `, 'POST', null, { email });

  static resetPassword = async (new_password, accessToken) => {
    const encodedURI = encodeURIComponent(JSON.stringify({ "accessToken": accessToken }));
    const query = `?q=${encodedURI}`;

    fetchData(`${apiUrl}/auth/reset_password/${query}`, 'POST', accessToken, { new_password });
  }

}