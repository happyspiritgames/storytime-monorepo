import decode from 'jwt-decode';
import auth0 from 'auth0-js';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const CLIENT_ID = 'KfiyrQwotwGHGoGFr7VRYhWvjWefWkMu';
const CLIENT_DOMAIN = 'happyspiritgames.auth0.com';
const REDIRECT = `${window.location.protocol}//${window.location.host}/callback`;
const SCOPE = 'sub profile email';
const AUDIENCE = 'http://storytime.happyspiritgames.com';

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function setIdToken() {
  const idToken = getParameterByName(ID_TOKEN_KEY);
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function setAccessToken() {
  const accessToken = getParameterByName(ACCESS_TOKEN_KEY);
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function showUserInfo() {
  return decode(getIdToken());
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout(redirect) {
  clearIdToken();
  clearAccessToken();
  if (redirect) {
    redirect();
  }
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
}
