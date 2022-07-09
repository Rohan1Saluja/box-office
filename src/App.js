import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    // <Switch></Switch> works like switch() in Programming
    // Here, we define Cases as paths.
    <Switch>
      <Route exact path="/">
        This is Home Page
      </Route>
      <Route exact path="/starred">
        This is Starred
      </Route>
      <Route>This is 404 Page</Route>
    </Switch>
  );
}

export default App;
