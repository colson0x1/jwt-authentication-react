// This file won't contain any component because there is no log out page.
// Instead we'll export a function which will clear out local storage

import { redirect } from 'react-router-dom';

// i.e get rid of token
export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
}
