// fn for extracting the token
export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}
