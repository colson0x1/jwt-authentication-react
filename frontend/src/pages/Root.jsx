import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  // we don't even need to use useRouteLoaderData and use the id of the route
  // because here we already am in that very component that's rendered for the root route
  // so just useLoaderData
  const token = useLoaderData();

  // useSubmit gook gives us a submit function which we can use to programatically
  // submit a form
  // and here we wanna submit that logout form which we have in our main navigation file
  // we wanna send that logout request. that's what we wanna do
  const submit = useSubmit();

  // const navigation = useNavigation();
  // token expries in 1hr from backend
  // set a timer whenever this root layout is rendered which happens when the
  // application starts
  // It's the very first component that we definitely load for all our routes.
  // If we have a different setup where we have multiple sibling root layouts,
  // this approach would not work.
  // But here this is the one root component which definitely includes all other
  // root components. So therefore we can setup our effect function on this root
  // layout.
  // token can now be set as a dependency for useEffect so that this effect fn
  // runs whenever the token changes
  useEffect(() => {
    if (!token) {
      // there is nothing to do anymore if we dont have token anymore, if this
      // effect fn wsa executed because the token was removed, for example, then
      // we don't have anything to do
      return;
    }

    // if we do have a token, we wanna set up a timer after 1 hr and then triggers
    // that logout action
    setTimeout(
      () => {
        // once timer expires, we call submit
        // we wont pass any data because there is no data to submit
        // but we'll target this /logout action, this logout route, the action that
        // belongs to that route and set the method to POST
        // And that will therefore trigger that logout route and well start that
        // logout process where we clear the token
        submit(null, { action: '/logout', method: 'POST' });
      },
      // 1 hr in milliseconds
      1 * 60 * 60 * 1000,
    );
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
