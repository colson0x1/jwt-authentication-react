import { Form, Link, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // query parameters are officially called search parameters
  // useSearchParams hook allows us to get access to the currently set query
  // parameters.
  // this returns an array
  // searchParams is an object that gives access to the currently set query parameters
  // setSearchParams is a fn that allows us to update the currently set query parameters
  // We don't need that function here because we'll update the query parameter
  // with the help of that Link that sets the query parameter
  // but we do need to get access to the currently active query parameters.
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method='post' className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='image'>Password</label>
          <input id='password' type='password' name='password' required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
