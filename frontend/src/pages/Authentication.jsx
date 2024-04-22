import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  // useSearchParams wont work because we're not in a Component here
  // so using browser's builtin URL constructor fn
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    // status 422 for invalid user input
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  // staus 401 is also sent sometimes by backend for invalid login credentials
  if (response.status === 422 || response.status === 401) {
    // we can return a response like this. React Router will automatically
    // parse it
    return response;
  }

  // For other error
  if (!response.ok) {
    // Throw error so that the closest error element is rendered on the screen
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // Before we redirect the user away, we wanna extract that token from the
  // response form backend
  const resData = await response.json();
  const token = resData.token;

  // store token now so that we can use it
  // we could try to store it in memory somehow. we could store it in a cookie.
  // but a very simple and straightforward option is to store it in
  // local storage, which is a browser API which we can use here because
  // this code in this action function runs in the browser.
  // So we can use all standard browser features here.
  localStorage.setItem('token', token);

  // if we make it past all above, the signup did succeed
  // soon: we will have to manage that token which we get back from the backend
  return redirect('/');
}
