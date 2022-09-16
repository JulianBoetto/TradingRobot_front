import { apiUrl } from '../defaultValues';

const _ = require('lodash');

const fetchData = async (url, method, accessToken, body, headers = {}) => {
  _.merge(headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const params = { method, headers };
  if (body) {
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
  static signInWithEmailAndPassword = async (user) =>
    fetchData(`${apiUrl}/auth`, 'POST', null, { email: user.email, password: user.password });

  static validateAccess = async (token) =>
    fetchData(`${apiUrl}/verify`, 'POST');
}

