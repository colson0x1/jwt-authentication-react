import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  // get remaining lifetime of the token in milliseconds
  const storedExpirationDate = localStorage.getItem('expiration');
  // transform to a date object by passing that storedExpirationDate
  // which is a string to the date constructor
  const expirationDate = new Date(storedExpirationDate);
  // and then we also need to get the current date
  const now = new Date();
  // deducte current time stamp from the expiration time stamp
  // if the expiration is still in the future, if the token is still valid,
  // therefore then this will be a positive value
  // if now is later than the token expiration, this will be a negative value
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

// fn for extracting the token
// update this fn to aslo take a look at that expiration date and find out
// if the token did maybe expire
export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    // returning undefined won't work as intended. the loader won't return that
    // value to components.
    // so we need to return null instead of just return;
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    // means token expired. we have no remaining time, it already expired
    return 'EXPIRED';
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

// loader for protecting a route
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}
